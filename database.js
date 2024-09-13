const PREFIX = '[DATABASE] ';

const fs = require('fs');
const mysql = require('mysql');
const util = require('./utilities.js');

function load_config (file_path) {
    const config = {};
    const data = fs.readFileSync(file_path, 'utf8');
    const lines = data.split('\n');
    
    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            config[key.trim()] = value.trim();
        }
    });
    
    return config;
}

const config = load_config('database_config.txt');

const connection = mysql.createConnection({
    host: config.host || 'localhost',
    user: config.user || 'root',
    password: config.password || '',
    database: config.database || 'auction_rocket'
});

try {
    connection.connect((err) => {
        if (err) {
            console.error(PREFIX + 'Database connection error:', err);
            process.exit(1);
        }
        console.log(PREFIX + `Connected to database: ${config.database} : ${config.host}`);
        
        try {
            create_country_table();
            create_auction_table();
            create_auction_bid_table();
            create_auction_categories_table();
            create_auction_durations_table();
            create_auction_statuses_table();
            create_user_table();
            create_user_feedback_table();
            create_user_reports_table();
            create_report_reason_table();
            create_auction_images_table();
            create_user_favorite_auctions_table();
            create_notifications_table();
            create_notifications_type_table();
        } catch (tableError) {
            console.error(PREFIX + 'Error creating tables:', tableError);
            process.exit(1);
        }
    });
} catch (connectionError) {
    console.error(PREFIX + 'Unexpected error during connection setup:', connectionError);
    process.exit(1);
}

function create_country_table () {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS country (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(createTableSQL, (err) => {
        if (err) {
            console.error(PREFIX + 'Error creating table country:', err);
        }
        console.log(PREFIX + 'country table created successfully');

        const insertDataSQL = `
            INSERT IGNORE INTO country (id, name) VALUES
            (1, 'Afghanistan'),
            (2, 'Albania'),
            (3, 'Algeria'),
            (4, 'Andorra'),
            (5, 'Angola'),
            (6, 'Antigua and Barbuda'),
            (7, 'Argentina'),
            (8, 'Armenia'),
            (9, 'Australia'),
            (10, 'Austria'),
            (11, 'Azerbaijan'),
            (12, 'Bahamas'),
            (13, 'Bahrain'),
            (14, 'Bangladesh'),
            (15, 'Barbados'),
            (16, 'Belarus'),
            (17, 'Belgium'),
            (18, 'Belize'),
            (19, 'Benin'),
            (20, 'Bhutan'),
            (21, 'Bolivia'),
            (22, 'Bosnia and Herzegovina'),
            (23, 'Botswana'),
            (24, 'Brazil'),
            (25, 'Brunei'),
            (26, 'Bulgaria'),
            (27, 'Burkina Faso'),
            (28, 'Burundi'),
            (29, 'Cabo Verde'),
            (30, 'Cambodia'),
            (31, 'Cameroon'),
            (32, 'Canada'),
            (33, 'Central African Republic'),
            (34, 'Chad'),
            (35, 'Chile'),
            (36, 'China'),
            (37, 'Colombia'),
            (38, 'Comoros'),
            (39, 'Congo, Democratic Republic of the'),
            (40, 'Congo, Republic of the'),
            (41, 'Costa Rica'),
            (42, 'Croatia'),
            (43, 'Cuba'),
            (44, 'Cyprus'),
            (45, 'Czech Republic'),
            (46, 'Denmark'),
            (47, 'Djibouti'),
            (48, 'Dominica'),
            (49, 'Dominican Republic'),
            (50, 'Ecuador'),
            (51, 'Egypt'),
            (52, 'El Salvador'),
            (53, 'Equatorial Guinea'),
            (54, 'Eritrea'),
            (55, 'Estonia'),
            (56, 'Eswatini'),
            (57, 'Ethiopia'),
            (58, 'Fiji'),
            (59, 'Finland'),
            (60, 'France'),
            (61, 'Gabon'),
            (62, 'Gambia'),
            (63, 'Georgia'),
            (64, 'Germany'),
            (65, 'Ghana'),
            (66, 'Greece'),
            (67, 'Grenada'),
            (68, 'Guatemala'),
            (69, 'Guinea'),
            (70, 'Guinea-Bissau'),
            (71, 'Guyana'),
            (72, 'Haiti'),
            (73, 'Honduras'),
            (74, 'Hungary'),
            (75, 'Iceland'),
            (76, 'India'),
            (77, 'Indonesia'),
            (78, 'Iran'),
            (79, 'Iraq'),
            (80, 'Ireland'),
            (81, 'Israel'),
            (82, 'Italy'),
            (83, 'Jamaica'),
            (84, 'Japan'),
            (85, 'Jordan'),
            (86, 'Kazakhstan'),
            (87, 'Kenya'),
            (88, 'Kiribati'),
            (89, 'Korea, North'),
            (90, 'Korea, South'),
            (91, 'Kosovo'),
            (92, 'Kuwait'),
            (93, 'Kyrgyzstan'),
            (94, 'Laos'),
            (95, 'Latvia'),
            (96, 'Lebanon'),
            (97, 'Lesotho'),
            (98, 'Liberia'),
            (99, 'Libya'),
            (100, 'Liechtenstein'),
            (101, 'Lithuania'),
            (102, 'Luxembourg'),
            (103, 'Madagascar'),
            (104, 'Malawi'),
            (105, 'Malaysia'),
            (106, 'Maldives'),
            (107, 'Mali'),
            (108, 'Malta'),
            (109, 'Marshall Islands'),
            (110, 'Mauritania'),
            (111, 'Mauritius'),
            (112, 'Mexico'),
            (113, 'Micronesia'),
            (114, 'Moldova'),
            (115, 'Monaco'),
            (116, 'Mongolia'),
            (117, 'Montenegro'),
            (118, 'Morocco'),
            (119, 'Mozambique'),
            (120, 'Myanmar'),
            (121, 'Namibia'),
            (122, 'Nauru'),
            (123, 'Nepal'),
            (124, 'Netherlands'),
            (125, 'New Zealand'),
            (126, 'Nicaragua'),
            (127, 'Niger'),
            (128, 'Nigeria'),
            (129, 'North Macedonia'),
            (130, 'Norway'),
            (131, 'Oman'),
            (132, 'Pakistan'),
            (133, 'Palau'),
            (134, 'Palestine'),
            (135, 'Panama'),
            (136, 'Papua New Guinea'),
            (137, 'Paraguay'),
            (138, 'Peru'),
            (139, 'Philippines'),
            (140, 'Poland'),
            (141, 'Portugal'),
            (142, 'Qatar'),
            (143, 'Romania'),
            (144, 'Russia'),
            (145, 'Rwanda'),
            (146, 'Saint Kitts and Nevis'),
            (147, 'Saint Lucia'),
            (148, 'Saint Vincent and the Grenadines'),
            (149, 'Samoa'),
            (150, 'San Marino'),
            (151, 'Sao Tome and Principe'),
            (152, 'Saudi Arabia'),
            (153, 'Senegal'),
            (154, 'Serbia'),
            (155, 'Seychelles'),
            (156, 'Sierra Leone'),
            (157, 'Singapore'),
            (158, 'Slovakia'),
            (159, 'Slovenia'),
            (160, 'Solomon Islands'),
            (161, 'Somalia'),
            (162, 'South Africa'),
            (163, 'South Sudan'),
            (164, 'Spain'),
            (165, 'Sri Lanka'),
            (166, 'Sudan'),
            (167, 'Suriname'),
            (168, 'Sweden'),
            (169, 'Switzerland'),
            (170, 'Syria'),
            (171, 'Taiwan'),
            (172, 'Tajikistan'),
            (173, 'Tanzania'),
            (174, 'Thailand'),
            (175, 'Timor-Leste'),
            (176, 'Togo'),
            (177, 'Tonga'),
            (178, 'Trinidad and Tobago'),
            (179, 'Tunisia'),
            (180, 'Turkey'),
            (181, 'Turkmenistan'),
            (182, 'Tuvalu'),
            (183, 'Uganda'),
            (184, 'Ukraine'),
            (185, 'United Arab Emirates'),
            (186, 'United Kingdom'),
            (187, 'United States'),
            (188, 'Uruguay'),
            (189, 'Uzbekistan'),
            (190, 'Vanuatu'),
            (191, 'Vatican City'),
            (192, 'Venezuela'),
            (193, 'Vietnam'),
            (194, 'Yemen'),
            (195, 'Zambia'),
            (196, 'Zimbabwe');`;

        connection.query(insertDataSQL, (err) => {
            if (err) {
                console.error(PREFIX + 'Error inserting data into country:', err);
            }
            console.log(PREFIX + 'Data inserted into country table successfully');
        });
    });
}

function create_auction_table() {
    const sql = `
        CREATE TABLE IF NOT EXISTS auction (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(200) NOT NULL,
            description VARCHAR(3000) NOT NULL,
            id_category INT UNSIGNED NOT NULL,
            starting_price INT NOT NULL,
            actual_price INT NOT NULL,
            id_status INT UNSIGNED NOT NULL DEFAULT '7',
            start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            duration INT NOT NULL,
            id_duration INT UNSIGNED NOT NULL,
            end_time TIMESTAMP NOT NULL,
            id_owner INT UNSIGNED NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table auction:', err);
        } else {
            console.log(PREFIX + 'auction table created successfully');
        }
    });
}

function create_report_reason_table () {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS report_reason (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(createTableSQL, (err) => {
        if (err) {
            console.error(PREFIX + 'Error creating table report_reason:', err);
        }
        console.log(PREFIX + 'report_reason table created successfully');

        const insertDataSQL = `
            INSERT IGNORE INTO report_reason (id, name) VALUES
            (1, 'Fraudulent behavior'),
            (2, 'Selling counterfeit items'),
            (3, 'Selling prohibited items'),
            (4, 'Misleading item description'),
            (5, 'Offensive or abusive behavior'),
            (6, 'Non-payment'),
            (7, 'Spamming'),
            (8, 'Bid manipulation'),
            (9, 'Selling stolen items'),
            (10, 'Using multiple accounts'),
            (11, 'Privacy invasion'),
            (12, 'Scamming'),
            (13, 'Payment disputes'),
            (14, 'Impersonation'),
            (15, 'False reporting');`;

        connection.query(insertDataSQL, (err) => {
            if (err) {
                console.error(PREFIX + 'Error inserting data into report_reason:', err);
            }
            console.log(PREFIX + 'Data inserted into report_reason table successfully');
        });
    });
}

function create_auction_bid_table() {
    const sql = `
        CREATE TABLE IF NOT EXISTS auction_bid (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            value INT UNSIGNED NOT NULL,
            id_auction INT UNSIGNED NOT NULL,
            id_user INT UNSIGNED NOT NULL,
            date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table auction_bid:', err);
        } else {
            console.log(PREFIX + 'auction_bid table created successfully');
        }
    });
}

