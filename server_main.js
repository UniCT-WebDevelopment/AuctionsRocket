const SECRET_SESSION_KEY = 'TrzK9is9hx39JAUqF^ZLGDMWxhYBH5w3sd5Iamxz0aurtwF1%yOszkSmj3Tz35wF21qbTc&nShV!R2TchOB!klSmu9*B&Yo5d1B8p49x77DpI7lrZs0oW5djlGAmoKmr';

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./database.js');
const util = require('./utilities.js');
const multer = require('multer');
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

//cron.schedule('*/1 * * * *', () => {
cron.schedule('0,10,20,30,40,50 * * * *', () => {
    db.db_update_expired_auctions()
        .then(result => {
            if (result.success) {
                console.log(PREFIX + 'Auctions updated successfully');

                const auctions = result.auctions;

                for (auction of auctions) {
                    db.db_add_notification(auction.id_owner, 12, 1, {auction_name:auction.name, auction_id:auction.id});
                    db.db_add_notification_to_favorites(auction.id, 12, 0, {auction_name:auction.name, auction_id:auction.id});
    
                    if (Number(auction.id_status) == 5) {
                        db.db_add_notification(auction.bidder_id, 1, 1, {auction_name:auction.name, auction_id:auction.id, max_bid_value:auction.max_bid_value});
                        db.db_add_notification(auction.id_owner, 1, 0, {auction_name:auction.name, auction_id:auction.id, max_bid_value:auction.max_bid_value, bidder_name:auction.bidder_name, bidder_surname:auction.bidder_surname});
                        db.db_add_notification_to_favorites(auction.id, 1, 0, {auction_name:auction.name, auction_id:auction.id, max_bid_value:auction.max_bid_value, bidder_name:auction.bidder_name, bidder_surname:auction.bidder_surname});
                        //db.db_add_notification_to_favorites(auction.id, 2, 1, {auction_name:auction.name, auction_id:auction.id, max_bid_value:auction.max_bid_value, bidder_name:auction.bidder_name, bidder_surname:auction.bidder_surname});
                    }
                    
                    io.sockets.emit('auction-expired', auction);
                
                    const room_name = 'auction-room-' + auction.id;
                    io.sockets.in(room_name).emit('auction-end-room-message', {auction: auction});
                }
            } else {
                console.log(PREFIX + 'No auctions were updated.');
            }
        })
    .catch(error => {
        console.error(PREFIX + 'Failed to update auctions:', error);
    });
});

const profile_pic_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const userId = req.body.userId;
        const dir = `uploads/users/${userId}/profile_pic`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        const ext = '.jpeg'; // Imposta l'estensione a .jpeg per tutte le immagini

        //console.log('Original filename:', file.originalname);

        cb(null, 'profile_pic' + ext);
    }
});

const auction_pic_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const auctionId = req.body.auctionId;
        const dir = `uploads/auctions/${auctionId}/images`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        const image_number = req.body.image_number;
        const ext = '.jpeg';  // Imposta l'estensione a .jpeg per tutte le immagini

        //console.log('Original filename:', file.originalname);

        cb(null, `${image_number}${ext}`);
    }
});

const upload_profile_pic = multer({ storage: profile_pic_storage });
const upload_auction_pic = multer({ storage: auction_pic_storage });

const app = express();

const PREFIX = '[SERVER] ';
const server_config = util.read_config_file('server_config.txt');
const PORT = server_config.PORT || 49599;

app.use(session({
    secret: SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 3600000 //1h
    }
}));

app.use(express.static('./public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/api/user_id_from_session', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send({
            success: false, 
            message: 'Unauthorized'
        });
    }

    const { current_id } = req.query;

    if (current_id && Number(current_id) != Number(req.session.userId)) {
        return res.status(401).send({
            success: false, 
            message: 'Unauthorized not equal'
        });
    }

    db.db_user_banned_status(req.session.userId)
            .then(result => {
                if (result.success) {
                    return res.status(201).send({
                        success: true
                    });
                }

                req.session.destroy();

                return res.status(401).json({ 
                    success: false
                });
            })
            .catch(error => {
                console.error('Error getting user banned status:', error);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Error getting user banned status'
                });
            });
});

