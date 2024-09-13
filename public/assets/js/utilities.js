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

function add_node_after_another (node_to_insert, another_node) {
    if (another_node && another_node.parentNode) {
        const next_node = another_node.nextSibling;
        if (next_node) {
            another_node.parentNode.insertBefore(node_to_insert, next_node);
        } else {
            another_node.parentNode.appendChild(node_to_insert);
        }
    }
}

