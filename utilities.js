const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function hash_password (password) {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    return hashed_password;
}

async function compare_password (plain_password, hashed_password) {
    const is_match = await bcrypt.compare(plain_password, hashed_password);
    return is_match;
}

function parse_timestamp (timestamp) {
    const [datePart, timePart] = timestamp.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds);
}

function valid_email (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function valid_password (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,60}$/;
    return passwordRegex.test(password);
}

function simple_valid_password (password) {
    const passwordRegex = /^.{6,60}$/;
    return passwordRegex.test(password);
}

function valid_name (name) {
    const nameRegex = /^[A-Za-zÀ-ÿ]{3,}([-'][A-Za-zÀ-ÿ]{3,})*$/;
    return nameRegex.test(name);
}

function valid_surname (surname) {
    const surnameRegex = /^[A-Za-zÀ-ÿ]{3,}([-'][A-Za-zÀ-ÿ]{3,})*$/;
    return surnameRegex.test(surname);
}

function valid_biography (biography) {
    const bioRegex = /^[\s\S]{10,2000}$/;
    return bioRegex.test(biography);
}

function valid_phone (phone) {
    const phoneRegex = /^(?:\+?\d{1,3})?[-.\s]?(?:\(?\d{1,4}?\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return phoneRegex.test(phone);
}

function valid_address (address) {
    const addressRegex = /^[a-zA-Z0-9\s,.'-]{5,100}$/;
    return addressRegex.test(address);
}

function valid_auction_name (name) {
    if (name.length < 3 || name.length >= 200) {
        return false;
    }

    return true;
}

function valid_auction_description (description) {
    if (description.length < 10 || description.length >= 3000) {
        return false;
    }

    return true;
}

function valid_id (id) {
    if (id <= 0) {
        return false;
    }

    return true;
}

function valid_starting_price (price) {
    if (price <= 0 || price >= 50000) {
        return false;
    }

    return true;
}

function valid_duration (duration) {
    if (duration <= 0) {
        return false;
    }

    return true;
}

function valid_report_reason (reason) {
    const reasonRegex = /^[\s\S]{10,3000}$/;
    return reasonRegex.test(reason);
}

function valid_ban_reason (reason) {
    const reasonRegex = /^[\s\S]{10,3000}$/;
    return reasonRegex.test(reason);
}

function valid_feedback (feedback) {
    const feedbackRegex = /^[\s\S]{10,3000}$/;
    return feedbackRegex.test(feedback);
}

function valid_rating (rating_number) {
    if (Number(rating_number) >= 1 && Number(rating_number) <= 5) {
        return true;
    }
    return false;
}

function round_minutes_to_interval (timestamp, interval = 10) {
    const date = new Date(timestamp);

    const remainder = interval - (date.getMinutes() % interval);

    date.setMinutes(date.getMinutes() + remainder);
    date.setSeconds(0);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const roundedMinutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${roundedMinutes}:00`;
}

function add_time_to_timestamp (timestamp, value, unit) {
    let hours_to_add = Number(value);
    switch (Number(unit)) {
        case 1:
            break;
        case 2:
            hours_to_add *= 24;
            break;
        case 3:
            hours_to_add *= 24 * 7;
            break;
        case 4:
            hours_to_add *= 24 * 30;
            break;
        default:
            throw new Error('Invalid time unit');
    }

    const date = parse_timestamp(timestamp);

    date.setHours(date.getHours() + hours_to_add);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); //Riempie la stringa con 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function get_current_timestamp () {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function read_config_file (filename) {
    const config_path = path.join(__dirname, filename);
    const config = fs.readFileSync(config_path, 'utf-8');
    
    const config_obj = {};

    config.split(/\r?\n/).forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            config_obj[key.trim()] = value.trim();
        }
    });

    return config_obj;
}

module.exports = {
    hash_password,
    compare_password,
    parse_timestamp,
    valid_email,
    valid_password,
    simple_valid_password,
    valid_name,
    valid_surname,
    valid_biography,
    valid_phone,
    valid_address,
    valid_auction_name,
    valid_auction_description,
    valid_id,
    valid_starting_price,
    valid_duration,
    valid_report_reason,
    valid_ban_reason,
    valid_feedback,
    valid_rating,
    round_minutes_to_interval,
    add_time_to_timestamp, 
    get_current_timestamp,
    read_config_file
};