app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({
                success: false
            });
        }

        res.send({
            success: true
        });
    });
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(PREFIX + "Received login request with " + email + ", " + password);

        if (!util.valid_email(email)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email'
            });
        }

        if (!util.simple_valid_password(password)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        db.db_user_match_login(email, password)
            .then(result => {
                if (result.success) {
                    req.session.userId = result.results.id;
                    console.log(PREFIX + 'Saved session for user ' + result.results.id);

                    return res.status(201).json({ 
                        success: true, 
                        message: 'User login successfully',
                        id: result.results.id
                    });
                }
                return res.status(401).json({ 
                    success: false, 
                    message: result.message
                });
            })
            .catch(error => {
                console.error('Error logging user:', error);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Error registering user', 
                    error: error.message
                });
            });


    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/countries', async (req, res) => {
    try {
        const countries = await db.db_get_countries();
        return res.json(countries);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/auction_categories', async (req, res) => {
    try {
        const categories = await db.db_get_categories();
        return res.json(categories);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/auction_durations', async (req, res) => {
    try {
        const durations = await db.db_get_durations();
        return res.json(durations);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/get_user_report_reasons', async (req, res) => {
    try {
        const reasons = await db.db_get_user_report_reasons();
        return res.json(reasons);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/user_info', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const user = await db.db_get_user_from_id(user_id);

        if (user.success) {
            return res.status(201).json({ 
                success: true, 
                message: 'User info received successfully',
                user: user.results
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: 'User info not received',
            });
        }
        
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: 'Server error',
            user: user
        });
    }
});

app.post('/api/upload/user_image', upload_profile_pic.single('image'), (req, res) => {
    if (!req.session.userId && !req.body.userId) {
        return res.status(401).json({
            success: false,
            message: 'User not logged in'
        });
    }

    let user_id;
    if (req.body.userId) {
        user_id = req.body.userId;
    } else if (req.session.userId) {
        user_id = req.session.userId;
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    db.db_update_user_profile_pic(user_id)
    .then(result => {
        return res.status(201).json({ 
            success: true, 
            result 
        });
    })
    .catch(error => {
        console.error('Error registering user image:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error registering user image', 
            error 
        });
    });

});

app.post('/api/upload/auction_image', upload_auction_pic.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    db.db_add_auction_pic(req.body.auctionId, req.body.image_number)
    .then(result => {
        return res.status(201).json({ 
            success: true, 
            result 
        });
    })
    .catch(error => {
        console.error('Error registering auction image:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error registering auction image', 
            error 
        });
    });

});

app.post('/api/upload/edit_auction_image', upload_auction_pic.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    /*
    db.db_add_auction_pic(req.body.auctionId, req.body.image_number)
    .then(result => {
        return res.status(201).json({ 
            success: true, 
            result 
        });
    })
    .catch(error => {
        console.error('Error registering auction image:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error registering auction image', 
            error 
        });
    });
    */

});