function create_auction_categories_table () {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS auction_categories (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(createTableSQL, (err) => {
        if (err) {
            console.error(PREFIX + 'Error creating table auction_categories:', err);
        }
        console.log(PREFIX + 'auction_categories table created successfully');
        
        const insertDataSQL = `
            INSERT IGNORE INTO auction_categories (id, name) VALUES
            (1, 'Electronics'),
            (2, 'Clothing'),
            (3, 'Home & Garden'),
            (4, 'Sports & Outdoors'),
            (5, 'Toys & Hobbies'),
            (6, 'Video Games'),
            (7, 'Gaming Accessories'),
            (8, 'Automotive'),
            (9, 'Collectibles'),
            (10, 'Books'),
            (11, 'Music'),
            (12, 'Movies & TV'),
            (13, 'Jewelry & Watches'),
            (14, 'Health & Beauty'),
            (15, 'Art'),
            (16, 'Furniture'),
            (17, 'Pet Supplies'),
            (18, 'Baby'),
            (19, 'Business & Industrial'),
            (20, 'Real Estate');`;

        connection.query(insertDataSQL, (err) => {
            if (err) {
                console.error(PREFIX + 'Error inserting data into auction_categories:', err);
            }
            console.log(PREFIX + 'Data inserted into auction_categories table successfully');
        });
    });
}

function create_auction_durations_table () {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS auction_durations (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(createTableSQL, (err) => {
        if (err) {
            console.error(PREFIX + 'Error creating table auction_durations:', err);
        }
        console.log(PREFIX + 'auction_durations table created successfully');
        
        const insertDataSQL = `
            INSERT IGNORE INTO auction_durations (id, name) VALUES
            (1, 'hours'),
            (2, 'days'),
            (3, 'weeks'),
            (4, 'months');`;

        connection.query(insertDataSQL, (err) => {
            if (err) {
                console.error(PREFIX + 'Error inserting data into auction_durations:', err);
            }
            console.log(PREFIX + 'Data inserted into auction_durations table successfully');
        });
    });
}

function create_auction_statuses_table () {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS auction_statuses (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(3000) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(createTableSQL, (err) => {
        if (err) {
            console.error(PREFIX + 'Error creating table auction_statuses:', err);
        }
        console.log(PREFIX + 'auction_statuses table created successfully');
        
        const insertDataSQL = `
            INSERT IGNORE INTO auction_statuses (id, name, description) VALUES
            (1, 'Active', 'The auction is currently live and accepting bids from users. Participants can place their bids until the auction ends'),
            (2, 'Pending', 'The auction has been created but is not yet live. It may be awaiting approval from the site administrators or scheduled to start at a future date'),
            (3, 'Closed by a moderator', 'The auction has been closed by a moderator during his review. No further actions can be taken on this auction'),
            (4, 'Cancelled', 'The auction was terminated before it could be completed. This could be due to the auction owner or the administrators deciding to cancel it for various reasons'),
            (5, 'Sold', 'The auction has successfully ended with a winning bid. The item is now marked as sold, and the next steps involve payment and item delivery'),
            (6, 'Expired', 'The auction ended without any successful bids or failed to meet its reserve price. It is no longer active and did not result in a sale'),
            (7, 'Under Review', 'The auction is currently being reviewed by the site administrators. This status will be used to ensure compliance with the site rules and regulations before the auction is made live or approved');`;

        connection.query(insertDataSQL, (err) => {
            if (err) {
                console.error(PREFIX + 'Error inserting data into auction_statuses:', err);
            }
            console.log(PREFIX + 'Data inserted into auction_statuses table successfully');
        });
    });
}

function create_user_table() {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(200) NOT NULL,
            surname VARCHAR(200) NOT NULL,
            profile_image_url VARCHAR(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'uploads/users/no_user/profilePic.png',
            phone VARCHAR(13) NOT NULL,
            biography VARCHAR(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            shipping_address VARCHAR(200) NOT NULL,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            id_country INT NOT NULL,
            registration_data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            permission_level TINYINT UNSIGNED NOT NULL DEFAULT '0',
            banned TINYINT(1) NOT NULL DEFAULT '0',
            ban_reason VARCHAR(3000) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table user:', err);
        } else {
            console.log(PREFIX + 'user table created successfully');
        }
    });
}

function create_user_feedback_table() {
    const sql = `
        CREATE TABLE IF NOT EXISTS user_feedback (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            id_rated INT UNSIGNED NOT NULL,
            id_sender INT UNSIGNED NOT NULL,
            star_value TINYINT UNSIGNED NOT NULL,
            feedback VARCHAR(3000) NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table user_feedback:', err);
        } else {
            console.log(PREFIX + 'user_feedback table created successfully');
        }
    });
}

function create_user_reports_table () {
    const sql = `
        CREATE TABLE IF NOT EXISTS user_reports (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            id_reporter INT UNSIGNED NOT NULL,
            id_reported INT UNSIGNED NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            id_reason INT UNSIGNED NOT NULL,
            custom_reason VARCHAR(3000) DEFAULT NULL,
            PRIMARY KEY (id)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table user_reports:', err);
        } else {
            console.log(PREFIX + 'user_reports table created successfully');
        }
    });
}

function create_auction_images_table () {
    const sql = `
        CREATE TABLE IF NOT EXISTS auction_images (
            id int UNSIGNED NOT NULL AUTO_INCREMENT,
            image_url varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            id_auction int UNSIGNED NOT NULL,
            PRIMARY KEY (id)
            ) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table auction_images:', err);
        } else {
            console.log(PREFIX + 'auction_images table created successfully');
        }
    });
}

function create_user_favorite_auctions_table () {
    const sql = `
        CREATE TABLE IF NOT EXISTS user_favorite_auctions (
            id int UNSIGNED NOT NULL AUTO_INCREMENT,
            id_user int UNSIGNED NOT NULL,
            id_auction int UNSIGNED NOT NULL,
            PRIMARY KEY (id)
            ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table user_favorite_auctions:', err);
        } else {
            console.log(PREFIX + 'user_favorite_auctions table created successfully');
        }
    });
}

function create_notifications_table () {
    const sql = `
        CREATE TABLE IF NOT EXISTS notifications (
            id int UNSIGNED NOT NULL AUTO_INCREMENT,
            id_receiver int UNSIGNED NOT NULL,
            notification_id_type int UNSIGNED NOT NULL,
            timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            content json NOT NULL,
            self tinyint(1) NOT NULL,
            PRIMARY KEY (id)
            ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(PREFIX + 'Error on creating table notifications:', err);
        } else {
            console.log(PREFIX + 'notifications table created successfully');
        }
    });
}

function create_notifications_type_table () {
    const sql = `
        CREATE TABLE IF NOT EXISTS notifications_type (
            id int UNSIGNED NOT NULL AUTO_INCREMENT,
            name varchar(2000) NOT NULL,
            PRIMARY KEY (id)
            ) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

    connection.query(sql, (err) => {
        if (err) {
            console.error(PREFIX + 'Error creating table notifications:', err);
        }
        console.log(PREFIX + 'notifications type table created successfully');
        
        const insertDataSQL = `
            INSERT IGNORE INTO notifications_type (id, name) VALUES
            (1, 'Auction won'),
            (2, 'Auction lost'),
            (3, 'Auction cancelled'),
            (4, 'New bid'),
            (5, 'New auction added'),
            (6, 'Auction accepted'),
            (7, 'Auction denied'),
            (8, 'New rating'),
            (9, 'Rating updated'),
            (10, 'Email changed'),
            (11, 'Password changed'),
            (12, 'Auction ended');`;

        connection.query(insertDataSQL, (err) => {
            if (err) {
                console.error(PREFIX + 'Error inserting data into notifications:', err);
            }
            console.log(PREFIX + 'Data inserted into notifications table successfully');
        });
    });
}

function db_get_countries () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM country';

        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

function db_register_new_user (user_data) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO user (id, name, surname, profile_image_url, phone, biography, shipping_address, email, password, id_country, registration_data) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`;

        const params = [
            user_data.name,
            user_data.surname,
            'uploads\\users\\no_user\\profilePic.png',
            user_data.phone,
            user_data.biography,
            user_data.address,
            user_data.email,
            user_data.password,
            user_data.id_country
        ];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve({
                insertId: results.insertId
            });
        });
    });
}

function db_update_user_profile_pic (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE user SET profile_image_url = ? WHERE user.id = ?;`;

        const params = [
            'uploads\\users\\' + user_id + '\\profile_pic',
            user_id
        ];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve({
                insertId: results.insertId
            });
        });
    });
}

function db_add_auction_pic (auction_id, image_number) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO auction_images (id, image_url, id_auction) VALUES (NULL, ?, ?);`;

        const params = [
            'uploads\\auctions\\' + auction_id + '\\' + image_number + '.jpeg',
            auction_id
        ];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_is_user_already_registered (user_email) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT email FROM user WHERE user.email = ?;`;

        const params = [
            user_email
        ];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_user_match_login (user_email, user_password) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, password, banned, ban_reason FROM user WHERE user.email = ?;`;
        const params = [user_email];

        connection.query(sql, params, async (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length === 0) {
                return resolve({
                    results: null,
                    success: false,
                    message: 'User not registered'
                });
            }

            const user = results[0];

            if (user.banned) {
                return resolve({
                    results: null,
                    success: false,
                    message: 'User is banned: ' + user.ban_reason
                });
            }

            try {
                const password_match = await util.compare_password(user_password, user.password);
                if (password_match) {
                    resolve({
                        results: user,
                        success: true
                    });
                } else {
                    resolve({
                        results: null,
                        success: false,
                        message: 'Incorrect password'
                    });
                }
            } catch (compare_error) {
                return reject(compare_error);
            }
        });
    });
}

function db_get_user_from_id (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT user.id as id, user.name, user.surname, user.profile_image_url, user.phone, user.biography, 
                            user.shipping_address, user.email, country.id as country_id, country.name as country_name, user.registration_data, user.permission_level 
                        FROM user 
                        INNER JOIN country on country.id = user.id_country
                        WHERE user.id = ?;`;
        const params = [user_id];

        connection.query(sql, params, async (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    results: results[0],
                    success: true
                });
            } else {
                resolve({
                    results: null,
                    success: false
                });
            }
        });
    });
}

function db_get_categories () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM auction_categories';

        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

function db_get_durations () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM auction_durations';

        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

function db_get_user_report_reasons () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM report_reason';

        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

function db_insert_new_auction (auction, owner_id) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO auction (id, name, description, id_category, starting_price, actual_price, id_status, start_time, duration, id_duration, end_time, id_owner) VALUES (NULL, ?, ?, ?, ?, ?, 7, ?, ?, ?, ?, ?);`;

        const current_timestamp = util.get_current_timestamp();
        const params = [auction.name, 
                            auction.description, 
                            auction.category_id, 
                            auction.starting_price, 
                            auction.starting_price, 
                            current_timestamp,
                            auction.duration, 
                            auction.time_id,
                            util.round_minutes_to_interval(util.add_time_to_timestamp(current_timestamp, auction.duration, auction.time_id)), 
                            owner_id
                        ];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve({
                insertId: results.insertId
            });
        });
    });
}

function db_get_owner_auctions (owner_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name as 'category_name', auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name as 'status_name', auction_statuses.description as 'status_description', auction.start_time, auction.duration, auction_durations.name as 'duration_name', auction.end_time, auction.id_owner 
                        FROM auction
                        INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
                        INNER JOIN auction_categories ON auction.id_category = auction_categories.id
                        INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
                        WHERE auction.id_owner = ?`;

        const params = [owner_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_get_owner_auctions_with_max_bid (owner_id, page = 1, page_size = 5) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * page_size;

        const sql = `
            SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name AS 'category_name',
                auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name AS 'status_name',
                auction_statuses.description AS 'status_description', auction.start_time, auction.duration,
                auction_durations.name AS 'duration_name', auction.end_time, auction.id_owner, 
                owner_user.name AS 'owner_name', owner_user.surname AS 'owner_surname',
                COALESCE(max_bid.max_bid_value, 0) AS max_bid_value,
                COALESCE(max_bid.id_user, NULL) AS max_bid_user_id,
                COALESCE(max_bid.date, NULL) AS max_bid_date,
                COALESCE(bidder_user.name, '') AS max_bid_user_name,
                COALESCE(bidder_user.surname, '') AS max_bid_user_surname
            FROM auction
            INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
            INNER JOIN auction_categories ON auction.id_category = auction_categories.id
            INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
            INNER JOIN user AS owner_user ON auction.id_owner = owner_user.id
            LEFT JOIN (
                SELECT 
                    ab1.id_auction, 
                    ab1.value AS max_bid_value,
                    ab1.id_user, 
                    ab1.date
                FROM 
                    auction_bid ab1
                INNER JOIN (
                    SELECT 
                        id_auction, 
                        MAX(value) AS max_value
                    FROM 
                        auction_bid
                    GROUP BY 
                        id_auction
                ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
            ) AS max_bid ON auction.id = max_bid.id_auction
            LEFT JOIN user AS bidder_user ON max_bid.id_user = bidder_user.id
            WHERE auction.id_owner = ?
            ORDER BY auction.start_time DESC
            LIMIT ? OFFSET ?;`;
        
        const params = [owner_id, page_size, offset];
        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_get_auction_pics (auction_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(auction_images.id) as 'num_pics'
                        FROM auction_images
                        WHERE auction_images.id_auction = ?`;

        const params = [auction_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_update_auction (auction_edits) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE auction
                        SET
                            auction.name = ?,
                            auction.description = ?,
                            auction.id_category = ?
                        WHERE auction.id = ? AND auction.id_owner = ? AND (auction.id_status = 1 OR auction.id_status = 7);`;

        const params = [auction_edits.new_name, auction_edits.new_description, auction_edits.new_category_id, auction_edits.auction_id, auction_edits.auction_owner_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_cancel_auction (auction) {
    return new Promise((resolve, reject) => {
        const sql_update_auction = `
            UPDATE auction
            SET auction.id_status = 4
            WHERE auction.id = ? AND auction.id_owner = ? AND (auction.id_status = 1 OR auction.id_status = 7);`;

        const sql_delete_bids = `
            DELETE FROM auction_bid
            WHERE id_auction = ?;`;

        const params = [auction.id, auction.id_owner];

        connection.beginTransaction((err) => {
            if (err) {
                return reject(err);
            }

            connection.query(sql_update_auction, params, (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        reject(error);
                    });
                }

                connection.query(sql_delete_bids, [auction.id], (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(error);
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                reject(err);
                            });
                        }

                        resolve(results);
                    });
                });
            });
        });
    });
}


function db_get_others_auctions (owner_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name as 'category_name', auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name as 'status_name', auction_statuses.description as 'status_description', auction.start_time, auction.duration, auction_durations.name as 'duration_name', auction.end_time, auction.id_owner 
                        FROM auction
                        INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
                        INNER JOIN auction_categories ON auction.id_category = auction_categories.id
                        INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
                        WHERE auction.id_owner != ?
                            AND auction.id_status != 7
                            AND auction.end_time >= NOW() - INTERVAL 1 DAY`;

        const params = [owner_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_get_others_auctions_with_max_bid (owner_id, filter, category_id, page = 1, page_size = 5) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * page_size;

        let sql = `
            SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name AS 'category_name',
                auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name AS 'status_name',
                auction_statuses.description AS 'status_description', auction.start_time, auction.duration,
                auction_durations.name AS 'duration_name', auction.end_time, auction.id_owner, 
                owner_user.name AS 'owner_name', owner_user.surname AS 'owner_surname',
                COALESCE(max_bid.max_bid_value, 0) AS max_bid_value,
                COALESCE(max_bid.id_user, NULL) AS max_bid_user_id,
                COALESCE(max_bid.date, NULL) AS max_bid_date,
                COALESCE(bidder_user.name, '') AS max_bid_user_name,
                COALESCE(bidder_user.surname, '') AS max_bid_user_surname
            FROM auction
            INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
            INNER JOIN auction_categories ON auction.id_category = auction_categories.id
            INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
            INNER JOIN user AS owner_user ON auction.id_owner = owner_user.id
            LEFT JOIN (
                SELECT 
                    ab1.id_auction, 
                    ab1.value AS max_bid_value,
                    ab1.id_user, 
                    ab1.date
                FROM 
                    auction_bid ab1
                INNER JOIN (
                    SELECT 
                        id_auction, 
                        MAX(value) AS max_value
                    FROM 
                        auction_bid
                    GROUP BY 
                        id_auction
                ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
            ) AS max_bid ON auction.id = max_bid.id_auction
            LEFT JOIN user AS bidder_user ON max_bid.id_user = bidder_user.id
            WHERE auction.id_owner != ? 
            AND auction.id_status != 7 AND auction.id_status != 3 AND auction.id_status != 4
            AND auction.end_time >= NOW() - INTERVAL 1 DAY`;

        const params = [owner_id];

        if (filter) {
            sql += ` AND (auction.name LIKE ? OR auction.description LIKE ?)`;
            const likeFilter = `%${filter}%`;
            params.push(likeFilter, likeFilter);
        }

        if (category_id > 0) {
            sql += ` AND auction.id_category = ?`;
            params.push(category_id);
        }

        // Aggiunta di ORDER BY, LIMIT e OFFSET
        sql += ` ORDER BY auction.start_time DESC LIMIT ? OFFSET ?`;
        params.push(page_size, offset);  // Aggiunti page_size e offset ai parametri

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}


function db_get_single_auction_with_max_bid (auction_id) {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name AS 'category_name',
                auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name AS 'status_name',
                auction_statuses.description AS 'status_description', auction.start_time, auction.duration,
                auction_durations.name AS 'duration_name', auction.end_time, auction.id_owner, 
                owner_user.name AS 'owner_name', owner_user.surname AS 'owner_surname',
                COALESCE(max_bid.max_bid_value, 0) AS max_bid_value,
                COALESCE(max_bid.id_user, NULL) AS max_bid_user_id,
                COALESCE(max_bid.date, NULL) AS max_bid_date,
                COALESCE(bidder_user.name, '') AS max_bid_user_name,
                COALESCE(bidder_user.surname, '') AS max_bid_user_surname
            FROM auction
            INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
            INNER JOIN auction_categories ON auction.id_category = auction_categories.id
            INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
            INNER JOIN user AS owner_user ON auction.id_owner = owner_user.id
            LEFT JOIN (
                SELECT 
                    ab1.id_auction, 
                    ab1.value AS max_bid_value,
                    ab1.id_user, 
                    ab1.date
                FROM 
                    auction_bid ab1
                INNER JOIN (
                    SELECT 
                        id_auction, 
                        MAX(value) AS max_value
                    FROM 
                        auction_bid
                    GROUP BY 
                        id_auction
                ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
            ) AS max_bid ON auction.id = max_bid.id_auction
            LEFT JOIN user AS bidder_user ON max_bid.id_user = bidder_user.id
            WHERE auction.id = ? 
            AND auction.id_status != 7 AND auction.id_status != 3`;

        const params = [auction_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results[0]);
        });
    });
}