app.post('/api/register', async (req, res) => {
    try {
        const { user_data } = req.body;

        console.log(PREFIX + "Received register request with " + JSON.stringify(user_data));

        if (!util.valid_name(user_data.name)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid name'
            });
        }

        if (!util.valid_surname(user_data.surname)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid surname'
            });
        }

        if (!util.valid_email(user_data.email)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email'
            });
        }

        if (!util.valid_phone(user_data.phone)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid phone'
            });
        }

        if (!util.valid_biography(user_data.biography)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid biography'
            });
        }

        if (!util.valid_address(user_data.address)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid address'
            });
        }

        if (!util.simple_valid_password(user_data.password)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }
        user_data.password = await util.hash_password(user_data.password);

        db.db_is_user_already_registered(user_data.email)
        .then(result => {
            if (result.length > 0) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'This email is already registered', 
                });
            }

            db.db_register_new_user(user_data)
            .then(result => {
                return res.status(201).json({ 
                    success: true, 
                    message: 'User registered successfully',
                    insertId: result.insertId,
                    result: result
                });
            })
            .catch(error => {
                console.error('Error registering user:', error);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Error registering user', 
                    error: error.message
                });
            });
        })
        .catch(error => {
            console.error('Error registering user:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/new_auction', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const owner_id = req.session.userId;

        const { auction } = req.body;

        console.log(PREFIX + "Received new auction with " + JSON.stringify(auction));

        if (!owner_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (!util.valid_auction_name(auction.name)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction name'
            });
        }
    
        if (!util.valid_id(auction.category_id)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction category'
            });
        }
    
        if (!util.valid_auction_description(auction.description)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction description'
            });
        }
    
        if (!util.valid_starting_price(auction.starting_price)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction starting price'
            });
        }
    
        if (!util.valid_duration(auction.duration)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction duration'
            });
        }
    
        if (!util.valid_id(auction.time_id)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction time'
            });
        }

        db.db_insert_new_auction(auction, owner_id)
        .then(result => {
            db.db_add_notification(owner_id, 5, 1, {auction_name:auction.name, auction_id:result.insertId});

            return res.status(201).json({ 
                success: true, 
                auction_id: result.insertId
            });
        })
        .catch(error => {
            console.error('Error inserting new auction:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_owner_auctions', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const owner_id = req.session.userId;

        const { page } = req.query;

        console.log(PREFIX + "Received an auction request from " + owner_id);

        if (!owner_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_owner_auctions_with_max_bid(owner_id, page)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auction: result
            });
        })
        .catch(error => {
            console.error('Error getting auction:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_auction_pics', async (req, res) => {
    try {
        const { auction_id } = req.query;

        console.log(PREFIX + "Received an auction pics request for auction " + auction_id);

        db.db_get_auction_pics(auction_id)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auction_pics: result
            });
        })
        .catch(error => {
            console.error('Error getting auction pics:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/update_auction', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const owner_id = req.session.userId;

        const { auction_edits } = req.body;

        if (!owner_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (owner_id != auction_edits.auction_owner_id) {
            return res.status(401).json({
                success: false,
                message: 'You are not the owner of this auction!'
            });
        }

        if (Number(auction_edits.auction_status_id) != 7 && Number(auction_edits.auction_status_id) != 1) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction status for this edits'
            });
        }

        db.db_update_auction(auction_edits)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
            });
        })
        .catch(error => {
            console.error('Error updating auction:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/cancel_auction', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const owner_id = req.session.userId;

        const { auction } = req.body;

        if (!owner_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (owner_id != auction.id_owner) {
            return res.status(401).json({
                success: false,
                message: 'You are not the owner of this auction!'
            });
        }

        if (Number(auction.id_status) != 7 && Number(auction.id_status) != 1) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction status for cancellation'
            });
        }

        db.db_cancel_auction(auction)
        .then(result => {
            io.sockets.emit('auction-deleted', auction);
            const room_name = 'auction-room-' + auction.id;
            io.sockets.in(room_name).emit('user-delete-auction-room-message', {auction: auction, message_time: util.get_current_timestamp()});

            db.db_add_notification(owner_id, 3, 1, {auction_name:auction.name, auction_id:auction.id});
            db.db_add_notification_to_favorites(auction.id, 3, 0, {auction_name:auction.name, auction_id:auction.id});

            return res.status(201).json({ 
                success: true, 
            });
        })
        .catch(error => {
            console.error('Error in auction cancellation', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/deny_auction', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { auction } = req.body;

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_deny_auction(user_id, auction.id)
        .then(result => {
            db.db_add_notification(auction.id_owner, 7, 1, {auction_id:auction.id, auction_name:auction.name});

            return res.status(201).json({ 
                success: true, 
            });
        })
        .catch(error => {
            console.error('Error in auction deny', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/allow_auction', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { auction } = req.body;

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_allow_auction(user_id, auction.id)
        .then(result => {
            db.db_add_notification(auction.id_owner, 6, 1, {auction_id:auction.id, auction_name:auction.name});

            return res.status(201).json({ 
                success: true, 
            });
        })
        .catch(error => {
            console.error('Error in auction allow', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_others_auctions', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { filter, category_id, page } = req.query;

        console.log(PREFIX + "Received an other auction request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_others_auctions_with_max_bid(user_id, filter, category_id, page)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auction: result
            });
        })
        .catch(error => {
            console.error('Error getting auction:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_user_favorites_auctions', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { page } = req.query;

        console.log(PREFIX + "Received a favorite auctions request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_user_favorite_auctions(user_id, page)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auction: result
            });
        })
        .catch(error => {
            console.error('Error getting favorite auctions:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_single_auction', async (req, res) => {
    try {
        const { auction_id } = req.query;

        console.log(PREFIX + "Received a single auction request for " + auction_id);

        db.db_get_single_auction_with_max_bid(auction_id)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auction: result
            });
        })
        .catch(error => {
            console.error('Error getting auction:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/auction_bid', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { owner, auction, new_bid } = req.body;
        owner['id'] = user_id;

        if (!owner.id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (owner.id == auction.id_owner) {
            return res.status(401).json({
                success: false,
                message: 'You can\'t bid on your auction!'
            });
        }

        if (Number(auction.id_status) != 1) {
            return res.status(401).json({
                success: false,
                message: 'Invalid auction status for bid!'
            });
        }

        if (!new_bid || new_bid <= auction.actual_price) {
            return res.status(401).json({
                success: false,
                message: 'Invalid bid'
            });
        }


        db.db_add_auction_bid(auction, new_bid, owner.id)
        .then(() => {
            return db.db_get_auction_with_max_bid(auction.id);
        })
        .then(updated_auction => {
            io.sockets.emit('new_bid_added', { auction: updated_auction[0] });

            const room_name = 'auction-room-' + updated_auction[0].id;
            io.sockets.in(room_name).emit('user-auction-bid-room-message', updated_auction[0]);

            db.db_add_notification(updated_auction[0].id_owner, 4, 1, {auction_name:auction.name, auction_id:auction.id, max_bid_value:updated_auction[0].max_bid_value, max_bid_user_name:updated_auction[0].max_bid_user_name, max_bid_user_surname:updated_auction[0].max_bid_user_surname});
            db.db_add_notification_to_favorites(auction.id, 4, 0, {auction_name:auction.name, auction_id:auction.id, max_bid_value:updated_auction[0].max_bid_value, max_bid_user_name:updated_auction[0].max_bid_user_name, max_bid_user_surname:updated_auction[0].max_bid_user_surname});

            return res.status(201).json({ 
                success: true, 
                auction: updated_auction[0]
            });
        })
        .catch(error => {
            console.error('Error in adding new bid', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/load_user_info', async (req, res) => {
    try {
        const { user_id } = req.body;

        console.log(PREFIX + "Received load user info request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        db.db_get_user_less_info_from_id(user_id)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                user: result
            });
        })
        .catch(error => {
            console.error('Error getting user info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/load_user_sent_rate', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const sender_id = req.session.userId;

        const { user_id } = req.body;

        console.log(PREFIX + "Received load user sent rate request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        db.db_get_user_sent_rate(sender_id, user_id)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true, 
                    feedback: result.feedback
                });
            }
            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error getting user info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/get_user_received_feeback', async (req, res) => {
    try {
        const { user_id } = req.body;

        console.log(PREFIX + "Received load user feedback request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        db.db_get_user_received_feedback(user_id)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true, 
                    feedback: result.feedback
                });
            }
            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error getting user info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/new_user_feedback', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const sender_id = req.session.userId;

        const { user_id, new_rating, feedback } = req.body;

        console.log(PREFIX + "Received new user feedback request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        if (!util.valid_feedback(feedback)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid feedback'
            });
        }

        if (!util.valid_rating(new_rating)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid rating'
            });
        }

        db.db_send_new_user_feedback(user_id, sender_id, new_rating, feedback)
        .then(result => {
            if (result.success) {
                db.db_add_notification(user_id, 8, 1, {new_rating:new_rating, feedback:feedback});     
                
                return res.status(201).json({ 
                    success: true, 
                });
            }
            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error adding new user feedback:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/update_user_feedback', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const sender_id = req.session.userId;

        const { user_id, new_rating, feedback } = req.body;

        console.log(PREFIX + "Received update user feedback request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        if (!util.valid_feedback(feedback)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid feedback'
            });
        }

        if (!util.valid_rating(new_rating)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid rating'
            });
        }

        db.db_update_user_feedback(user_id, sender_id, new_rating, feedback)
        .then(result => {
            if (result.success) {
                db.db_add_notification(user_id, 9, 1, {new_rating:new_rating, feedback:feedback});     

                return res.status(201).json({ 
                    success: true, 
                });
            }
            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error updating new user feedback:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_user_posted_auctions', async (req, res) => {
    try {
        const { user_id } = req.query;

        console.log(PREFIX + "Received load user posted auctions request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        db.get_user_posted_auctions(user_id)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auctions: result
            });
        })
        .catch(error => {
            console.error('Error getting user info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_user_active_auctions', async (req, res) => {
    try {
        const { user_id } = req.query;

        console.log(PREFIX + "Received load user active auctions request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        db.get_user_active_auctions(user_id)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auctions: result
            });
        })
        .catch(error => {
            console.error('Error getting user info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_user_won_auctions', async (req, res) => {
    try {
        const { user_id } = req.query;

        console.log(PREFIX + "Received load user won auctions request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        db.get_user_won_auctions(user_id)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auctions: result
            });
        })
        .catch(error => {
            console.error('Error getting user info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_user_placed_bids', async (req, res) => {
    try {
        const { user_id } = req.query;

        console.log(PREFIX + "Received load user placed bids request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user'
            });
        }

        db.get_user_placed_bids(user_id)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auctions: result
            });
        })
        .catch(error => {
            console.error('Error getting user placed bids info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/user_update_general_info', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { user_edits } = req.body;

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_update_user_general_info(user_id, user_edits)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
            });
        })
        .catch(error => {
            console.error('Error updating user general infos:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/user_update_email', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { new_email } = req.body;

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (!util.valid_email(new_email)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid new email'
            });
        }

        db.db_update_user_email(user_id, new_email)
        .then(result => {
            if (result.success) {
                db.db_add_notification(user_id, 10, 1, {new_email:new_email});  

                return res.status(201).json({ 
                    success: true, 
                });
            }
            return res.status(401).json({ 
                success: false, 
                message: 'Email already in use'
            });
        })
        .catch(error => {
            console.error('Error updating user email:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.put('/api/user_update_password', (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { old_password, new_password } = req.body;

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (!util.simple_valid_password(new_password)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid new password'
            });
        }

        if (!util.simple_valid_password(old_password)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid old password'
            });
        }

        db.db_update_user_password(user_id, old_password, new_password)
        .then(result => {
            if (result.success) {
                db.db_add_notification(user_id, 11, 1, {});  

                return res.status(201).json({ 
                    success: true, 
                });
            }
            return res.status(401).json({ 
                success: false, 
                message: 'Old password does not match'
            });
        })
        .catch(error => {
            console.error('Error updating user password:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_pending_review_auctions', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { permission_level, page } = req.query;

        console.log(PREFIX + "Received an auction pending review request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (!Number(permission_level) > 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid user permissions'
            });
        }

        db.db_get_pending_review_auctions(user_id, page)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                auction: result
            });
        })
        .catch(error => {
            console.error('Error getting auction:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/load_users_list', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { name_surname_filter, page } = req.body;

        console.log(PREFIX + "Received load users list request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_user_list(user_id, name_surname_filter, page)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                users: result
            });
        })
        .catch(error => {
            console.error('Error getting users list info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_user_notifications', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { page } = req.query;

        console.log(PREFIX + "Received load users notifications request for " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_user_notifications(user_id, page)
        .then(result => {
            return res.status(201).json({ 
                success: true, 
                notifications: result
            });
        })
        .catch(error => {
            console.error('Error getting user notifications info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/send_user_report', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const reporter_id = req.session.userId;

        const { report } = req.body;
        report['reporter_id'] = reporter_id;

        console.log(PREFIX + "Received new report for user " + report.reported_id);

        if (!report.reporter_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid reporter'
            });
        }

        if (!report.reported_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid reported'
            });
        }

        if (!report.reason_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid reason id'
            });
        }

        if (Number(report.reason_id) == -2) {
            if (!util.valid_report_reason(report.custom_reason)) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid custom reason'
                });
            }
        }

        db.db_send_user_report(report)
        .then(result => {
            if (!result.success) {
                return res.status(201).json({ 
                    success: false
                });
            }

            io.sockets.emit('new_report_added', result.report_id);

            return res.status(201).json({ 
                success: true
            });
        })
        .catch(error => {
            console.error('Error getting users list info:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/load_reports_list', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;
        const { page } = req.body;

        console.log(PREFIX + "Received reports list request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_reports(user_id, page)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true,
                    data: result.data
                });
            }
            return res.status(401).json({ 
                success: false,
                message: result.message
            });
        })
        .catch(error => {
            console.error('Error getting users reports:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/delete_report', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { report } = req.body;

        console.log(PREFIX + "Received delete reports request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_delete_report(user_id, report)
        .then(result => {
            if (result.success) {

                io.sockets.emit('report_deleted', result.deleted_report);

                return res.status(201).json({ 
                    success: true,
                    deleted_report: result.deleted_report
                });
            }
            return res.status(401).json({ 
                success: false,
                message: result.message
            });
        })
        .catch(error => {
            console.error('Error getting users reports:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/get_report_from_id', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { report_id } = req.body;

        console.log(PREFIX + "Received get report request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_report_from_id(user_id, report_id)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true,
                    data: result.data
                });
            }
            return res.status(401).json({ 
                success: false,
                message: result.message
            });
        })
        .catch(error => {
            console.error('Error getting report:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/ban_user', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { user_ban_id, reason } = req.body;

        console.log(PREFIX + "Received ban request for " + user_ban_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        if (!util.valid_ban_reason(reason)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid ban reason'
            });
        }

        db.db_ban_user(user_id, user_ban_id, reason)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true,
                });
            }
            return res.status(401).json({ 
                success: false,
                message: result.message
            });
        })
        .catch(error => {
            console.error('Error during user ban:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.post('/api/unban_user', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { user_unban_id } = req.body;

        console.log(PREFIX + "Received unban request for " + user_unban_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_unban_user(user_id, user_unban_id)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true,
                });
            }
            return res.status(401).json({ 
                success: false,
                message: result.message
            });
        })
        .catch(error => {
            console.error('Error during user unban:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Server error', 
                error: error.message
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/is_favourite_auction', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { auction_id } = req.query;

        console.log(PREFIX + "Received a is favourite auction request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_is_favorite_auction(user_id, auction_id)
        .then(result => {
            if (result) {
                return res.status(201).json({ 
                    success: true
                });
            }

            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error getting favorite status:', error);
            return res.status(500).json({ 
                success: false
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/add_auction_to_favorite', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { auction_id } = req.query;

        console.log(PREFIX + "Received a set favourite auction request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_add_favorite_auction(user_id, auction_id)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true
                });
            }

            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error setting favorite auction:', error);
            return res.status(500).json({ 
                success: false
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/remove_auction_to_favorite', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        const { auction_id } = req.query;

        console.log(PREFIX + "Received a remove from favourite auction request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_remove_favorite_auction(user_id, auction_id)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true
                });
            }

            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error removing auction from favorite:', error);
            return res.status(500).json({ 
                success: false
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

app.get('/api/get_last_notification', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User not logged in'
            });
        }
        const user_id = req.session.userId;

        console.log(PREFIX + "Received a get last notification request from " + user_id);

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid logged user'
            });
        }

        db.db_get_last_user_notification(user_id)
        .then(result => {
            if (result.success) {
                return res.status(201).json({ 
                    success: true,
                    notification: result.notification
                });
            }

            return res.status(201).json({ 
                success: false
            });
        })
        .catch(error => {
            console.error('Error getting user last notification:', error);
            return res.status(500).json({ 
                success: false
            });
        });

    } catch (error) {
        console.error(PREFIX + 'Error executing this request:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

io.on('connection', (socket) => {
    console.log(PREFIX + 'Someone has connected, socket id: ' + socket.id);

    socket.on('disconnect', () => {
        console.log(PREFIX + 'User with socket id ' + socket.id + ' has disconnected');
    });

    socket.on('join-chat-auction', (data) => {
        const room_name = 'auction-room-' + data.auction.id;
        socket.join(room_name);
        console.log(PREFIX + 'User with socket id ' + socket.id + ' joined the chat auction ' + data.auction.id);
        
        io.sockets.in(room_name).emit('user-connected-auction-room', {user: data.user, message_time:util.get_current_timestamp()});
    });

    socket.on('leave-chat-auction', (data) => {
        leave_chat_auction(socket, data);
    });

    socket.on('new-auction-chat-msg', (data) => {
        //console.log(JSON.stringify(data));
        const room_name = 'auction-room-' + data.auction_id;
        io.sockets.in(room_name).emit('user-auction-room-message', {user:data.user, message:{text:data.message, time:util.get_current_timestamp()}});
    });

});

httpServer.listen(PORT, () => {
    console.log(PREFIX + 'Listening on port ' + PORT + '...');
});

function leave_chat_auction (socket, data) {
    const room_name = 'auction-room-' + data.auction_id;
    socket.leave(room_name);
    console.log(PREFIX + 'User with socket id ' + socket.id + ' left from the chat auction ' + data.auction_id);

    io.sockets.in(room_name).emit('user-disconnected-auction-room', {user: data.user, message_time:util.get_current_timestamp()});
}