function db_get_auction_with_max_bid (auction_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name as 'category_name',
                auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name as 'status_name',
                auction_statuses.description as 'status_description', auction.start_time, auction.duration,
                auction_durations.name as 'duration_name', auction.end_time, auction.id_owner, owner.name as 'owner_name', owner.surname as 'owner_surname',
                COALESCE(max_bid.max_bid_value, 0) AS max_bid_value,
                COALESCE(max_bid.id_user, NULL) AS max_bid_user_id,
                COALESCE(max_bid.date, NULL) AS max_bid_date,
                COALESCE(bidder.name, '') AS max_bid_user_name,
                COALESCE(bidder.surname, '') AS max_bid_user_surname
            FROM auction
            INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
            INNER JOIN auction_categories ON auction.id_category = auction_categories.id
            INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
            INNER JOIN user AS owner ON auction.id_owner = owner.id
            LEFT JOIN (
                SELECT 
                    ab1.id_auction, 
                    ab1.value AS max_bid_value,
                    ab1.id_user, 
                    ab1.date
                FROM 
                    auction_bid ab1
                INNER JOIN (
                    SELECT 
                        id_auction, 
                        MAX(value) AS max_value
                    FROM 
                        auction_bid
                    GROUP BY 
                        id_auction
                ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
            ) AS max_bid ON auction.id = max_bid.id_auction
            LEFT JOIN user AS bidder ON max_bid.id_user = bidder.id
            WHERE auction.id = ?`;

        const params = [auction_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_add_auction_bid (auction, new_bid, user_id) {
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) { 
                reject(err);
                throw err;
            }

            let sql = 'SELECT id_status, id_owner FROM auction WHERE id = ?';
            let params = [auction.id];
            connection.query(sql, params, (err, results) => {
                if (err) {
                    connection.rollback(() => {
                        reject(err);
                        throw err;
                    });
                }

                if (results.length === 0 || results[0].id_status !== 1) {
                    connection.rollback(() => {
                        reject({
                            success: false,
                            message: 'Auction is not active for bidding'
                        });
                    });
                    return;
                }

                if (results.length === 0 || results[0].id_owner === user_id) {
                    connection.rollback(() => {
                        reject({
                            success: false,
                            message: 'You can\'t bid on your auction'
                        });
                    });
                    return;
                }

                sql = 'SELECT MAX(auction_bid.value) as max_bid_value FROM auction_bid WHERE id_auction = ?';
                params = [auction.id];
                connection.query(sql, params, (err, results) => {
                    if (err) {
                        connection.rollback(() => {
                            reject(err);
                            throw err;
                        });
                    }

                    const max_bid_value = results[0].max_bid_value || 0; // If no bids, set to 0

                    if (new_bid <= max_bid_value) {
                        connection.rollback(() => {
                            reject({
                                success: false,
                                message: 'Bid value must be greater than the current highest bid'
                            });
                        });
                        return;
                    }

                    sql = 'INSERT INTO auction_bid (id, value, id_auction, id_user, date) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)';
                    params = [new_bid, auction.id, user_id];
                    connection.query(sql, params, (err, results) => {
                        if (err) {
                            connection.rollback(() => {
                                reject(err);
                                throw err;
                            });
                        }

                        sql = 'UPDATE auction SET auction.actual_price = ? WHERE auction.id = ?';
                        params = [new_bid, auction.id];
                        connection.query(sql, params, (err, results) => {
                            if (err) {
                                connection.rollback(() => {
                                    reject(err);
                                    throw err;
                                });
                            }

                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => {
                                        reject(err);
                                        throw err;
                                    });
                                }

                                resolve(results);
                            });
                        });
                    });
                });
            });
        });
    });
}

function db_get_user_less_info_from_id (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT user.id, user.name, user.surname, user.profile_image_url, user.biography, country.name as country_name, user.registration_data, user.banned, user.ban_reason 
                        FROM user 
                        INNER JOIN country on country.id = user.id_country
                        WHERE user.id = ?;`;
        const params = [user_id];

        connection.query(sql, params, async (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    results: results[0],
                    success: true
                });
            } else {
                resolve({
                    results: null,
                    success: false
                });
            }
        });
    });
}

function db_get_user_sent_rate (sender_id, user_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT user_feedback.id, user_feedback.id_sender, user_feedback.id_rated, user_feedback.star_value, user_feedback.feedback
                        FROM user_feedback 
                        WHERE user_feedback.id_sender = ? AND user_feedback.id_rated = ?;`;
        const params = [sender_id, user_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    feedback: results[0],
                    success: true
                });
            } else {
                resolve({
                    feedback_id: -1,
                    success: false
                });
            }
        });
    });
}

function db_get_user_received_feedback (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                user_feedback.id, 
                user_feedback.id_sender, 
                user_feedback.id_rated, 
                user_feedback.star_value, 
                user_feedback.feedback, 
                user_feedback.timestamp, 
                user.name AS user_name, 
                user.surname AS user_surname
            FROM user_feedback
            INNER JOIN user ON user.id = user_feedback.id_sender
            WHERE user_feedback.id_rated = ?;`;
        const params = [user_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    feedback: results,
                    success: true
                });
            } else {
                resolve({
                    feedback: [],
                    success: false
                });
            }
        });
    });
}

function db_send_new_user_feedback (user_id, sender_id, new_rating, feedback) {
    return new Promise((resolve, reject) => {
        if (user_id === sender_id) {
            return resolve({
                success: false,
                message: 'Users cannot submit feedback for their own profile.'
            });
        }

        const checkSql = `
            SELECT id 
            FROM user_feedback 
            WHERE id_rated = ? AND id_sender = ?;`;
        const checkParams = [user_id, sender_id];

        connection.query(checkSql, checkParams, (checkError, checkResults) => {
            if (checkError) {
                return reject(checkError);
            }

            if (checkResults.length > 0) {
                resolve({
                    success: false,
                    message: 'User has already submitted feedback for this profile.'
                });
            } else {
                const insertSql = `
                    INSERT INTO user_feedback (id, id_rated, id_sender, star_value, feedback, timestamp) 
                    VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP);`;
                const insertParams = [user_id, sender_id, new_rating, feedback];

                connection.query(insertSql, insertParams, (insertError, insertResults) => {
                    if (insertError) {
                        return reject(insertError);
                    }

                    if (insertResults.affectedRows > 0) {
                        resolve({
                            success: true
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }
                });
            }
        });
    });
}

function db_update_user_feedback (user_id, sender_id, new_rating, feedback) {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE user_feedback
            SET star_value = ?, feedback = ?, timestamp = CURRENT_TIMESTAMP
            WHERE id_rated = ? AND id_sender = ?;`;
        const params = [new_rating, feedback, user_id, sender_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.affectedRows > 0) {
                resolve({
                    success: true,
                });
            } else {
                resolve({
                    success: false,
                });
            }
        });
    });
}

function get_user_posted_auctions (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name as 'category_name',
                        auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name as 'status_name',
                        auction_statuses.description as 'status_description', auction.start_time, auction.duration,
                        auction_durations.name as 'duration_name', auction.end_time, auction.id_owner, owner.name as 'owner_name', owner.surname as 'owner_surname',
                        COALESCE(max_bid.max_bid_value, 0) AS max_bid_value,
                        COALESCE(max_bid.id_user, NULL) AS max_bid_user_id,
                        COALESCE(max_bid.date, NULL) AS max_bid_date,
                        COALESCE(bidder.name, '') AS max_bid_user_name,
                        COALESCE(bidder.surname, '') AS max_bid_user_surname
                    FROM auction
                    INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
                    INNER JOIN auction_categories ON auction.id_category = auction_categories.id
                    INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
                    INNER JOIN user AS owner ON auction.id_owner = owner.id
                    LEFT JOIN (
                        SELECT 
                            ab1.id_auction, 
                            ab1.value AS max_bid_value,
                            ab1.id_user, 
                            ab1.date
                        FROM 
                            auction_bid ab1
                        INNER JOIN (
                            SELECT 
                                id_auction, 
                                MAX(value) AS max_value
                            FROM 
                                auction_bid
                            GROUP BY 
                                id_auction
                        ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
                    ) AS max_bid ON auction.id = max_bid.id_auction
                    LEFT JOIN user AS bidder ON max_bid.id_user = bidder.id
                    WHERE auction.id_owner = ? AND auction.id_status != 1 AND auction.id_status != 7 AND auction.id_status != 3;`;
        const params = [user_id];

        connection.query(sql, params, async (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    results: results,
                    success: true
                });
            } else {
                resolve({
                    results: null,
                    success: false
                });
            }
        });
    });
}

function get_user_active_auctions (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name as 'category_name',
                        auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name as 'status_name',
                        auction_statuses.description as 'status_description', auction.start_time, auction.duration,
                        auction_durations.name as 'duration_name', auction.end_time, auction.id_owner, owner.name as 'owner_name', owner.surname as 'owner_surname',
                        COALESCE(max_bid.max_bid_value, 0) AS max_bid_value,
                        COALESCE(max_bid.id_user, NULL) AS max_bid_user_id,
                        COALESCE(max_bid.date, NULL) AS max_bid_date,
                        COALESCE(bidder.name, '') AS max_bid_user_name,
                        COALESCE(bidder.surname, '') AS max_bid_user_surname
                    FROM auction
                    INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
                    INNER JOIN auction_categories ON auction.id_category = auction_categories.id
                    INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
                    INNER JOIN user AS owner ON auction.id_owner = owner.id
                    LEFT JOIN (
                        SELECT 
                            ab1.id_auction, 
                            ab1.value AS max_bid_value,
                            ab1.id_user, 
                            ab1.date
                        FROM 
                            auction_bid ab1
                        INNER JOIN (
                            SELECT 
                                id_auction, 
                                MAX(value) AS max_value
                            FROM 
                                auction_bid
                            GROUP BY 
                                id_auction
                        ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
                    ) AS max_bid ON auction.id = max_bid.id_auction
                    LEFT JOIN user AS bidder ON max_bid.id_user = bidder.id
                    WHERE auction.id_owner = ? AND auction.id_status = 1;`;
        const params = [user_id];

        connection.query(sql, params, async (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    results: results,
                    success: true
                });
            } else {
                resolve({
                    results: null,
                    success: false
                });
            }
        });
    });
}

function get_user_won_auctions (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                auction.id, 
                auction.name, 
                auction.description, 
                auction.id_category, 
                auction_categories.name AS 'category_name',
                auction.starting_price, 
                auction.actual_price, 
                auction.id_status, 
                auction_statuses.name AS 'status_name',
                auction_statuses.description AS 'status_description', 
                auction.start_time, 
                auction.duration,
                auction_durations.name AS 'duration_name', 
                auction.end_time, 
                auction.id_owner, 
                owner.name AS 'owner_name', 
                owner.surname AS 'owner_surname',
                max_bid.max_bid_value, 
                max_bid.id_user AS max_bid_user_id, 
                max_bid.date AS max_bid_date
            FROM 
                auction
            INNER JOIN 
                auction_statuses ON auction.id_status = auction_statuses.id
            INNER JOIN 
                auction_categories ON auction.id_category = auction_categories.id
            INNER JOIN 
                auction_durations ON auction.id_duration = auction_durations.id
            INNER JOIN 
                user AS owner ON auction.id_owner = owner.id
            LEFT JOIN (
                SELECT 
                    ab1.id_auction, 
                    ab1.value AS max_bid_value, 
                    ab1.id_user, 
                    ab1.date
                FROM 
                    auction_bid ab1
                INNER JOIN (
                    SELECT 
                        id_auction, 
                        MAX(value) AS max_value
                    FROM 
                        auction_bid
                    GROUP BY 
                        id_auction
                ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
                WHERE 
                    ab1.id_user = ?
            ) AS max_bid ON auction.id = max_bid.id_auction
            WHERE 
                auction.end_time < NOW() 
                AND auction.id_status = 5 
                AND max_bid.id_user = ?;`;
        
        const params = [user_id, user_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    results: results,
                    success: true
                });
            } else {
                resolve({
                    results: null,
                    success: false
                });
            }
        });
    });
}

function get_user_placed_bids (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                auction.id, 
                auction.name, 
                auction.description, 
                auction.id_category, 
                auction_categories.name AS category_name, 
                auction.starting_price, 
                auction.actual_price, 
                auction.id_status, 
                auction_statuses.name AS status_name, 
                auction_statuses.description AS status_description, 
                auction.start_time, 
                auction.duration, 
                auction_durations.name AS duration_name, 
                auction.end_time, 
                auction.id_owner, 
                owner.name AS owner_name, 
                owner.surname AS owner_surname, 
                user_bids.max_bid_value, 
                user_bids.bid_date
            FROM 
                auction
            INNER JOIN 
                auction_statuses ON auction.id_status = auction_statuses.id
            INNER JOIN 
                auction_categories ON auction.id_category = auction_categories.id
            INNER JOIN 
                auction_durations ON auction.id_duration = auction_durations.id
            INNER JOIN 
                user AS owner ON auction.id_owner = owner.id
            LEFT JOIN (
                SELECT 
                    ab.id_auction,
                    MAX(ab.value) AS max_bid_value,
                    MAX(ab.date) AS bid_date
                FROM 
                    auction_bid ab
                WHERE 
                    ab.id_user = ?
                GROUP BY 
                    ab.id_auction
            ) user_bids ON auction.id = user_bids.id_auction
            WHERE 
                auction.id_owner != ? 
                AND user_bids.max_bid_value IS NOT NULL;`;
        
        const params = [user_id, user_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    results: results,
                    success: true
                });
            } else {
                resolve({
                    results: null,
                    success: false
                });
            }
        });
    });
}

function db_update_user_general_info (user_id, user_edits) {
    return new Promise((resolve, reject) => {
        const sql = `
                UPDATE
                    user
                SET
                    user.name = ?,
                    user.surname = ?,
                    user.biography = ?,
                    user.shipping_address = ?,
                    user.id_country = ?,
                    user.phone = ?
                WHERE
                    user.id = ?;`;
        const params = [user_edits.name, user_edits.surname, user_edits.biography, user_edits.address, user_edits.id_country, user_edits.phone, user_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            resolve(results);
        });
    });
}

function db_update_user_email (user_id, new_email) {
    return new Promise((resolve, reject) => {

        const sql_check_email = `
            SELECT COUNT(*) AS count
            FROM user
            WHERE email = ?;`;
        const email_params = [new_email];

        connection.query(sql_check_email, email_params, (checkError, checkResults) => {
            if (checkError) {
                return reject(checkError);
            }

            const email_count = checkResults[0].count;
            if (email_count > 0) {
                return resolve({
                    success: false,
                    message: 'Email already in use'
                });
            }

            const sql_update_email = `
                UPDATE user
                SET email = ?
                WHERE id = ?;`;
            const sql_update_email_params = [new_email, user_id];

            connection.query(sql_update_email, sql_update_email_params, (updateError, updateResults) => {
                if (updateError) {
                    return reject(updateError);
                }

                resolve({
                    success: true
                });
            });
        });
    });
}

async function db_update_user_password (user_id, old_password, new_password) {
    return new Promise((resolve, reject) => {
        const sql_get_old_password = `
            SELECT password
            FROM user
            WHERE id = ?;`;
        const params_get_old_password = [user_id];

        connection.query(sql_get_old_password, params_get_old_password, async (getError, getResults) => {
            if (getError) {
                return reject(getError);
            }

            if (getResults.length === 0) {
                return resolve({
                    success: false,
                    message: 'User not found'
                });
            }

            const hashed_old_password = getResults[0].password;

            const isMatch = await util.compare_password(old_password, hashed_old_password);
            if (!isMatch) {
                return resolve({
                    success: false,
                    message: 'Old password does not match'
                });
            }

            const hashed_new_password = await util.hash_password(new_password);

            const sql_update_password = `
                UPDATE user
                SET password = ?
                WHERE id = ?;`;
            const params_update_password = [hashed_new_password, user_id];

            connection.query(sql_update_password, params_update_password, (updateError, updateResults) => {
                if (updateError) {
                    return reject(updateError);
                }

                resolve({
                    success: true
                });
            });
        });
    });
}

function db_get_pending_review_auctions (user_id, page = 1, page_size = 5) {
    return new Promise((resolve, reject) => {
        const sql_check_permission = `
            SELECT permission_level
            FROM user
            WHERE id = ?;`;
        const params_check_permission = [user_id];

        connection.query(sql_check_permission, params_check_permission, (checkError, checkResults) => {
            if (checkError) {
                return reject(checkError);
            }

            if (checkResults.length === 0) {
                return resolve({
                    success: false,
                    message: 'User not found'
                });
            }

            const permission_level = checkResults[0].permission_level;
            if (permission_level <= 0) {
                return resolve({
                    success: false,
                    message: 'User does not have sufficient permissions'
                });
            }

            const offset = (page - 1) * page_size;

            const sql_get_auctions = `
                SELECT auction.id, auction.name, auction.description, 
                    auction.id_category, auction_categories.name AS category_name, auction.starting_price, auction.actual_price, 
                    auction.id_status, auction_statuses.name AS status_name, auction_statuses.description AS status_description, 
                    auction.start_time, auction.duration, auction_durations.name AS duration_name, auction.end_time, auction.id_owner, 
                    owner.name AS owner_name, owner.surname AS owner_surname
                FROM auction
                INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
                INNER JOIN auction_categories ON auction.id_category = auction_categories.id
                INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
                INNER JOIN user AS owner ON auction.id_owner = owner.id
                WHERE id_status = 7 AND auction.id_owner != ?
                LIMIT ? OFFSET ?;`;

            const params = [user_id, page_size, offset];

            connection.query(sql_get_auctions, params, (getError, getResults) => {
                if (getError) {
                    return reject(getError);
                }

                resolve({
                    success: true,
                    auctions: getResults
                });
            });
        });
    });
}

function db_allow_auction (user_id, auction_id) {
    return new Promise((resolve, reject) => {
        const sql_check_permission = `
            SELECT permission_level
            FROM user
            WHERE id = ?;`;
        const params_check_permission = [user_id];

        connection.query(sql_check_permission, params_check_permission, (checkError, checkResults) => {
            if (checkError) {
                return reject(checkError);
            }

            if (checkResults.length === 0) {
                return resolve({
                    success: false,
                    message: 'User not found'
                });
            }

            const permission_level = checkResults[0].permission_level;
            if (permission_level <= 0) {
                return resolve({
                    success: false,
                    message: 'User does not have sufficient permissions'
                });
            }

            const sql_get_auction_details = `
                SELECT duration, id_duration
                FROM auction
                WHERE id = ?;`;
            const params_get_auction_details = [auction_id];

            connection.query(sql_get_auction_details, params_get_auction_details, (getAuctionError, auctionResults) => {
                if (getAuctionError) {
                    return reject(getAuctionError);
                }

                if (auctionResults.length === 0) {
                    return resolve({
                        success: false,
                        message: 'Auction not found'
                    });
                }

                const { duration, id_duration } = auctionResults[0];

                const new_end_time = util.round_minutes_to_interval(util.add_time_to_timestamp(util.get_current_timestamp(), duration, id_duration));

                const sql_allow_auction = `
                    UPDATE auction
                    SET id_status = 1, start_time = CURRENT_TIMESTAMP, end_time = ?
                    WHERE id = ?;`;
                const params_allow_auction = [new_end_time, auction_id];

                connection.query(sql_allow_auction, params_allow_auction, (updateError, updateResults) => {
                    if (updateError) {
                        return reject(updateError);
                    }

                    resolve({
                        success: true
                    });
                });
            });
        });
    });
}

function db_deny_auction (user_id, auction_id) {
    return new Promise((resolve, reject) => {
        const sql_check_permission = `
            SELECT permission_level
            FROM user
            WHERE id = ?;`;
        const params_check_permission = [user_id];

        connection.query(sql_check_permission, params_check_permission, (checkError, checkResults) => {
            if (checkError) {
                return reject(checkError);
            }

            if (checkResults.length === 0) {
                return resolve({
                    success: false,
                    message: 'User not found'
                });
            }

            const permission_level = checkResults[0].permission_level;
            if (permission_level <= 0) {
                return resolve({
                    success: false,
                    message: 'User does not have sufficient permissions'
                });
            }

            const sql_allow_auctions = `
                                UPDATE
                                    auction
                                SET
                                    auction.id_status = 3
                                WHERE
                                    auction.id = ?;`;
            const params = [auction_id];

            connection.query(sql_allow_auctions, params, (getError, getResults) => {
                if (getError) {
                    return reject(getError);
                }

                resolve({
                    success: true
                });
            });
        });
    });
}

function db_get_user_list (user_id, name_surname_filter, page = 1, page_size = 5) {
    return new Promise((resolve, reject) => {
        let sql;
        const params = [user_id];
        const offset = (page - 1) * page_size;

        if (!name_surname_filter || name_surname_filter.length < 1) {
            sql = `
                SELECT user.id, user.name, user.surname, country.name as 'country_name'
                FROM user
                INNER JOIN country ON country.id = user.id_country
                WHERE user.id != ?
                LIMIT ? OFFSET ?;`;
            params.push(page_size, offset);
        } else {
            sql = `
                SELECT user.id, user.name, user.surname, country.name as 'country_name'
                FROM user
                INNER JOIN country ON country.id = user.id_country
                WHERE user.id != ? AND (user.name LIKE ? OR user.surname LIKE ?)
                LIMIT ? OFFSET ?;`;
            const filterParam = `%${name_surname_filter}%`;
            params.push(filterParam, filterParam, page_size, offset);
        }

        connection.query(sql, params, (err, res) => {
            if (err) {
                return reject(err);
            }

            return resolve(res);
        });
    });
}

function db_send_user_report (report) {
    return new Promise((resolve, reject) => {
        const { reporter_id, reported_id, reason_id, custom_reason } = report;
        let sql_check_users = `
            SELECT COUNT(*) AS count
            FROM user
            WHERE id IN (?, ?);`;
        const params_check_users = [reporter_id, reported_id];

        connection.query(sql_check_users, params_check_users, (err_check, res_check) => {
            if (err_check) {
                return reject(err_check);
            }

            const user_count = res_check[0].count;
            if (user_count < 2) {
                return resolve({
                    success: false,
                    message: 'One or both users do not exist'
                });
            }

            let sql_insert_report = `
                INSERT INTO user_reports (id, id_reporter, id_reported, timestamp, id_reason, custom_reason)
                VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, ?, ?);`;

            let custom_reason_value = ' ';
            if (Number(reason_id) == -2) {
                custom_reason_value = custom_reason;
            }
            const params_insert_report = [reporter_id, reported_id, reason_id, custom_reason_value];

            connection.query(sql_insert_report, params_insert_report, (err_insert, res_insert) => {
                if (err_insert) {
                    return reject(err_insert);
                }

                const inserted_report_id = res_insert.insertId;

                resolve({
                    success: true,
                    message: 'Report submitted successfully',
                    report_id: inserted_report_id
                });
            });
        });
    });
}

function db_get_reports (user_id, page = 1, page_size = 5) {
    return new Promise((resolve, reject) => {
        const check_permission_sql = `
            SELECT permission_level 
            FROM user 
            WHERE id = ?;`;

        connection.query(check_permission_sql, [user_id], (check_error, check_results) => {
            if (check_error) {
                return reject(check_error);
            }

            if (check_results.length === 0 || check_results[0].permission_level !== 1) {
                return resolve({
                    success: false,
                    message: 'Insufficient permissions'
                });
            }

            const offset = (page - 1) * page_size;

            const get_reports_sql = `
                SELECT 
                    user_reports.id, 
                    user_reports.id_reporter, 
                    user_reports.id_reported, 
                    user_reports.timestamp, 
                    user_reports.custom_reason,
                    report_reason.name AS reason_name,
                    reporter.id AS reporter_id, 
                    reporter.name AS reporter_name, 
                    reporter.surname AS reporter_surname,
                    reported.id AS reported_id,
                    reported.name AS reported_name,
                    reported.surname AS reported_surname
                FROM 
                    user_reports
                LEFT JOIN 
                    report_reason ON report_reason.id = user_reports.id_reason
                INNER JOIN 
                    user AS reporter ON reporter.id = user_reports.id_reporter
                INNER JOIN 
                    user AS reported ON reported.id = user_reports.id_reported
                ORDER BY 
                    user_reports.timestamp DESC
                LIMIT ? OFFSET ?;`;

            const params = [page_size, offset];

            connection.query(get_reports_sql, params, (get_reports_error, get_reports_results) => {
                if (get_reports_error) {
                    return reject(get_reports_error);
                }

                resolve({
                    success: true,
                    data: get_reports_results
                });
            });
        });
    });
}


function db_get_report_from_id (user_id, report_id) {
    return new Promise((resolve, reject) => {
        const check_permission_sql = `
            SELECT permission_level 
            FROM user 
            WHERE id = ?;`;

        connection.query(check_permission_sql, [user_id], (check_error, check_results) => {
            if (check_error) {
                return reject(check_error);
            }

            if (check_results.length === 0 || check_results[0].permission_level !== 1) {
                return resolve({
                    success: false,
                    message: 'Insufficient permissions'
                });
            }

            const get_reports_sql = `
                            SELECT 
                                user_reports.id, 
                                user_reports.id_reporter, 
                                user_reports.id_reported, 
                                user_reports.timestamp, 
                                user_reports.custom_reason,
                                report_reason.name AS reason_name,
                                reporter.id AS reporter_id, 
                                reporter.name AS reporter_name, 
                                reporter.surname AS reporter_surname,
                                reported.id AS reported_id,
                                reported.name AS reported_name,
                                reported.surname AS reported_surname
                            FROM 
                                user_reports
                            LEFT JOIN 
                                report_reason ON report_reason.id = user_reports.id_reason
                            INNER JOIN 
                                user AS reporter ON reporter.id = user_reports.id_reporter
                            INNER JOIN 
                                user AS reported ON reported.id = user_reports.id_reported
                            WHERE 
                                user_reports.id = ?
                            ORDER BY 
                                user_reports.timestamp DESC;`;

            const params = [report_id];

            connection.query(get_reports_sql, params, (get_reports_error, get_reports_results) => {
                if (get_reports_error) {
                    return reject(get_reports_error);
                }

                resolve({
                    success: true,
                    data: get_reports_results
                });
            });
        });
    });
}

function db_delete_report (user_id, report) {
    return new Promise((resolve, reject) => {
        const check_permission_sql = `
            SELECT permission_level 
            FROM user 
            WHERE id = ?;`;

        connection.query(check_permission_sql, [user_id], (check_error, check_results) => {
            if (check_error) {
                return reject(check_error);
            }

            if (check_results.length === 0 || check_results[0].permission_level !== 1) {
                return resolve({
                    success: false,
                    message: 'Insufficient permissions'
                });
            }

            const select_report_sql = `
                SELECT * 
                FROM user_reports 
                WHERE id = ? 
                AND id_reporter = ? 
                AND id_reported = ?;`;
            const params = [report.id, report.reporter_id, report.reported_id];

            connection.query(select_report_sql, params, (select_error, select_results) => {
                if (select_error) {
                    return reject(select_error);
                }

                if (select_results.length === 0) {
                    return resolve({
                        success: false,
                        message: 'Report not found'
                    });
                }

                const report_to_delete = select_results[0];

                const delete_report_sql = `
                    DELETE FROM user_reports 
                    WHERE id = ? 
                    AND id_reporter = ? 
                    AND id_reported = ?;`;

                connection.query(delete_report_sql, params, (delete_error, delete_results) => {
                    if (delete_error) {
                        return reject(delete_error);
                    }

                    resolve({
                        success: true,
                        deleted_report: report_to_delete
                    });
                });
            });
        });
    });
}

function db_ban_user (user_id, user_ban_id, reason) {
    return new Promise((resolve, reject) => {
        const check_permission_sql = `
            SELECT permission_level 
            FROM user 
            WHERE id = ?;`;

        connection.query(check_permission_sql, [user_id], (check_error, check_results) => {
            if (check_error) {
                return reject(check_error);
            }

            if (check_results.length === 0 || check_results[0].permission_level <= 0) {
                return resolve({
                    success: false,
                    message: 'Insufficient permissions'
                });
            }

            const check_user_exists_sql = `
                SELECT id 
                FROM user 
                WHERE id = ?;`;

            connection.query(check_user_exists_sql, [user_ban_id], (check_user_error, check_user_results) => {
                if (check_user_error) {
                    return reject(check_user_error);
                }

                if (check_user_results.length === 0) {
                    return resolve({
                        success: false,
                        message: 'User to ban does not exist'
                    });
                }

                const ban_user_sql = `
                    UPDATE user 
                    SET banned = 1, ban_reason = ? 
                    WHERE id = ?;`;

                connection.query(ban_user_sql, [reason, user_ban_id], (ban_error, ban_results) => {
                    if (ban_error) {
                        return reject(ban_error);
                    }

                    resolve({
                        success: true,
                    });
                });
            });
        });
    });
}

function db_unban_user (user_id, user_ban_id) {
    return new Promise((resolve, reject) => {
        const check_permission_sql = `
            SELECT permission_level 
            FROM user 
            WHERE id = ?;`;

        connection.query(check_permission_sql, [user_id], (check_error, check_results) => {
            if (check_error) {
                return reject(check_error);
            }

            if (check_results.length === 0 || check_results[0].permission_level <= 0) {
                return resolve({
                    success: false,
                    message: 'Insufficient permissions'
                });
            }

            const check_user_exists_sql = `
                SELECT id 
                FROM user 
                WHERE id = ?;`;

            connection.query(check_user_exists_sql, [user_ban_id], (check_user_error, check_user_results) => {
                if (check_user_error) {
                    return reject(check_user_error);
                }

                if (check_user_results.length === 0) {
                    return resolve({
                        success: false,
                        message: 'User to unban does not exist'
                    });
                }

                const ban_user_sql = `
                    UPDATE user 
                    SET banned = 0, ban_reason = '' 
                    WHERE id = ?;`;

                connection.query(ban_user_sql, [user_ban_id], (ban_error, ban_results) => {
                    if (ban_error) {
                        return reject(ban_error);
                    }

                    resolve({
                        success: true,
                    });
                });
            });
        });
    });
}

function db_update_expired_auctions() {
    return new Promise((resolve, reject) => {
        const sql_sold_auctions = `
            UPDATE auction a
            JOIN (
                SELECT id_auction
                FROM auction_bid
                GROUP BY id_auction
            ) ab ON a.id = ab.id_auction
            SET a.id_status = 5
            WHERE a.id_status = 1 AND a.end_time <= NOW();`;

        connection.query(sql_sold_auctions, (error, results) => {
            if (error) {
                console.error(PREFIX + 'Error on updating sold auctions:', error);
                return reject({success:false});
            }
            console.log(PREFIX + 'Updated sold auctions', results.affectedRows);

            const sql_expired_auctions = `
                UPDATE auction
                SET id_status = 6
                WHERE id_status = 1 AND end_time <= NOW() AND id NOT IN (
                    SELECT id_auction
                    FROM auction_bid
                );`;

            connection.query(sql_expired_auctions, (error, results) => {
                if (error) {
                    console.error(PREFIX + 'Error on updating expired auctions:', error);
                    return reject({success:false});
                }
                console.log(PREFIX + 'Updated expired auctions:', results.affectedRows);

                const sql_select_updated_auctions = `
                    SELECT 
                        auction.id, 
                        auction.name, 
                        auction.description, 
                        auction.id_category, 
                        auction_categories.name AS category_name, 
                        auction.starting_price, 
                        auction.actual_price, 
                        auction.id_status, 
                        auction_statuses.name AS status_name, 
                        auction_statuses.description AS status_description, 
                        auction.start_time, 
                        auction.duration, 
                        auction_durations.name AS duration_name, 
                        auction.end_time, 
                        auction.id_owner, 
                        owner.name AS owner_name, 
                        owner.surname AS owner_surname, 
                        max_bid.id_user AS bidder_id, 
                        max_bid.max_bid_value, 
                        max_bid.date AS bid_date, 
                        bidder.name AS bidder_name, 
                        bidder.surname AS bidder_surname
                    FROM 
                        auction
                    INNER JOIN 
                        auction_statuses ON auction.id_status = auction_statuses.id
                    INNER JOIN 
                        auction_categories ON auction.id_category = auction_categories.id
                    INNER JOIN 
                        auction_durations ON auction.id_duration = auction_durations.id
                    INNER JOIN 
                        user AS owner ON auction.id_owner = owner.id
                    LEFT JOIN (
                        SELECT 
                            ab.id_auction,
                            ab.id_user,
                            ab.value AS max_bid_value,
                            ab.date
                        FROM 
                            auction_bid ab
                        INNER JOIN (
                            SELECT 
                                id_auction, 
                                MAX(value) AS max_value
                            FROM 
                                auction_bid
                            GROUP BY 
                                id_auction
                        ) max_ab ON ab.id_auction = max_ab.id_auction AND ab.value = max_ab.max_value
                    ) max_bid ON auction.id = max_bid.id_auction
                    LEFT JOIN 
                        user AS bidder ON max_bid.id_user = bidder.id
                    WHERE 
                        (auction.id_status = 5 OR auction.id_status = 6) 
                        AND auction.end_time BETWEEN (NOW() - INTERVAL 20 MINUTE) AND (NOW() - INTERVAL 1 SECOND);`;

                connection.query(sql_select_updated_auctions, (error, results) => {
                    if (error) {
                        console.error(PREFIX + 'Error on selecting updated auctions:', error);
                        return reject({success:false});
                    }

                    if (results.length >= 1) {
                        resolve({success:true, auctions: results});
                    } else {
                        resolve({success:false});
                    }
                });
            });
        });
    });
}

function db_get_is_favorite_auction (user_id, auction_id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(*) as count
                     FROM user_favorite_auctions
                     WHERE id_user = ? AND id_auction = ?`;

        const params = [user_id, auction_id];

        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }

            const is_favorite = results[0].count > 0;
            resolve(is_favorite);
        });
    });
}

function db_add_favorite_auction (user_id, auction_id) {
    return new Promise((resolve, reject) => {
        const check_sql = `SELECT COUNT(*) as count
                           FROM user_favorite_auctions
                           WHERE id_user = ? AND id_auction = ?`;

        const check_params = [user_id, auction_id];

        connection.query(check_sql, check_params, (error, results) => {
            if (error) {
                return reject(error);
            }

            const is_favorite = results[0].count > 0;

            if (is_favorite) {
                resolve({ 
                    success: false,
                    message: 'Auction is already a favorite' 
                });
            } else {
                const insert_sql = `INSERT INTO user_favorite_auctions (id_user, id_auction)
                                    VALUES (?, ?)`;
                const insert_params = [user_id, auction_id];

                connection.query(insert_sql, insert_params, (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve({ 
                        success: true,
                        message: 'Auction added to favorites', 
                        insert_id: results.insertId 
                    });
                });
            }
        });
    });
}

function db_remove_favorite_auction (user_id, auction_id) {
    return new Promise((resolve, reject) => {
        const check_sql = `SELECT COUNT(*) as count
                           FROM user_favorite_auctions
                           WHERE id_user = ? AND id_auction = ?`;

        const check_params = [user_id, auction_id];

        connection.query(check_sql, check_params, (error, results) => {
            if (error) {
                return reject(error);
            }

            const is_favorite = results[0].count > 0;

            if (!is_favorite) {
                resolve({ 
                    success: false,
                    message: 'Auction is not in favorites' 
                });
            } else {
                const delete_sql = `DELETE FROM user_favorite_auctions
                                    WHERE id_user = ? AND id_auction = ?`;
                const delete_params = [user_id, auction_id];

                connection.query(delete_sql, delete_params, (error, results) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve({ 
                        success: true,
                        message: 'Auction removed from favorites', 
                        affected_rows: results.affectedRows 
                    });
                });
            }
        });
    });
}

function db_get_user_favorite_auctions (user_id, page = 1, page_size = 8) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * page_size;

        const sql = `
            SELECT auction.id, auction.name, auction.description, auction.id_category, auction_categories.name as 'category_name',
                   auction.starting_price, auction.actual_price, auction.id_status, auction_statuses.name as 'status_name',
                   auction_statuses.description as 'status_description', auction.start_time, auction.duration,
                   auction_durations.name as 'duration_name', auction.end_time, auction.id_owner, owner.name as 'owner_name', owner.surname as 'owner_surname',
                   COALESCE(max_bid.max_bid_value, 0) AS max_bid_value,
                   COALESCE(max_bid.id_user, NULL) AS max_bid_user_id,
                   COALESCE(max_bid.date, NULL) AS max_bid_date,
                   COALESCE(bidder.name, '') AS max_bid_user_name,
                   COALESCE(bidder.surname, '') AS max_bid_user_surname
            FROM user_favorite_auctions
            INNER JOIN auction ON user_favorite_auctions.id_auction = auction.id
            INNER JOIN auction_statuses ON auction.id_status = auction_statuses.id
            INNER JOIN auction_categories ON auction.id_category = auction_categories.id
            INNER JOIN auction_durations ON auction.id_duration = auction_durations.id
            INNER JOIN user AS owner ON auction.id_owner = owner.id
            LEFT JOIN (
                SELECT 
                    ab1.id_auction, 
                    ab1.value AS max_bid_value,
                    ab1.id_user, 
                    ab1.date
                FROM 
                    auction_bid ab1
                INNER JOIN (
                    SELECT 
                        id_auction, 
                        MAX(value) AS max_value
                    FROM 
                        auction_bid
                    GROUP BY 
                        id_auction
                ) ab2 ON ab1.id_auction = ab2.id_auction AND ab1.value = ab2.max_value
            ) AS max_bid ON auction.id = max_bid.id_auction
            LEFT JOIN user AS bidder ON max_bid.id_user = bidder.id
            WHERE user_favorite_auctions.id_user = ?
              AND auction.id_status != 7
              AND auction.id_status != 3
            ORDER BY auction.start_time DESC
            LIMIT ? OFFSET ?;`;
        
        const params = [user_id, page_size, offset];

        connection.query(sql, params, async (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length > 0) {
                resolve({
                    results: results,
                    success: true
                });
            } else {
                resolve({
                    results: null,
                    success: false
                });
            }
        });
    });
}

function db_add_notification (id_receiver, notification_id_type, self, content) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO notifications (id_receiver, notification_id_type, timestamp, content, self) 
                     VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)`;
        
        const params = [id_receiver, notification_id_type, JSON.stringify(content || {}), self];

        connection.query(sql, params, (error, results) => {
            if (error) {
                console.log(PREFIX + 'Error on adding new notification');
                return reject(error);
            }

            resolve({
                success: true,
                notification_id: results.insertId
            });
        });
    });
}

function db_add_notification_to_favorites (auction_id, notification_id_type, self, content) {
    return new Promise((resolve, reject) => {
        const getUsersSql = `SELECT id_user FROM user_favorite_auctions WHERE id_auction = ?`;
        const getUsersParams = [auction_id];

        connection.query(getUsersSql, getUsersParams, (error, results) => {
            if (error) {
                console.log(PREFIX + 'Error on fetching favorite users');
                return reject(error);
            }

            if (results.length === 0) {
                console.log(PREFIX + 'No users have favorited this auction.');
                return resolve({
                    success: true,
                    message: 'No users to notify'
                });
            }

            const notifications = [];
            for (let i=0; i<results.length; i++) {
                const user_id = results[i].id_user;

                const addNotificationSql = `INSERT INTO notifications (id_receiver, notification_id_type, timestamp, content, self) 
                                            VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)`;
                const addNotificationParams = [user_id, notification_id_type, JSON.stringify(content || {}), self];

                notifications.push(new Promise((resolve, reject) => {
                    connection.query(addNotificationSql, addNotificationParams, (error, result) => {
                        if (error) {
                            console.log(PREFIX + 'Error on adding new notification for user', user_id);
                            return reject(error);
                        }

                        resolve({
                            success: true,
                            notification_id: result.insertId
                        });
                    });
                }));
            }

            Promise.all(notifications)
                .then(results => {
                    resolve({
                        success: true,
                        notifications: results
                    });
                })
                .catch(error => {
                    console.log(PREFIX + 'Error on adding new notification for all users');
                    reject(error);
                });
        });
    });
}

function db_get_user_notifications (user_id, page = 1, page_size = 10) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * page_size;

        const sql = `
            SELECT 
                notifications.id,
                notifications.id_receiver,
                notifications.notification_id_type,
                notifications.timestamp,
                notifications.content,
                notifications.self,
                notifications_type.name as notification_type_name
            FROM 
                notifications
            INNER JOIN 
                notifications_type ON notifications.notification_id_type = notifications_type.id
            WHERE 
                notifications.id_receiver = ?
            ORDER BY 
                notifications.timestamp DESC
            LIMIT ? OFFSET ?;`;

        const params = [user_id, page_size, offset];

        connection.query(sql, params, (err, res) => {
            if (err) {
                return reject(err);
            }

            return resolve(res);
        });
    });
}


function db_get_last_user_notification (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                notifications.id,
                notifications.id_receiver,
                notifications.notification_id_type,
                notifications.timestamp,
                notifications.content,
                notifications.self,
                notifications_type.name as notification_type_name
            FROM 
                notifications
            INNER JOIN 
                notifications_type ON notifications.notification_id_type = notifications_type.id
            WHERE 
                notifications.id_receiver = ?
            ORDER BY 
                notifications.id DESC
            LIMIT 1;`;
        
        const params = [user_id];

        connection.query(sql, params, (err, res) => {
            if (err) {
                return reject(err);
            }

            if (res.length > 0) {
                return resolve({
                    success: true,
                    notification: res[0]
                });
            }

            return resolve({
                success: false
            });
        });
    });
}

function db_user_banned_status (user_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                banned
            FROM 
                user
            WHERE 
                id = ?;`;
        
        const params = [user_id];

        connection.query(sql, params, (err, res) => {
            if (err) {
                return reject(err);
            }

            if (res.length > 0) {
                const user = res[0];
                if (user.banned) {
                    return resolve({
                        success: false
                    });
                } else {
                    return resolve({
                        success: true
                    });
                }
            } else {
                return resolve({
                    success: true
                });
            }
        });
    });
}


module.exports = {
    db_get_countries,
    db_register_new_user,
    db_update_user_profile_pic,
    db_add_auction_pic,
    db_is_user_already_registered,
    db_user_match_login,
    db_get_user_from_id,
    db_get_user_less_info_from_id,
    db_get_categories,
    db_get_durations,
    db_get_user_report_reasons,
    db_insert_new_auction,
    db_add_auction_bid,
    db_get_owner_auctions,
    get_user_posted_auctions,
    get_user_active_auctions,
    get_user_placed_bids,
    get_user_won_auctions,
    db_get_user_received_feedback,
    db_send_new_user_feedback,
    db_get_user_sent_rate,
    db_get_single_auction_with_max_bid,
    db_get_others_auctions_with_max_bid,
    db_get_owner_auctions_with_max_bid,
    db_get_auction_with_max_bid,
    db_get_auction_pics,
    db_get_user_list,
    db_get_pending_review_auctions,
    db_get_reports,
    db_update_auction,
    db_cancel_auction,
    db_ban_user,
    db_unban_user,
    db_send_user_report,
    db_get_report_from_id,
    db_update_user_general_info,
    db_update_user_password,
    db_update_expired_auctions,
    db_update_user_email,
    db_update_user_feedback,
    db_delete_report,
    db_deny_auction,
    db_allow_auction,
    db_get_is_favorite_auction,
    db_remove_favorite_auction,
    db_add_favorite_auction,
    db_get_user_favorite_auctions,
    db_add_notification, 
    db_add_notification_to_favorites,
    db_get_user_notifications,
    db_get_last_user_notification,
    db_user_banned_status
};

