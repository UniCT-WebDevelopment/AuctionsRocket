const socket = io();
const PREFIX = '[CLIENT] ';
const EURO_SYM = '€';

const navbar_links = document.getElementById('navbar_links');
const nav_home = document.getElementById('nav_home');
const nav_logged_account = document.getElementById('nav_logged_account');
const nav_notifications = document.getElementById('nav_notifications');
const nav_dashboard_new_auction = document.getElementById('nav_dashboard_new_auction');
const nav_dashboard_your_auctions = document.getElementById('nav_dashboard_your_auctions');
const nav_dashboard_global_auctions = document.getElementById('nav_dashboard_global_auctions');
const nav_dashboard_favorite_auctions = document.getElementById('nav_dashboard_favorite_auctions');
const nav_dashboard_users = document.getElementById('nav_dashboard_users');
const nav_dashboard_your_account = document.getElementById('nav_dashboard_your_account');
const nav_dashboard_review_auctions = document.getElementById('nav_dashboard_review_auctions');
const nav_dashboard_reports_center = document.getElementById('nav_dashboard_reports_center');
const staff_moderation = document.getElementById('staff_moderation');
const nav_btns = [nav_dashboard_new_auction, nav_dashboard_your_auctions, nav_dashboard_global_auctions, nav_dashboard_favorite_auctions, nav_dashboard_users, nav_dashboard_your_account];

const registered_users_pagination = document.getElementById('registered_users_pagination');
const notifications_list_pagination = document.getElementById('notifications_list_pagination');
const favorite_auctions_pagination = document.getElementById('favorite_auctions_pagination');
const others_auctions_pagination = document.getElementById('others_auctions_pagination');
const reports_center_pagination = document.getElementById('reports_center_pagination');
const review_auctions_pagination = document.getElementById('review_auctions_pagination');

const not_logged_page = document.getElementById('not_logged_page');
const new_notifications_counter = document.getElementById('new_notifications_counter');

const global_danger_alert_box = document.getElementById('global_danger_alert_box');
const global_danger_alert_box_msg = document.getElementById('global_danger_alert_box_msg');
const global_success_alert_box = document.getElementById('global_success_alert_box');
const global_success_alert_box_msg = document.getElementById('global_success_alert_box_msg');
const live_toast = document.getElementById('live_toast');
const live_toast_msg = document.getElementById('live_toast_msg');
const toast_bootstrap = bootstrap.Toast.getOrCreateInstance(live_toast);

const btn_show_register_form = document.getElementById('btn_show_register_form');
const btn_show_login_form = document.getElementById('btn_show_login_form');

const register_form = document.getElementById('register_form');
const register_alert_box = document.getElementById('register_alert_box');
const register_alert_box_msg = document.getElementById('register_alert_box_msg');
const register_name_input = document.getElementById('register_name_input');
const register_surname_input = document.getElementById('register_surname_input');
const register_email_input = document.getElementById('register_email_input');
const register_password_input = document.getElementById('register_password_input');
const register_password_repeat_input = document.getElementById('register_password_repeat_input');
const register_phone_input = document.getElementById('register_phone_input');
const register_biography_input = document.getElementById('register_biography_input');
const register_shipping_address_input = document.getElementById('register_shipping_address_input');
const register_country_input = document.getElementById('register_country_input');
const register_image_file = document.getElementById('register_image_file');
const btn_send_register = document.getElementById('btn_send_register');
const register_loading_btn_span = document.getElementById('register_loading_btn_span');

const login_form = document.getElementById('login_form');
const login_alert_box = document.getElementById('login_alert_box');
const login_alert_box_msg = document.getElementById('login_alert_box_msg');
const login_email_input = document.getElementById('login_email_input');
const login_password_input = document.getElementById('login_password_input');
const btn_send_login = document.getElementById('btn_send_login');
const login_loading_btn_span = document.getElementById('login_loading_btn_span');

const dashboard_content = document.getElementById('dashboard_content');

const new_auction_name_input = document.getElementById('new_auction_name_input');
const new_auction_category_select = document.getElementById('new_auction_category_select');
const new_auction_description_input = document.getElementById('new_auction_description_input');
const new_auction_starting_price_input = document.getElementById('new_auction_starting_price_input');
const new_auction_duration_input = document.getElementById('new_auction_duration_input');
const new_auction_time_select = document.getElementById('new_auction_time_select');
const new_auction_img_1_input = document.getElementById('new_auction_img_1_input');
const new_auction_img_2_input = document.getElementById('new_auction_img_2_input');
const new_auction_img_3_input = document.getElementById('new_auction_img_3_input');
const new_auction_img_1 = document.getElementById('new_auction_img_1');
const new_auction_img_2 = document.getElementById('new_auction_img_2');
const new_auction_img_3 = document.getElementById('new_auction_img_3');
const btn_send_new_auction = document.getElementById('btn_send_new_auction'); 
const loading_add_auction_btn_span = document.getElementById('loading_add_auction_btn_span');

const your_auctions = document.getElementById('your_auctions');

const edit_panel_alert_box = document.getElementById('edit_panel_alert_box');
const edit_panel_alert_box_msg = document.getElementById('edit_panel_alert_box_msg');
const edit_auction_panel = document.getElementById('edit_auction_panel');
const edit_auction_name_input = document.getElementById('edit_auction_name_input');
const edit_auction_category_select = document.getElementById('edit_auction_category_select');
const edit_auction_description_input = document.getElementById('edit_auction_description_input');
const edit_auction_img_1_input = document.getElementById('edit_auction_img_1_input');
const edit_auction_img_2_input = document.getElementById('edit_auction_img_2_input');
const edit_auction_img_3_input = document.getElementById('edit_auction_img_3_input');
const edit_auction_img_1 = document.getElementById('edit_auction_img_1');
const edit_auction_img_2 = document.getElementById('edit_auction_img_2');
const edit_auction_img_3 = document.getElementById('edit_auction_img_3');
const btn_send_edit_auction = document.getElementById('btn_send_edit_auction');
const loading_edit_auction_btn_span = document.getElementById('loading_edit_auction_btn_span');
const btn_close_edit_auction_panel = document.getElementById('btn_close_edit_auction_panel');

const confirm_panel = document.getElementById('confirm_panel');
const confirm_panel_msg = document.getElementById('confirm_panel_msg');
const btn_close_confirm_panel = document.getElementById('btn_close_confirm_panel');
const btn_confirm_yes = document.getElementById('btn_confirm_yes');
const btn_confirm_no = document.getElementById('btn_confirm_no');

const others_auctions = document.getElementById('others_auctions');
const others_auctions_compact = document.getElementById('others_auctions_compact');
const search_global_auction_input = document.getElementById('search_global_auction_input');
const search_category_select = document.getElementById('search_category_select');
const btn_search_global_auction = document.getElementById('btn_search_global_auction');
const page_single_auction = document.getElementById('page_single_auction');
const preview_auction = document.getElementById('preview_auction');
const review_auctions = document.getElementById('review_auctions');

const user_profile_panel = document.getElementById('user_profile_panel');
const btn_close_user_profile_panel = document.getElementById('btn_close_user_profile_panel');
const user_panel_posted_auctions = document.getElementById('user_panel_posted_auctions');
const user_panel_active_auctions = document.getElementById('user_panel_active_auctions');
const user_panel_won_auctions = document.getElementById('user_panel_won_auctions');
const user_panel_placed_bids = document.getElementById('user_panel_placed_bids');

const user_rate_form = document.getElementById('user_rate_form');
const user_feedback_star_output = document.getElementById('user_feedback_star_output');
const user_rate_feedback_input = document.getElementById('user_rate_feedback_input');
const btn_send_feedback = document.getElementById('btn_send_feedback');
const btn_update_feedback = document.getElementById('btn_update_feedback');
const stars = document.getElementsByClassName("star");

const user_report_form = document.getElementById('user_report_form');
const report_reason_select = document.getElementById('report_reason_select');
const report_reason_container = document.getElementById('report_reason_container');
const report_reason_input = document.getElementById('report_reason_input');
const btn_send_report = document.getElementById('btn_send_report');

const user_ban_unban_form = document.getElementById('user_ban_unban_form');
const ban_reason_input = document.getElementById('ban_reason_input');
const ban_form = document.getElementById('ban_form');
const btn_ban_user = document.getElementById('btn_ban_user');
const btn_unban_user = document.getElementById('btn_unban_user');

const page_new_auctions = document.getElementById('page_new_auction');
const page_your_auctions = document.getElementById('page_your_auctions');
const page_global_auctions = document.getElementById('page_global_auctions');
const page_favorite_auctions = document.getElementById('page_favorite_auctions');
const page_notifications = document.getElementById('page_notifications');
const page_edit_account = document.getElementById('page_edit_account');
const page_review_auctions = document.getElementById('page_review_auctions');
const page_registered_users = document.getElementById('page_registered_users');
const page_reports_center = document.getElementById('page_reports_center');
const pages = [page_new_auctions, page_your_auctions, page_global_auctions, page_edit_account, page_review_auctions, page_registered_users, page_reports_center, page_single_auction, page_favorite_auctions, page_notifications];

const edit_account_name_input = document.getElementById('edit_account_name_input');
const edit_account_surname_input = document.getElementById('edit_account_surname_input');
const edit_account_phone_input = document.getElementById('edit_account_phone_input');
const edit_account_biography_input = document.getElementById('edit_account_biography_input');
const edit_account_country_input = document.getElementById('edit_account_country_input');
const edit_account_address_input = document.getElementById('edit_account_address_input');
const btn_send_update_infos = document.getElementById('btn_send_update_infos');
const edit_account_email_input = document.getElementById('edit_account_email_input');
const btn_send_update_email = document.getElementById('btn_send_update_email');
const edit_account_actual_password_input = document.getElementById('edit_account_actual_password_input');
const edit_account_new_password_input = document.getElementById('edit_account_new_password_input');
const edit_account_repeat_password_input = document.getElementById('edit_account_repeat_password_input');
const btn_send_update_password = document.getElementById('btn_send_update_password');
const edit_account_image_file = document.getElementById('edit_account_image_file');
const btn_log_out = document.getElementById('btn_log_out');

const reports_center = document.getElementById('reports_center');

const registered_users = document.getElementById('registered_users');
const btn_search_user = document.getElementById('btn_search_user');
const search_user_input = document.getElementById('search_user_input');

const chat_container = document.getElementById('chat_container');
const chat_name = document.getElementById('chat_name');
const chat_close_btn = document.getElementById('chat_close_btn');
const chat_content_messages = document.getElementById('chat_content_messages');
const send_message_input = document.getElementById('send_message_input');
const send_message_btn = document.getElementById('send_message_btn');

const favorite_auctions = document.getElementById('favorite_auctions');
const notifications_list = document.getElementById('notifications_list');

let last_notification = 'first';
let notifications_checker_interval;

btn_log_out.addEventListener('click', () => {
    send_log_out();
});

user_rate_form.querySelector('[feed_star_1]').addEventListener('click', () => {
    update_rating(1);
});

user_rate_form.querySelector('[feed_star_2]').addEventListener('click', () => {
    update_rating(2);
});

user_rate_form.querySelector('[feed_star_3]').addEventListener('click', () => {
    update_rating(3);
});

user_rate_form.querySelector('[feed_star_4]').addEventListener('click', () => {
    update_rating(4);
});

user_rate_form.querySelector('[feed_star_5]').addEventListener('click', () => {
    update_rating(5);
});

chat_close_btn.addEventListener('click', () => {
    leave_current_auction_room();
    hide_element(chat_container);
});

nav_dashboard_new_auction.addEventListener('click', () => {
    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(nav_dashboard_new_auction);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_new_auctions);
});

nav_dashboard_your_auctions.addEventListener('click', () => {
    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(nav_dashboard_your_auctions);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_your_auctions);
    get_owner_auctions();
    create_pagination_node(2, your_auctions_pagination, (page) => get_owner_auctions(page));
});

nav_home.addEventListener('click', () => {
    load_main_page();
});

nav_dashboard_global_auctions.addEventListener('click', () => {
    load_main_page();
});

btn_search_global_auction.addEventListener('click', () => {
    const filter = search_global_auction_input.value.trim();
    const category_id = search_category_select.value; 
    get_others_auctions(filter, category_id);
    create_pagination_node(2, others_auctions_pagination, (page) => get_others_auctions(filter, category_id, page));
});

nav_dashboard_favorite_auctions.addEventListener('click', () => {
    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(nav_dashboard_favorite_auctions);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_favorite_auctions);
    load_user_favorites();
    create_pagination_node(2, favorite_auctions_pagination, (page) => load_user_favorites(page));
});

nav_notifications.addEventListener('click', () => {
    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(null);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_notifications);
    hide_element(new_notifications_counter);
    load_user_notifications();
    create_pagination_node(2, notifications_list_pagination, (page) => load_user_notifications(page));
});

nav_dashboard_users.addEventListener('click', () => {
    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(nav_dashboard_users);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_registered_users);
    search_user_input.value = '';
    load_users_list('', registered_users);

    create_pagination_node(2, registered_users_pagination, (page) => load_users_list('', registered_users, page));
});

btn_search_user.addEventListener('click', () => {
    load_users_list(search_user_input.value, registered_users);
    create_pagination_node(2, registered_users_pagination, (page) => load_users_list(search_user_input.value, registered_users, page));
});

nav_dashboard_your_account.addEventListener('click', () => {
    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(nav_dashboard_your_account);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_edit_account);
    load_user_account();
});

nav_dashboard_review_auctions.addEventListener('click', () => {
    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(null);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_review_auctions);
    load_pending_review_auctions();
    create_pagination_node(2, review_auctions_pagination, (page) => load_pending_review_auctions(page));
});

nav_dashboard_reports_center.addEventListener('click', () => {
    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(null);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_reports_center);
    load_reports_list(reports_center);
    create_pagination_node(2, reports_center_pagination, (page) => load_reports_list(reports_center, page));
});

nav_logged_account.addEventListener('click', () => {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    open_panel(user_profile_panel);
    prepare_user_profile_panel(current_user.id);
});

report_reason_select.addEventListener('change', function() {
    if (Number(report_reason_select.value) == -2) {
        show_element(report_reason_container);
    } else hide_element(report_reason_container);
});

btn_close_edit_auction_panel.addEventListener('click', () => {
    close_panel(edit_auction_panel);
});

btn_close_confirm_panel.addEventListener('click', () => {
    close_panel(confirm_panel);
});

btn_confirm_no.addEventListener('click', () => {
    close_panel(confirm_panel);
});

btn_close_user_profile_panel.addEventListener('click', () => {
    close_panel(user_profile_panel);
});

btn_show_register_form.addEventListener('click', () => {
    get_countries(register_country_input);
    hide_element(login_form)
    show_element(register_form);

    register_form.scrollIntoView();
});

btn_send_update_infos.addEventListener('click', () => {
    const name = edit_account_name_input.value.trim();
    const surname = edit_account_surname_input.value.trim();
    const phone = edit_account_phone_input.value.trim();
    const biography = edit_account_biography_input.value.trim();
    const id_country = edit_account_country_input.value;
    const address = edit_account_address_input.value.trim();

    if (!valid_name(name)) {
        show_live_toast('Invalid name');
        return;
    }

    if (!valid_surname(surname)) {
        show_live_toast('Invalid surname');
        return;
    }

    if (!valid_phone(phone)) {
        show_live_toast('Invalid phone number');
        return;
    }

    if (!valid_biography(biography)) {
        show_live_toast('Invalid biography');
        return;
    }

    if (!valid_id(id_country)) {
        show_live_toast('Invalid country');
        return;
    }

    if (!valid_address(address)) {
        show_live_toast('Invalid address');
        return;
    }

    const user_edits = {name:name, surname:surname, phone:phone, biography:biography, id_country:id_country, address:address};
    send_user_update_general_info(user_edits);
});

btn_send_update_email.addEventListener('click', () => {
    const email = edit_account_email_input.value.trim();

    if (!valid_email(email)) {
        show_live_toast('Invalid email');
        return;
    }

    send_user_update_email(email);
});

btn_send_update_password.addEventListener('click', () => {
    const old_password = edit_account_actual_password_input.value;
    const new_password = edit_account_new_password_input.value;
    const repeat_new_password = edit_account_repeat_password_input.value;

    if (!simple_valid_password(old_password)) {
        show_live_toast('Invalid old password syntax');
        return;
    }

    if (!simple_valid_password(new_password)) {
        show_live_toast('Invalid new password syntax');
        return;
    }

    if (new_password != repeat_new_password) {
        show_live_toast('Invalid new repeated password');
        return;
    }

    send_user_update_password(old_password, new_password);
});

btn_show_login_form.addEventListener('click', () => {
    hide_element(register_form);
    show_element(login_form);

    login_form.scrollIntoView();
});

btn_send_register.addEventListener('click', () => {
    const name = register_name_input.value.trim();
    const surname = register_surname_input.value.trim();
    const email = register_email_input.value.trim();
    const phone = register_phone_input.value.trim();
    const biography = register_biography_input.value.trim();
    const id_country = register_country_input.value;
    const address = register_shipping_address_input.value.trim();
    const password = register_password_input.value;
    const repeat_password = register_password_repeat_input.value;

    if (!valid_name(name)) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid name');
        return;
    }

    if (!valid_surname(surname)) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid surname');
        return;
    }

    if (!valid_email(email)) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid email');
        return;
    }

    if (!valid_phone(phone)) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid phone number');
        return;
    }

    if (!valid_biography(biography)) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid biography');
        return;
    }

    if (!valid_address(address)) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid address');
        return;
    }

    if (register_image_file.files.length === 0) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid profile image');
        return;
    }

    if (!simple_valid_password(password)) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Invalid password');
        return;
    }

    if (repeat_password != password) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, 'Repeated password is not equal!');
        return;
    }

    const user_data = {name:name, surname:surname, email:email, phone:phone, biography:biography, id_country: id_country, address:address, password:password};
    start_loading(register_loading_btn_span, btn_send_register);
    send_register_request(user_data);
});

btn_send_login.addEventListener('click', () => {

    const email = login_email_input.value.trim();
    const password = login_password_input.value;

    if (!valid_email(email)) {
        show_element(login_alert_box);
        set_element_value(login_alert_box_msg, 'Invalid email')
        return;
    }

    if (!simple_valid_password(password)) {
        show_element(login_alert_box);
        set_element_value(login_alert_box_msg, 'Invalid password')
        return;
    }

    start_loading(login_loading_btn_span, btn_send_login);
    send_login_request(email, password);
});

btn_send_new_auction.addEventListener("click", () => {
    const name = new_auction_name_input.value.trim();
    const category_id = new_auction_category_select.value;
    const description = new_auction_description_input.value.trim();
    const starting_price = new_auction_starting_price_input.value;
    const duration = new_auction_duration_input.value;
    const time_id = new_auction_time_select.value;

    if (!valid_auction_name(name)) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction name')
        return;
    }

    if (!valid_id(category_id)) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction category')
        return;
    }

    if (!valid_auction_description(description)) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction description')
        return;
    }

    if (!valid_starting_price(starting_price)) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction starting price')
        return;
    }

    if (!valid_duration(duration)) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction duration value')
        return;
    }

    if (!valid_id(time_id)) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction duration time')
        return;
    }

    if (new_auction_img_1_input.files.length === 0) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction image 1')
        return;
    }

    if (new_auction_img_2_input.files.length === 0) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction image 2')
        return;
    }

    if (new_auction_img_3_input.files.length === 0) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, 'Invalid auction image 3')
        return;
    }

    hide_element(global_danger_alert_box);

    start_loading(loading_add_auction_btn_span, btn_send_new_auction);
    const auction = {name:name, category_id:category_id, description:description, starting_price:starting_price, duration:duration, time_id:time_id};
    send_new_auction(auction);
});

function select_nav_btns (element) {
    for (btn of nav_btns) {
        btn.className = 'nav-link active text-light';
    }

    if (element) {
        element.className = 'nav-link active text-light selected';
    }
}

let rating;
function update_rating (n) {
    remove_feed_class();
    for (let i=0; i<n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    user_feedback_star_output.innerText = n + "/5";
    rating = n;
}
 
function remove_feed_class () {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}

async function send_login_request (email, password) {
    try {
        console.log(PREFIX + 'Login request sent to server');
        hide_element(login_alert_box);

        const response = await axios.post('/api/login', {
            email: email,
            password: password
        });

        if (!response.data.success) {
            show_element(login_alert_box);
            set_element_value(login_alert_box_msg, response.data.message);
            stop_loading(login_loading_btn_span, btn_send_login);
            return;
        }
        console.log(response.data.id);
        await get_user_from_id();

        stop_loading(login_loading_btn_span, btn_send_login);
        initialize_dashboard();
    } catch (error) {
        show_element(login_alert_box);
        set_element_value(login_alert_box_msg, error.response.data.message);
        stop_loading(login_loading_btn_span, btn_send_login);
        console.log(error.response.data.message);
    }
}

async function send_register_request (user_data) {
    try {
        console.log(PREFIX + 'Register request sent to server');
        hide_element(register_alert_box);

        const response = await axios.post('/api/register', {
            user_data: user_data
        });

        if (!response.data.success) {
            show_element(register_alert_box);
            set_element_value(register_alert_box_msg, response.data.message);
            stop_loading(register_loading_btn_span, btn_send_register);
            return;
        }
        const user_id = response.data.insertId;
        console.log(user_id);
        await compress_user_image_and_upload(register_image_file, user_id);

        show_element(global_success_alert_box);
        set_element_value(global_success_alert_box_msg, 'You have been registered. Welcome to AuctionRocket! Please, login')

        hide_element(register_form);
        show_element(login_form);
    } catch (error) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, error.response.data.message);
        stop_loading(register_loading_btn_span, btn_send_register);
        console.log(error.response.data.message);
    }
}

let current_user;
get_user_id_from_session();

async function get_user_id_from_session () {
    try {
        console.log(PREFIX + 'Get user id from session request sent to server');
        hide_element(register_alert_box);

        const response = await axios.get('/api/user_id_from_session', {
            params: {

            }
        });

        //console.log(response.data);
        if (!response.data.success) {
            return;
        }

        await get_user_from_id();
        initialize_dashboard();
        show_live_toast("Session resumed");
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function verify_user_session () {
    try {
        console.log(PREFIX + 'Verify user session request sent to server');
        hide_element(register_alert_box);

        const response = await axios.get('/api/user_id_from_session', {
            params: {
                current_id: current_user.id
            }
        });
        
        //console.log(response.data);
        if (!response.data.success) {
            reload_page();
            show_live_toast("Session expired");
            clearInterval(notifications_checker_interval);
            return false;
        }

        return true;
    } catch (error) {
        console.log(error.response.data.message);
        reload_page();
        show_live_toast("Session expired");
        clearInterval(notifications_checker_interval);
        return false;
    }
}

async function send_log_out () {
    try {
        console.log(PREFIX + 'Send log out request to server');

        const response = await axios.get('/api/logout', {
            params: {

            }
        });
        
        //console.log(response.data);
        if (!response.data.success) {
            show_live_toast("Log out error");
            return false;
        }

        reload_page();
    } catch (error) {
        console.log(error.response.data.message);
        return false;
    }
}

async function get_user_from_id () {
    try {
        console.log(PREFIX + 'Get user info request sent to server');
        hide_element(register_alert_box);

        const response = await axios.post('/api/user_info', {

        });

        if (!response.data.success) {
            show_element(register_alert_box);
            set_element_value(register_alert_box_msg, response.data.message);
            stop_loading(login_loading_btn_span, btn_send_login);
            return;
        }

        current_user = response.data.user;
        stop_loading(login_loading_btn_span, btn_send_login);
    } catch (error) {
        show_element(register_alert_box);
        set_element_value(register_alert_box_msg, error.response.data.message);
        stop_loading(login_loading_btn_span, btn_send_login);
        console.log(error.response.data.message);
    }
}

async function load_user_account () {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        console.log(PREFIX + 'Get user account request sent to server');

        const response = await axios.post('/api/user_info', {

        });

        if (!response.data.success) {
            return;
        }

        //console.log(JSON.stringify(response.data.user));
        load_user_account_info(response.data.user);

    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function send_new_auction (auction) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        console.log(PREFIX + 'New auction request sent to server');
        hide_element(global_danger_alert_box);

        const response = await axios.post('/api/new_auction', {
            auction: auction
        });

        console.log(JSON.stringify(response.data));

        if (!response.data.success) {
            show_element(global_danger_alert_box);
            set_element_value(global_danger_alert_box_msg, response.data.message);
            stop_loading(loading_add_auction_btn_span, btn_send_new_auction);
            return;
        }
        
        const auction_id = response.data.auction_id;
        console.log(auction_id);
        await compress_auction_image_and_upload (new_auction_img_1_input, auction_id, 1);
        await compress_auction_image_and_upload (new_auction_img_2_input, auction_id, 2);
        await compress_auction_image_and_upload (new_auction_img_3_input, auction_id, 3);
        clear_new_auction_form();
        show_live_toast("New auction added!");
        //get_owner_auctions();
    } catch (error) {
        show_element(global_danger_alert_box);
        set_element_value(global_danger_alert_box_msg, JSON.stringify(error));
        stop_loading(loading_add_auction_btn_span, btn_send_new_auction);
        console.log(JSON.stringify(error));
    }
}

function show_element (element) {
    element.removeAttribute('hidden');
}

function hide_element (element) {
    element.setAttribute('hidden', 'true');
}

function get_countries (element) {
    fetch('/api/countries')
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            element.innerHTML = '';
            add_select_element(element, {id:-1, name:'Select country'});
            for (country of data) {
                add_select_element(element, country)
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function get_categories (element_select) {
    fetch('/api/auction_categories')
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            element_select.innerHTML = '';
            add_select_element(element_select, {id:-1, name:'Select category'});
            for (category of data) {
                add_select_element(element_select, category);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function get_durations (element_select) {
    fetch('/api/auction_durations')
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            element_select.innerHTML = '';
            add_select_element(element_select, {id:-1, name:'Select duration'});
            for (duration of data) {
                add_select_element(element_select, duration);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function get_user_report_reasons (element_select) {
    try {
        const response = await axios.get('/api/get_user_report_reasons', {
            params: {

            }
        });
        const data = response.data;
        //console.log(data);

        element_select.innerHTML = '';
        add_select_element(element_select, {id:-1, name:'Select reason'});
        for (const reason of data) {
            add_select_element(element_select, reason);
        }
        add_select_element(element_select, {id:-2, name:'Other...'});
    } catch (error) {
        console.error('Error:', error);
    }
}

function add_select_element (input_select, node_info) {
    const option_node = document.createElement('option');
    option_node.value = node_info.id;
    option_node.innerHTML = node_info.name;
    input_select.appendChild(option_node);
}

async function compress_user_image_and_upload (image_file, user_id) {
    const file = image_file.files[0];

    if (file) {
        new Compressor(file, {
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            success(result) {
                upload_user_image(result, user_id);
            },
            error(err) {
                stop_register_loading(register_loading_btn_span, btn_send_register);
                console.error('Compression error:', err);
            }
        });
    }
    else {
        stop_register_loading(register_loading_btn_span, btn_send_register);
    }
}

async function compress_auction_image_and_upload (image_file, auction_id, image_number) {
    const file = image_file.files[0];

    if (file) {
        new Compressor(file, {
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            success(result) {
                upload_auction_image(result, auction_id, image_number);
            },
            error(err) {
                stop_loading(loading_add_auction_btn_span, btn_send_new_auction);
                console.error('Compression error:', err);
            }
        });
    }
    else {
        stop_loading(loading_add_auction_btn_span, btn_send_new_auction);
    }
}

async function compress_new_auction_image_and_upload (image_file, auction_id, image_number) {
    const file = image_file.files[0];

    if (file) {
        new Compressor(file, {
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            success(result) {
                upload_edited_auction_image(result, auction_id, image_number);
            },
            error(err) {
                console.error('Compression error:', err);
            }
        });
    }
    else {
        //stop_loading(loading_add_auction_btn_span, btn_send_new_auction);
    }
}

async function upload_user_image (file, user_id) {
    const formData = new FormData();
    formData.append('userId', user_id);
    formData.append('image', file);

    try {
        const response = await fetch('/api/upload/user_image', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Image upload success');
        } else {
            console.error('Image upload failed:', response.statusText);
        }
        stop_loading(register_loading_btn_span, btn_send_register);
    } catch (error) {
        console.error('Error:', error);
        stop_loading(register_loading_btn_span, btn_send_register);
    }
}

async function upload_auction_image (file, auction_id, image_number) {
    const formData = new FormData();
    formData.append('auctionId', auction_id);
    formData.append('image_number', image_number);
    formData.append('image', file);

    try {
        const response = await fetch('/api/upload/auction_image', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            //console.log('Upload success:', result);
        } else {
            console.error('Upload failed:', response.statusText);
        }
        stop_loading(loading_add_auction_btn_span, btn_send_new_auction);
    } catch (error) {
        console.error('Error:', error);
        stop_loading(loading_add_auction_btn_span, btn_send_new_auction);
    }
}

async function upload_edited_auction_image (file, auction_id, image_number) {
    const formData = new FormData();
    formData.append('auctionId', auction_id);
    formData.append('image_number', image_number);
    formData.append('image', file);

    try {
        const response = await fetch('/api/upload/edit_auction_image', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            //console.log('Upload success:', result);
        } else {
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function get_owner_auctions (page = 1) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_owner_auctions', {
            params: {
                page: page
            }
        });
        const data = response.data.auction;
        //console.log(data);

        your_auctions.innerHTML = '';
        if (data.length >= 1) {
            for (const auction of data) {
                const pics_number = await get_auction_pics(auction.id);
                add_your_auction(your_auctions, auction, pics_number);
            }
        } else {
            your_auctions.innerHTML = 'No result found';
        }

        return data.length;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function get_others_auctions (filter, category_id, page = 1) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_others_auctions', {
            params: {
                filter: filter,
                category_id: category_id,
                page: page
            }
        });
        const data = response.data.auction;
        //console.log(JSON.stringify(data));

        others_auctions.innerHTML = '';
        others_auctions_compact.innerHTML = '';
        if (data.length >= 1) {
            for (const auction of data) {
                const pics_number = await get_auction_pics(auction.id);
                add_others_auction(others_auctions, auction, pics_number);
                others_auctions_compact.appendChild(get_preview_auction_row_node(auction));
            }
        } else {
            others_auctions.innerHTML = 'No result found';
            others_auctions_compact.innerHTML = 'No result found';
        }

        return data.length;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_user_favorites (page = 1) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_user_favorites_auctions', {
            params: {
                page: page
            }
        });
        const data = response.data.auction.results;
        //console.log(data);

        favorite_auctions.innerHTML = '';
        if (data && data.length >= 1) {
            for (const auction of data) {
                favorite_auctions.appendChild(get_preview_auction_row_node(auction));
            }
        } else {
            favorite_auctions.innerHTML = 'No result found';
        }

        return data.length;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_user_notifications (page = 1) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_user_notifications', {
            params: {
                page: page
            }
        });
        const data = response.data.notifications;
        //console.log(data);

        notifications_list.innerHTML = '';
        if (data && data.length >= 1) {
            for (const notification of data) {
                notifications_list.appendChild(get_notification_row_node(notification));
            }
        } else {
            notifications_list.innerHTML = 'No result found';
        }

        return data.length;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_favourite_btn (auction_id, element) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/is_favourite_auction', {
            params: {
                auction_id: auction_id
            }
        });
        const data = response.data;
        //console.log(data);

        if (!data.success) {
            show_element(element.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_no]`));
            hide_element(element.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_yes]`));
            return;
        }

        show_element(element.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_yes]`));
        hide_element(element.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_no]`));
    } catch (error) {
        console.error('Error:', error);
    }
}

async function add_auction_to_favorite (auction_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/add_auction_to_favorite', {
            params: {
                auction_id: auction_id
            }
        });
        const data = response.data;
        //console.log(data);

        if (!data.success) {
            //show_live_toast('Error adding auction to favorites');
            return;
        }

        show_element(preview_auction.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_yes]`));
        hide_element(preview_auction.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_no]`));
        //show_live_toast('Auction added to favorites');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function remove_auction_form_favorite (auction_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/remove_auction_to_favorite', {
            params: {
                auction_id: auction_id
            }
        });
        const data = response.data;
        //console.log(data);

        if (!data.success) {
            show_live_toast('Error removing auction from favorites');
            return;
        }

        hide_element(preview_auction.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_yes]`));
        show_element(preview_auction.querySelector(`div[auction_id="${auction_id}"] button[btn_favorites_no]`));
        show_live_toast('Auction removed from favorites');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function get_single_auction (auction_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_single_auction', {
            params: {
                auction_id: auction_id
            }
        });
        const data = response.data.auction;
        //console.log(data);

        preview_auction.innerHTML = '';
        add_others_auction(preview_auction, data, 3);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_pending_review_auctions (page = 1) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    try {
        const response = await axios.get('/api/get_pending_review_auctions', {
            params: {
                permission_level: current_user.permission_level,
                page: page
            }
        });
        const data = response.data.auction.auctions;
        //console.log(response.data);

        review_auctions.innerHTML = '';
        if (data.length >= 1) {
            for (const auction of data) {
                add_pending_review_auction(review_auctions, auction);
            }
        } else {
            review_auctions.innerHTML = 'No result found';
        }

        return data.length;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function get_auction_pics (auction_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_auction_pics', {
            params: {
                auction_id: auction_id
            }
        });

        //console.log(JSON.stringify(response.data));
        const auction_pics = response.data.auction_pics[0].num_pics;
        //console.log(auction_pics);
        return auction_pics;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

function load_main_page () {
    hide_element(global_danger_alert_box);
    hide_element(global_success_alert_box);
    select_nav_btns(nav_dashboard_global_auctions);
    for (page of pages) {
        hide_element(page);
    }
    show_element(page_global_auctions);
    get_others_auctions();
    create_pagination_node(2, others_auctions_pagination, (page) => get_others_auctions(null, null, page));
}

function initialize_dashboard () {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    hide_element(not_logged_page);
    hide_element(login_form);
    hide_element(global_success_alert_box);
    hide_element(btn_show_register_form);
    hide_element(btn_show_login_form);
    update_navbar_logged_user(nav_logged_account);
    show_element(nav_logged_account);
    show_element(nav_notifications);
    show_element(navbar_links);
    show_element(dashboard_content);

    load_main_page();

    get_countries(edit_account_country_input);
    get_categories(search_category_select);
    get_categories(new_auction_category_select);
    get_durations(new_auction_time_select);
    get_categories(edit_auction_category_select);
    get_user_report_reasons(report_reason_select);

    if (Number(current_user.permission_level) > 0) {
        show_element(staff_moderation);
    }
    notifications_checker_interval = setInterval(get_last_notification, (60 * 1000));
}

function update_navbar_logged_user (element) {
    element.querySelector('img[logged_img]').src = `../uploads/users/${current_user.id}/profile_pic/profile_pic.jpeg`;
    element.querySelector('span[logged_name_surname]').innerHTML = `Hi ${current_user.name} ${current_user.surname}`;
}

async function send_edit_auction (auction_edits) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!auction_edits.auction_owner_id) {
        console.log(PREFIX + "Action forbidden without a logged user");
        return;
    }

    if (current_user.id != auction_edits.auction_owner_id) {
        console.log(PREFIX + "You are not the owner of this auction!");
        return;
    }

    if (Number(auction_edits.auction_status_id) != 7 && Number(auction_edits.auction_status_id) != 1) {
        console.log(PREFIX + "Invalid auction status for this edits!");
        return;
    }

    try {
        const response = await axios.put('/api/update_auction', {
            auction_edits: auction_edits
        });

        if (!response.data.success) {
            show_live_toast('Error on updating auction informations');
            return;
        } 

        show_live_toast('Auction updated correctly');
        update_your_auction_row(auction_edits);
        close_panel(edit_auction_panel);
    } catch (error) {
        console.error('Error:', error);
        show_live_toast('Error on auction update');
    }
}

async function send_cancel_auction (auction) {
    //console.log(JSON.stringify(auction));
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!auction.id_owner) {
        console.log(PREFIX + "Action forbidden without a logged user");
        return;
    }

    if (current_user.id != auction.id_owner) {
        console.log(PREFIX + "You are not the owner of this auction!");
        return;
    }

    if (Number(auction.id_status) != 7 && Number(auction.id_status) != 1) {
        console.log(PREFIX + "Invalid auction status for this edits!");
        return;
    }

    try {
        const response = await axios.put('/api/cancel_auction', {
            auction: auction
        });

        if (!response.data.success) {
            show_live_toast('Error in auction cancellation');
            return;
        } 

        show_live_toast('Auction cancelled correctly');
        //update_your_auction_status_row(auction_edits);
        close_panel(confirm_panel);
        get_owner_auctions();
        create_pagination_node(2, your_auctions_pagination, (page) => get_owner_auctions(page));
    } catch (error) {
        console.error('Error:', error);
        show_live_toast('Error in auction cancellation');
    }
}

async function send_deny_auction (auction) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        console.log(PREFIX + 'Permission denied');
    }

    try {
        const response = await axios.put('/api/deny_auction', {
            auction: auction
        });

        if (!response.data.success) {
            show_live_toast('Error in auction deny');
            return;
        } 

        show_live_toast('Auction denied correctly');
        review_auctions.querySelector(`div.card[auction_id="${auction.id}"]`).remove();
        close_panel(confirm_panel);
    } catch (error) {
        console.error('Error:', error);
        show_live_toast('Error in auction deny');
    }
}

async function send_allow_auction (auction) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        console.log(PREFIX + 'Permission denied');
    }

    try {
        const response = await axios.put('/api/allow_auction', {
            auction: auction
        });

        if (!response.data.success) {
            show_live_toast('Error in auction allow');
            return;
        } 

        show_live_toast('Auction allowed correctly');
        review_auctions.querySelector(`div.card[auction_id="${auction.id}"]`).remove();
        close_panel(confirm_panel);
    } catch (error) {
        console.error('Error:', error);
        show_live_toast('Error in auction allow');
    }
}

function preview_image (input, img_element) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img_element.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

async function send_auction_bid (auction, new_bid) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (current_user.id == auction.id_owner) {
        console.log(PREFIX + "You can't bid on your auction!");
        return;
    }

    if (Number(auction.id_status) != 1) {
        console.log(PREFIX + "Invalid auction status for bid!");
        return;
    }

    try {
        const response = await axios.put('/api/auction_bid', {
            owner: {name:current_user.name, surname:current_user.surname},
            auction: auction,
            new_bid: new_bid
        });

        if (!response.data.success) {
            show_live_toast('Error on bid in this auction');
            return;
        } 

        add_auction_to_favorite(auction.id);
        show_live_toast('Bid placed correctly on this auction');
        close_panel(confirm_panel);
    } catch (error) {
        console.error('Error:', error);
        show_live_toast('Error on auction bid');
    }
}

async function load_user_info (user_id, element) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        console.log(PREFIX + 'Load user info request sent to server');

        const response = await axios.post('/api/load_user_info', {
            user_id: user_id
        });

        if (!response.data.success) {
            return;
        }

        //console.log(response.data.user.results);
        load_user_panel(response.data.user.results, element);
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function load_user_sent_rate (user_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        console.log(PREFIX + 'Load user sent rate request sent to server');

        const response = await axios.post('/api/load_user_sent_rate', {
            user_id: user_id
        });

        //console.log(response.data);
        if (!response.data.success) {
            show_element(btn_send_feedback);
            hide_element(btn_update_feedback);
            user_rate_feedback_input.value = '';
            update_rating(3);
            return;
        }

        const feedback = response.data.feedback;
        show_element(btn_update_feedback);
        hide_element(btn_send_feedback);
        user_rate_feedback_input.value = feedback.feedback;
        update_rating(Number(feedback.star_value));
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function load_user_received_feedback (user_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.post('/api/get_user_received_feeback', {
            user_id: user_id
        });

        //console.log(JSON.stringify(response.data));
        user_panel_received_feedback.innerHTML = '';
        if (!response.data.feedback) {
            user_panel_received_feedback.innerHTML = 'No results found';
            return;
        }
        for (const feedback of response.data.feedback) {
            user_panel_received_feedback.appendChild(get_user_feedback_row_node(feedback));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_users_list (name_surname_filter = '', element, page = 1) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        console.log(PREFIX + 'Load users list request sent to server');

        const response = await axios.post('/api/load_users_list', {
            name_surname_filter: name_surname_filter,
            page: page
        });

        if (!response.data.success) {
            return;
        }

        const data = response.data.users;
        //console.log(JSON.stringify(response.data.users));

        element.innerHTML = '';
        if (!data.length) {
            element.innerHTML = 'No results found';
            return;
        }
        for (const user of data) {
            element.appendChild(get_user_row_node(user));
        }

        return data.length;
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function load_user_posted_auctions (user_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_user_posted_auctions', {
            params: {
                user_id: user_id
            }
        });

        if (!response.data.success) {
            return;
        }

        //console.log(JSON.stringify(response.data));
        user_panel_posted_auctions.innerHTML = '';
        if (!response.data.auctions.results) {
            user_panel_posted_auctions.innerHTML = 'No results found';
            return;
        }
        for (const auction of response.data.auctions.results) {
            add_user_panel_posted_auction(user_panel_posted_auctions, auction);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_user_active_auctions (user_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_user_active_auctions', {
            params: {
                user_id: user_id
            }
        });

        if (!response.data.success) {
            return;
        }

        //console.log(JSON.stringify(response.data));
        user_panel_active_auctions.innerHTML = '';
        if (!response.data.auctions.results) {
            user_panel_active_auctions.innerHTML = 'No results found';
            return;
        }
        for (const auction of response.data.auctions.results) {
            add_user_panel_active_auction(user_panel_active_auctions, auction);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_user_won_auctions (user_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_user_won_auctions', {
            params: {
                user_id: user_id
            }
        });

        if (!response.data.success) {
            return;
        }

        //console.log(JSON.stringify(response.data));
        user_panel_won_auctions.innerHTML = '';
        if (!response.data.auctions.results) {
            user_panel_won_auctions.innerHTML = 'No results found';
            return;
        }
        for (const auction of response.data.auctions.results) {
            add_user_panel_won_auction(user_panel_won_auctions, auction);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function load_user_placed_bids (user_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_user_placed_bids', {
            params: {
                user_id: user_id
            }
        });

        if (!response.data.success) {
            return;
        }

        //console.log(JSON.stringify(response.data));
        user_panel_placed_bids.innerHTML = '';
        if (!response.data.auctions.results) {
            user_panel_placed_bids.innerHTML = 'No results found';
            return;
        }
        for (const auction of response.data.auctions.results) {
            add_user_panel_placed_bids(user_panel_placed_bids, auction);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function send_user_update_general_info (user_edits) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.put('/api/user_update_general_info', {
            user_edits: user_edits
        });

        if (!response.data.success) {
            show_live_toast('Error on account update');
            return;
        } 

        hide_element(global_danger_alert_box);
        show_live_toast('Account updated successfully!');
        page_edit_account.querySelector('div.card>div.card-body>h4[name_surname]').innerHTML = user_edits.name + " " + user_edits.surname;
    } catch (error) {
        console.error('Error:', error);
        show_live_toast('Error on account update');
    }
}

async function send_user_update_email (email) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.put('/api/user_update_email', {
            new_email: email
        });

        //console.log(JSON.stringify(response.data));
        if (!response.data.success) {
            show_live_toast(response.data.message);
            return;
        } 

        hide_element(global_danger_alert_box);
        show_live_toast('Account email updated successfully!');
    } catch (error) {
        console.error('Error:', error);
        show_live_toast('Error on account email update');
    }
}

async function send_user_update_password (old_password, new_password) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.put('/api/user_update_password', {
            old_password: old_password,
            new_password: new_password
        });

        //console.log(JSON.stringify(response.data));
        if (!response.data.success) {
            show_live_toast(response.data.message);
            return;
        } 

        hide_element(global_danger_alert_box);
        show_live_toast('Account password updated successfully!');
        
        edit_account_new_password_input.value = '';
        edit_account_actual_password_input.value = '';
        edit_account_repeat_password_input.value = '';
    } catch (error) {
        console.error('Error:', error);
        show_live_toast(error.response.data.message);
    }
}

async function send_user_report (reported_id, reason_id, custom_reason) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {

        const report = {reported_id:reported_id, reason_id:reason_id, custom_reason:custom_reason};
        //console.log(JSON.stringify(report));

        const response = await axios.post('/api/send_user_report', {
            report: report
        });

        //console.log(JSON.stringify(response.data));
        if (!response.data.success) {
            show_live_toast(response.data.message);
            return;
        } 

        show_live_toast('Report sent successfully');
        
        hide_element(report_reason_container);
        report_reason_input.value = '';
        report_reason_select.value = '-1';
    } catch (error) {
        console.error('Error:', error);
        show_live_toast(error.response.data.message);
    }
}

async function load_reports_list (element, page = 1) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    try {
        console.log(PREFIX + 'Load reports list request sent to server');

        const response = await axios.post('/api/load_reports_list', {
            page: page
        });

        if (!response.data.success) {
            return;
        }

        const data = response.data.data;
        //console.log(JSON.stringify(response.data));

        element.innerHTML = '';
        if (data.length >= 1) {
            for (const report of data) {
                element.appendChild(get_report_row_node(report));
            }
        } else {
            element.innerHTML = 'No result found';
        }
        
        return data.length;
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function delete_report (report) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    try {
        console.log(PREFIX + 'Delete report request sent to server');

        const response = await axios.post('/api/delete_report', {
            report: report
        });

        if (!response.data.success) {
            show_live_toast('Error on report delete');
            return;
        }

        show_live_toast('Report deleted successfully');
    } catch (error) {
        show_live_toast(error.response.data.message);
        console.log(error.response.data.message);
    }
}

async function get_report_from_id (report_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    try {
        console.log(PREFIX + 'Get report from id request sent to server');

        const response = await axios.post('/api/get_report_from_id', {
            report_id: report_id
        });

        if (!response.data.success) {
            show_live_toast('Error on report get');
            return;
        }

        //console.log(JSON.stringify(response.data));
        const report = response.data.data[0];
        console.log(JSON.stringify(report));
        const report_node = get_report_row_node(report);

        if (reports_center.firstChild) {
            reports_center.insertBefore(report_node, reports_center.firstChild);
        } else {
            reports_center.appendChild(report_node);
        }
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function send_ban_user (user_ban_id, reason) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    try {
        console.log(PREFIX + 'User ban request sent to server');

        const response = await axios.post('/api/ban_user', {
            user_ban_id: user_ban_id,
            reason: reason
        });

        if (!response.data.success) {
            show_live_toast('Error during user ban');
            return;
        }

        show_live_toast('User banned successfully!');

        //console.log(JSON.stringify(response.data));
        user_profile_panel.querySelector('div.card-body span[ban_reason]').innerText = reason;
        show_element(user_profile_panel.querySelector('div.card-body span[banned]'));
        hide_element(ban_form);
        show_element(btn_unban_user);
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function send_unban_user (user_unban_id) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (!Number(current_user.permission_level) > 0) {
        return;
    }

    try {
        console.log(PREFIX + 'User ban request sent to server');

        const response = await axios.post('/api/unban_user', {
            user_unban_id: user_unban_id
        });

        if (!response.data.success) {
            show_live_toast('Error during user unban');
            return;
        }

        show_live_toast('User unbanned successfully!');

        //console.log(JSON.stringify(response.data));
        hide_element(user_profile_panel.querySelector('div.card-body span[banned]'));
        hide_element(btn_unban_user);
        show_element(ban_form);
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function send_user_feedback (user_id, new_rating, feedback) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        console.log(PREFIX + 'User new feedback request sent to server');

        const response = await axios.post('/api/new_user_feedback', {
            user_id: user_id,
            new_rating: new_rating,
            feedback: feedback
        });

        if (!response.data.success) {
            show_live_toast('Error sending user feedback');
            return;
        }

        show_live_toast('Feedback added!');

        //console.log(JSON.stringify(response.data));
        hide_element(btn_send_feedback);
        show_element(btn_update_feedback);
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function send_update_user_feedback (user_id, new_rating, feedback) {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        console.log(PREFIX + 'User update feedback request sent to server');

        const response = await axios.post('/api/update_user_feedback', {
            user_id: user_id,
            new_rating: new_rating,
            feedback: feedback
        });

        //console.log(JSON.stringify(response.data));
        if (!response.data.success) {
            show_live_toast('Error updating user feedback');
            return;
        }

        show_live_toast('Feedback updated!');
    } catch (error) {
        console.log(error.response.data.message);
    }
}

async function get_last_notification () {
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    try {
        const response = await axios.get('/api/get_last_notification', {
            params: {

            }
        });

        if (!response.data.success) {
            return;
        }

        //console.log(JSON.stringify(response.data));
        const notif = response.data.notification;
        //console.log("LAST NOTIF: " + JSON.stringify(notif));
        if (!notif) {
            return;
        }
        
        if (last_notification == 'first') {
            last_notification = notif;
        }
        else if (!last_notification || (Number(notif.id) != Number(last_notification.id))) {
            last_notification = notif;
            show_element(new_notifications_counter);
            show_live_toast("You have new notification(s)!");
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

socket.on('new_bid_added', (data) => {
    //console.log("Received new bid: " + JSON.stringify(data));
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    update_other_auction_row(data.auction);
    update_preview_auction_row(data.auction);
    update_your_auction_row(data.auction);
    update_global_compact_auction(data.auction);
    update_favorite_compact_auction(data.auction);
});

socket.on('new_report_added', (report_id) => {
    console.log("Added report: " + JSON.stringify(report_id));
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }

    if (current_user.permission_level > 0) {
        //console.log(report_id);
        get_report_from_id(report_id);
    }
});

socket.on('report_deleted', (report) => {
    //console.log("Deleted report: " + JSON.stringify(report));
    if (!verify_user_session()) {
        console.log('Action forbidden without a logged user!');
        return;
    }
    
    if (current_user.permission_level > 0) {
        const report_node = reports_center.querySelector(`div[report_id="${report.id}"]`);
        if (report_node) {
            report_node.remove();
        }
    }
});

let connected_room_auction = null;
socket.on('user-connected-auction-room', (data) => {
    chat_content_messages.appendChild(get_chat_user_join(data.user, data.message_time));
    chat_content_messages.scrollTop = chat_content_messages.scrollHeight;
});

socket.on('user-disconnected-auction-room', (data) => {
    chat_content_messages.appendChild(get_chat_user_left(data.user, data.message_time));
    chat_content_messages.scrollTop = chat_content_messages.scrollHeight;
});

socket.on('user-auction-bid-room-message', (data) => {
    //console.log(JSON.stringify(data));
    chat_content_messages.appendChild(get_new_bid_chat_node(data));
    chat_content_messages.scrollTop = chat_content_messages.scrollHeight;
});

socket.on('auction-end-room-message', (data) => {
    //console.log(JSON.stringify(data));
    if (Number(data.auction.id_status) == 5) {
        chat_content_messages.appendChild(get_sold_bid_chat_node(data.auction));
    } else if (Number(data.auction.id_status) == 6) {
        chat_content_messages.appendChild(get_expired_bid_chat_node(data.auction));
    }
    chat_content_messages.scrollTop = chat_content_messages.scrollHeight;
});

socket.on('user-auction-room-message', (data) => {
    //console.log(JSON.stringify(data));
    let node;
    if (data.user.id == current_user.id) {
        node = get_message_me_row_node(data.message);
    } else {
        node = get_message_other_row_node(data.user, data.message);
    }
    chat_content_messages.appendChild(node);
    chat_content_messages.scrollTop = chat_content_messages.scrollHeight;
});

socket.on('user-delete-auction-room-message', (data) => {
    //console.log(JSON.stringify(data));
    chat_content_messages.appendChild(get_deleted_auction_chat_node(data.message_time));
    chat_content_messages.scrollTop = chat_content_messages.scrollHeight;
});

socket.on('auction-deleted', (data) => {
    //console.log(JSON.stringify(data));
    const auction = data;

    const global_node = others_auctions_compact.querySelector(`div[auction_id="${auction.id}"]`);
    if (global_node) {
        global_node.remove();
    }
    
    const favorite_node = favorite_auctions.querySelector(`div[auction_id="${auction.id}"]`);
    if (favorite_node) {
        favorite_node.querySelector('span[status_name]').innerText = 'Cancelled';
        set_auction_status_color(4, favorite_node.querySelector('span[status_name]'));
    }

    const preview_node = preview_auction.querySelector(`div[auction_id="${auction.id}"]`);
    if (preview_node) {
        set_auction_status_color(4, preview_node.querySelector('span[status]'));
        preview_node.querySelector('span[status]').innerText = 'Cancelled';
        preview_node.querySelector('span[status]').title = '';
        
        hide_element(preview_node.querySelector('div.other-auction-btn-container'));
        hide_element(preview_node.querySelector('div[last_offer_from]'));
    }
});

socket.on('auction-expired', (data) => {
    //console.log(JSON.stringify(data));
    const auction = data;

    const your_node = your_auctions.querySelector(`div.auction[auction_id="${auction.id}"]`);
    if (your_node) {
        set_auction_status_color(auction.id_status, your_node.querySelector('span[status]'));
        your_node.querySelector('span[status]').innerText = auction.status_name;
        your_node.querySelector('span[status]').title = auction.status_description;
        
        hide_element(your_node.querySelector('div.your-auction-btn-container'));
    }

    const global_node = others_auctions_compact.querySelector(`div[auction_id="${auction.id}"]`);
    if (global_node) {
        global_node.querySelector('span[status_name]').innerText = auction.status_name;
        set_auction_status_color(auction.id_status, global_node.querySelector('span[status_name]'));
    }

    const favorite_node = favorite_auctions.querySelector(`div[auction_id="${auction.id}"]`);
    if (favorite_node) {
        favorite_node.querySelector('span[status_name]').innerText = auction.status_name;
        set_auction_status_color(auction.id_status, favorite_node.querySelector('span[status_name]'));
    }
    
    const preview_node = preview_auction.querySelector(`div[auction_id="${auction.id}"]`);
    if (preview_node) {
        set_auction_status_color(auction.id_status, preview_node.querySelector('span[status]'));
        preview_node.querySelector('span[status]').innerText = auction.status_name;
        preview_node.querySelector('span[status]').title = auction.status_description;
        
        hide_element(preview_node.querySelector('div.other-auction-btn-container'));
    }
});

socket.on('disconnect', (reason) => {
    leave_current_auction_room();
});

function leave_current_auction_room () {
    if (connected_room_auction) {
        socket.emit('leave-chat-auction', {auction_id:connected_room_auction, user: {id:current_user.id, name:current_user.name, surname: current_user.surname}});
        connected_room_auction = null;
    }
}

edit_account_image_file.addEventListener('change', function() {
    preview_image(this, page_edit_account.querySelector('div.card>img[account_image]'));
    compress_user_image_and_upload(edit_account_image_file, current_user.id);
});

new_auction_img_1_input.addEventListener('change', function() {
    preview_image(this, new_auction_img_1);
});

new_auction_img_2_input.addEventListener('change', function() {
    preview_image(this, new_auction_img_2);
});

new_auction_img_3_input.addEventListener('change', function() {
    preview_image(this, new_auction_img_3);
});


function set_element_value (element, value) {
    element.innerHTML = value;
}

function set_disabled (element) {
    element.setAttribute('disabled', true);
}

function set_enabled (element) {
    element.removeAttribute('disabled');
}

function clear_new_auction_form () {
    new_auction_name_input.value = '';

    new_auction_category_select.selectedIndex = 0;
    new_auction_time_select.selectedIndex = 0;

    new_auction_description_input.value = '';

    new_auction_starting_price_input.value = '';
    new_auction_duration_input.value = '';

    new_auction_img_1_input.value = '';
    new_auction_img_2_input.value = '';
    new_auction_img_3_input.value = '';

    new_auction_img_1.src = '';
    new_auction_img_2.src = '';
    new_auction_img_3.src = '';
}

function get_html_auction_pics (auction_id, pics_number) {
    let html_nodes = [];

    for (let i = 1; i <= pics_number; i++) {
        let img = document.createElement('img');
        img.classList.add('center-cropped', 'border', 'rounded', 'd-inline-block', 'clickable', 'm-2');
        img.width = 180;
        img.height = 120;
        img.src = `../uploads/auctions/${auction_id}/images/${i}.jpeg`;
        img.setAttribute('img_number', i);
        html_nodes.push(img);
    }

    return html_nodes;
}

function add_your_auction (element, auction, pics_number) {
    if (Number(auction.id_status) == 1 || Number(auction.id_status) == 7) {
        add_your_auction_status_1_7(element, auction, pics_number);
    } else {
        add_your_auction_status_other(element, auction, pics_number);
    }
}

function add_your_auction_status_1_7 (element, auction, pics_number) {
    auction.end_time = date_to_locale(auction.end_time);

    const node = document.createElement('div');
    node.classList.add('card', 'mb-3', 'auction');
    node.setAttribute('auction_id', auction.id);

    let main_pic = document.createElement('img');
    main_pic.classList.add('img-fluid', 'rounded');
    main_pic.setAttribute('main_img', '');
    main_pic.src = `../uploads/auctions/${auction.id}/images/1.jpeg`;
    let pic_nodes = get_html_auction_pics(auction.id, pics_number);

    for (let pic of pic_nodes) {
        pic.addEventListener('click', function() {
            main_pic.src = this.src;
        });
    }

    node.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3 main-pic-container"></div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title title">
                        <span class="badge" status title="${auction.status_description}">${auction.status_name}</span> <span auction_title>${auction.name}</span>
                    </h5>
                    <p class="card-text text">
                        <h6 class="d-inline-block" category_id="${auction.id_category}">Category:</h6> <span category_name>${auction.category_name}</span> <br>
                        <h6 class="d-inline-block">Description:</h6> <span description>${auction.description}</span> <br>
                        <h6 class="d-inline-block">Actual price:</h6> <span actual_price>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                        <h6 class="d-inline-block">Expire:</h6> <span>${auction.end_time}</span>
                    </p>
                    <div last_offer_from class="mb-2 d-flex flex-column flex-md-row justify-content-center">

                    </div>
                    <h6 class="d-inline-block">Other images:</h6>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center other-images-container"></div>
                    <div class="d-grid gap-2 your-auction-btn-container">

                    </div>
                </div>
            </div>
        </div>`;

    let bidder_node;
    if (auction.max_bid_user_id) {
        bidder_node = get_last_bidder_card(auction);
    } else {
        bidder_node = document.createElement('div');
        bidder_node.innerHTML = `<h6 class="d-inline-block">Last offer from:</h6> <span>Nobody</span> <br>`
    }
    node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);

    set_auction_status_color(auction.id_status, node.querySelector('span[status]'));
        
    node.querySelector('.main-pic-container').appendChild(main_pic);

    let other_images_div = node.querySelector('.other-images-container');
    for (let pic of pic_nodes) {
        other_images_div.appendChild(pic);
    }

    if (Number(auction.id_status) == 1) {
        const button_join_chat = document.createElement('button');
        button_join_chat.classList.add('btn', 'btn-outline-info');
        button_join_chat.type = 'button';
        button_join_chat.innerHTML = 'Join auction chat';
        button_join_chat.addEventListener('click', () => {
            prepare_auction_chat_panel(auction);
            show_element(chat_container);
            
            leave_current_auction_room();
            connected_room_auction = auction.id;
            socket.emit('join-chat-auction', {auction:auction, user: {id:current_user.id, name:current_user.name, surname: current_user.surname}});
        });
        node.querySelector('.your-auction-btn-container').appendChild(button_join_chat);
    }

    const button_edit = document.createElement('button');
    button_edit.classList.add('btn', 'btn-primary');
    button_edit.type = 'button';
    button_edit.innerHTML = 'Edit auction';
    button_edit.addEventListener('click', () => {
        open_panel(edit_auction_panel);
        load_edit_auction_panel(auction, pics_number);
    });

    const button_cancel = document.createElement('button');
    button_cancel.classList.add('btn', 'btn-primary');
    button_cancel.type = 'button';
    button_cancel.innerHTML = 'Cancel auction';
    button_cancel.addEventListener('click', () => {
        open_panel(confirm_panel);
        load_confirm_cancel_auction_panel(auction);
    });

    node.querySelector('.your-auction-btn-container').appendChild(button_edit);
    node.querySelector('.your-auction-btn-container').appendChild(button_cancel);

    element.appendChild(node);
}

function add_your_auction_status_other (element, auction, pics_number) {
    auction.end_time = date_to_locale(auction.end_time);

    const node = document.createElement('div');
    node.classList.add('card', 'mb-3', 'auction');
    node.setAttribute('auction_id', auction.id);

    let main_pic = document.createElement('img');
    main_pic.classList.add('img-fluid', 'rounded');
    main_pic.setAttribute('main_img', '');
    main_pic.src = `../uploads/auctions/${auction.id}/images/1.jpeg`;
    let pic_nodes = get_html_auction_pics(auction.id, pics_number);

    for (let pic of pic_nodes) {
        pic.addEventListener('click', function() {
            main_pic.src = this.src;
        });
    }

    node.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3 main-pic-container"></div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title title">
                        <span class="badge" status title="${auction.status_description}">${auction.status_name}</span> <span auction_title>${auction.name}</span>
                    </h5>
                    <p class="card-text text">
                        <h6 class="d-inline-block" category_id="${auction.id_category}">Category:</h6> <span category_name>${auction.category_name}</span> <br>
                        <h6 class="d-inline-block">Description:</h6> <span description>${auction.description}</span> <br>
                        <h6 class="d-inline-block">Actual price:</h6> <span actual_price>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                        <h6 class="d-inline-block">Expire:</h6> <span>${auction.end_time}</span>
                    </p>
                    <div last_offer_from class="mb-2 d-flex flex-column flex-md-row justify-content-center">

                    </div>
                    <h6 class="d-inline-block">Other images:</h6>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center other-images-container"></div>
                </div>
            </div>
        </div>`;

    let bidder_node;
    if (auction.max_bid_user_id) {
        bidder_node = get_last_bidder_card(auction);
    } else {
        bidder_node = document.createElement('div');
        bidder_node.innerHTML = `<h6 class="d-inline-block">Last offer from:</h6> <span>Nobody</span> <br>`
    }
    node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);

    set_auction_status_color(auction.id_status, node.querySelector('span[status]'));
        
    node.querySelector('.main-pic-container').appendChild(main_pic);

    let other_images_div = node.querySelector('.other-images-container');
    for (let pic of pic_nodes) {
        other_images_div.appendChild(pic);
    }

    element.appendChild(node);
}

function add_others_auction (element, auction, pics_number) {
    if (Number(auction.id_status) == 1) {
        add_other_auction_status_1(element, auction, pics_number);
        load_favourite_btn(auction.id, element);
    } else {
        add_other_auction_status_other(element, auction, pics_number);
    }
}

function add_other_auction_status_1 (element, auction, pics_number) {
    auction.end_time = date_to_locale(auction.end_time);

    const node = document.createElement('div');
    node.classList.add('card', 'mb-3', 'auction');
    node.setAttribute('auction_id', auction.id);

    let main_pic = document.createElement('img');
    main_pic.classList.add('img-fluid', 'rounded');
    main_pic.setAttribute('main_img', '');
    main_pic.src = `../uploads/auctions/${auction.id}/images/1.jpeg`;
    let pic_nodes = get_html_auction_pics(auction.id, pics_number);

    for (let pic of pic_nodes) {
        pic.addEventListener('click', function() {
            main_pic.src = this.src;
        });
    }

    node.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3 main-pic-container"></div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title title">
                        <span class="badge" status title="${auction.status_description}">${auction.status_name}</span> <span auction_title>${auction.name}</span>
                        <button type="button" class="btn btn-link ms-3" title="Remove from favorites" btn_favorites_yes hidden><div class="heart-full"></div></button>
                        <button type="button" class="btn btn-link ms-3" title="Add to favorites" btn_favorites_no hidden><div class="heart-empty"></div></button>
                    </h5>
                    <p class="card-text text">
                        <h6 class="d-inline-block" category_id="${auction.id_category}">Category:</h6> <span category_name>${auction.category_name}</span> <br>
                        <h6 class="d-inline-block">Description:</h6> <span description>${auction.description}</span> <br>
                        <h6 class="d-inline-block">Actual price:</h6> <span actual_price>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                        <h6 class="d-inline-block">Expire:</h6> <span>${auction.end_time}</span>
                    </p>
                    <div last_offer_from class="mb-2 d-flex flex-column flex-md-row justify-content-center">

                    </div>
                    <h6 class="d-inline-block">Other images:</h6>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center other-images-container"></div>
                    <div class="input-group mb-3 other-auction-btn-container">
                        <input type="number" new_bid_input class="form-control" placeholder="Place your bid, minimum ${EURO_SYM}${auction.actual_price+1}" aria-label="Place your bid, minimum €${auction.actual_price+1}" value="${auction.actual_price+1}" aria-describedby="btn_send_bid">
                        <button class="btn btn-outline-secondary" type="button" btn_send_bid>Send bid</button>
                    </div>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center" author_container>
                        <div class="card mb-3 w-75 clickable" auction_author>
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="../uploads/users/${auction.id_owner}/profile_pic/profile_pic.jpeg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Auction author</h5>
                                        <p class="card-text">${auction.owner_name} ${auction.owner_surname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    node.querySelector('div[author_container] div[auction_author]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.id_owner);
    });

    let bidder_node;
    if (auction.max_bid_user_id) {
        bidder_node = get_last_bidder_card(auction);
    } else {
        bidder_node = document.createElement('div');
        bidder_node.innerHTML = `<h6 class="d-inline-block">Last offer from:</h6> <span>Nobody</span> <br>`
    }
    node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);

    set_auction_status_color(auction.id_status, node.querySelector('span[status]'));
        
    node.querySelector('.main-pic-container').appendChild(main_pic);

    let other_images_div = node.querySelector('.other-images-container');
    for (let pic of pic_nodes) {
        other_images_div.appendChild(pic);
    }

    if (Number(auction.id_status) == 1) {
        const button_join_chat = document.createElement('button');
        button_join_chat.classList.add('btn', 'btn-outline-info');
        button_join_chat.type = 'button';
        button_join_chat.innerHTML = 'Join auction chat';
        button_join_chat.addEventListener('click', () => {
            prepare_auction_chat_panel(auction);
            show_element(chat_container);

            leave_current_auction_room();
            connected_room_auction = auction.id;
            socket.emit('join-chat-auction', {auction:auction, user: {id:current_user.id, name:current_user.name, surname: current_user.surname}});
        });
        node.querySelector('.other-auction-btn-container').appendChild(button_join_chat);
    }

    const btn_send_bid = node.querySelector('.other-auction-btn-container>button[btn_send_bid]');
    btn_send_bid.addEventListener('click', () => {
        const new_bid = node.querySelector('.other-auction-btn-container>input[new_bid_input]').value.trim();

        if (!new_bid) {
            show_live_toast("Invalid bid");
            return;
        }

        if (new_bid <= auction.actual_price) {
            show_live_toast("Your bid must be higher than actual price (or last bid)!");
            return;
        }

        open_panel(confirm_panel);
        load_confirm_auction_bid_panel(auction, new_bid);
    });

    node.querySelector('button[btn_favorites_yes]').addEventListener('click', () => {
        remove_auction_form_favorite(auction.id);
    });

    node.querySelector('button[btn_favorites_no]').addEventListener('click', () => {
        add_auction_to_favorite(auction.id);
    });

    element.appendChild(node);
}

function add_other_auction_status_other (element, auction, pics_number) {
    auction.end_time = date_to_locale(auction.end_time);

    const node = document.createElement('div');
    node.classList.add('card', 'mb-3', 'auction');
    node.setAttribute('auction_id', auction.id);

    let main_pic = document.createElement('img');
    main_pic.classList.add('img-fluid', 'rounded');
    main_pic.setAttribute('main_img', '');
    main_pic.src = `../uploads/auctions/${auction.id}/images/1.jpeg`;
    let pic_nodes = get_html_auction_pics(auction.id, pics_number);

    for (let pic of pic_nodes) {
        pic.addEventListener('click', function() {
            main_pic.src = this.src;
        });
    }

    node.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3 main-pic-container"></div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title title">
                        <span class="badge" status title="${auction.status_description}">${auction.status_name}</span> <span auction_title>${auction.name}</span>
                    </h5>
                    <p class="card-text text">
                        <h6 class="d-inline-block" category_id="${auction.id_category}">Category:</h6> <span category_name>${auction.category_name}</span> <br>
                        <h6 class="d-inline-block">Description:</h6> <span description>${auction.description}</span> <br>
                        <h6 class="d-inline-block">Actual price:</h6> <span actual_price>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                        <h6 class="d-inline-block">Expire:</h6> <span>${auction.end_time}</span>
                    </p>
                    <div last_offer_from class="mb-2 d-flex flex-column flex-md-row justify-content-center">

                    </div>
                    <h6 class="d-inline-block">Other images:</h6>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center other-images-container"></div>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center" author_container>
                        <div class="card mb-3 w-75 clickable" auction_author>
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="../uploads/users/${auction.id_owner}/profile_pic/profile_pic.jpeg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Auction author</h5>
                                        <p class="card-text">${auction.owner_name} ${auction.owner_surname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    node.querySelector('div[author_container] div[auction_author]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.id_owner);
    });

    let bidder_node;
    if (auction.max_bid_user_id) {
        bidder_node = get_last_bidder_card(auction);
    } else {
        bidder_node = document.createElement('div');
        bidder_node.innerHTML = `<h6 class="d-inline-block">Last offer from:</h6> <span>Nobody</span> <br>`
    }
    node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);

    set_auction_status_color(auction.id_status, node.querySelector('span[status]'));
        
    node.querySelector('.main-pic-container').appendChild(main_pic);

    let other_images_div = node.querySelector('.other-images-container');
    for (let pic of pic_nodes) {
        other_images_div.appendChild(pic);
    }

    element.appendChild(node);
}

function add_pending_review_auction (element, auction) {
    auction.end_time = date_to_locale(auction.end_time);

    const node = document.createElement('div');
    node.classList.add('card', 'mb-3', 'auction');
    node.setAttribute('auction_id', auction.id);

    let main_pic = document.createElement('img');
    main_pic.classList.add('img-fluid', 'rounded');
    main_pic.setAttribute('main_img', '');
    main_pic.src = `../uploads/auctions/${auction.id}/images/1.jpeg`;
    let pic_nodes = get_html_auction_pics(auction.id, 3);

    for (let pic of pic_nodes) {
        pic.addEventListener('click', function() {
            main_pic.src = this.src;
        });
    }

    node.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3 main-pic-container"></div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title title">
                        <span class="badge" status title="${auction.status_description}">${auction.status_name}</span> <span auction_title>${auction.name}</span>
                    </h5>
                    <p class="card-text text">
                        <h6 class="d-inline-block" category_id="${auction.id_category}">Category:</h6> <span category_name>${auction.category_name}</span> <br>
                        <h6 class="d-inline-block">Description:</h6> <span description>${auction.description}</span> <br>
                        <h6 class="d-inline-block">Actual price:</h6> <span actual_price>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                        <h6 class="d-inline-block">Expire:</h6> <span>${auction.end_time}</span>
                    </p>
                    <h6 class="d-inline-block">Other images:</h6>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center other-images-container"></div>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center" author_container>
                        <div class="card mb-3 w-75 clickable" auction_author>
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="../uploads/users/${auction.id_owner}/profile_pic/profile_pic.jpeg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Auction author</h5>
                                        <p class="card-text">${auction.owner_name} ${auction.owner_surname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2 d-flex flex-column flex-md-row justify-content-center auction-btn-container">
                    </div>
                </div>
            </div>
        </div>`;

    set_auction_status_color(auction.id_status, node.querySelector('span[status]'));
        
    node.querySelector('.main-pic-container').appendChild(main_pic);

    let other_images_div = node.querySelector('.other-images-container');
    for (let pic of pic_nodes) {
        other_images_div.appendChild(pic);
    }

    node.querySelector('div[author_container] div[auction_author]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.id_owner);
    });

    const button_edit = document.createElement('button');
    button_edit.classList.add('btn', 'btn-outline-danger', 'w-25', 'm-2');
    button_edit.type = 'button';
    button_edit.innerHTML = 'Deny auction';
    button_edit.addEventListener('click', () => {
        open_panel(confirm_panel);
        load_confirm_deny_auction(auction);
    });

    const button_cancel = document.createElement('button');
    button_cancel.classList.add('btn', 'btn-outline-success', 'w-25', 'm-2');
    button_cancel.type = 'button';
    button_cancel.innerHTML = 'Allow auction';
    button_cancel.addEventListener('click', () => {
        open_panel(confirm_panel);
        load_confirm_allow_auction(auction);
    });

    node.querySelector('.auction-btn-container').appendChild(button_edit);
    node.querySelector('.auction-btn-container').appendChild(button_cancel);

    element.appendChild(node);
}

function load_confirm_deny_auction (auction) {

    confirm_panel_msg.innerText = `Are you sure you want to deny and cancel the auction '${auction.name}'? Only the auction autor ${auction.owner_name} ${auction.owner_surname} will continue to see this auction in his/her section, but he/she will no longer be able to inteact with it`

    btn_confirm_yes.addEventListener('click', () => {
        send_deny_auction(auction);
    });
}

function load_confirm_allow_auction (auction) {

    confirm_panel_msg.innerText = `Are you sure you want to allow the auction '${auction.name}' to be posted? All registered users will see this auction their sections, and they will be able to inteact with it`

    btn_confirm_yes.addEventListener('click', () => {
        send_allow_auction(auction);
    });
}

function start_loading (loading_elem, btn_to_disable) {
    show_element(loading_elem);
    set_disabled(btn_to_disable);
}

function stop_loading (loading_elem, btn_to_enable) {
    hide_element(loading_elem);
    set_enabled(btn_to_enable);
}

function show_live_toast (message) {
    live_toast_msg.innerHTML = message;
    toast_bootstrap.show();
}

function date_to_locale (date) {
    const date_from_db = new Date(date);
    const local_date = date_from_db.toLocaleString();
    return local_date
}

function open_panel (panel) {
    document.body.style.overflow = 'hidden';
    show_element(panel);
}

function close_panel (panel) {
    document.body.style.overflow = 'auto';
    hide_element(panel);
}

function load_edit_auction_panel (auction, num_pics) {
    edit_auction_name_input.value = auction.name;
    edit_auction_description_input.value = auction.description;
    edit_auction_category_select.selectedIndex = auction.id_category;

    edit_auction_img_1.src = `../uploads/auctions/${auction.id}/images/1.jpeg`;
    edit_auction_img_2.src = `../uploads/auctions/${auction.id}/images/2.jpeg`;
    edit_auction_img_3.src = `../uploads/auctions/${auction.id}/images/3.jpeg`;

    edit_auction_img_1_input.addEventListener('change', function() {
        preview_image(this, edit_auction_img_1);
    });

    edit_auction_img_2_input.addEventListener('change', function() {
        preview_image(this, edit_auction_img_2);
    });

    edit_auction_img_3_input.addEventListener('change', function() {
        preview_image(this, edit_auction_img_3);
    });

    btn_send_edit_auction.addEventListener('click', () => {
        if (!verify_user_session()) {
            console.log('Action forbidden without a logged user!');
            return;
        }

        if (!auction.id_owner) {
            console.log(PREFIX + "Action forbidden without a logged user");
            return;
        }
    
        const new_name = edit_auction_name_input.value.trim();
        const new_category_id = edit_auction_category_select.value;
        const new_category_name = edit_auction_category_select.options[edit_auction_category_select.selectedIndex].textContent;
        const new_description = edit_auction_description_input.value.trim();
    
        if (!valid_auction_name(new_name)) {
            show_element(edit_panel_alert_box);
            set_element_value(edit_panel_alert_box_msg, 'Invalid auction name')
            return;
        }
    
        if (!valid_id(new_category_id)) {
            show_element(edit_panel_alert_box);
            set_element_value(edit_panel_alert_box_msg, 'Invalid auction category')
            return;
        }
    
        if (!valid_auction_description(new_description)) {
            show_element(edit_panel_alert_box);
            set_element_value(edit_panel_alert_box_msg, 'Invalid auction description')
            return;
        }

        if (edit_auction_img_1_input.files.length > 0) {
            compress_new_auction_image_and_upload(edit_auction_img_1_input, auction.id, 1);
        }

        if (edit_auction_img_2_input.files.length > 0) {
            compress_new_auction_image_and_upload(edit_auction_img_2_input, auction.id, 2);
        }

        if (edit_auction_img_3_input.files.length > 0) {
            compress_new_auction_image_and_upload(edit_auction_img_3_input, auction.id, 3);
        }
    
        hide_element(edit_panel_alert_box);
    
        auction.name = new_name;
        auction.description = new_description;
        auction.id_category = new_category_id;
        auction.category_name = new_category_name;

        const auction_edits = {new_name:new_name, new_description:new_description, new_category_id:new_category_id, new_category_name:new_category_name, auction_id:auction.id, auction_owner_id:auction.id_owner, auction_status_id:auction.id_status};
        send_edit_auction(auction_edits);
    });
}

function update_your_auction_row (auction_edits) {
    const node = document.querySelector(`#your_auctions div.auction[auction_id="${auction_edits.auction_id}"]`);
    node.querySelector(`h5.title span[auction_title]`).innerText = auction_edits.new_name;
    node.querySelector(`span[category_name]`).innerText = auction_edits.new_category_name;
    node.querySelector(`h6[category_id]`).setAttribute('category_id', auction_edits.new_category_id);
    node.querySelector(`span[description]`).innerText = auction_edits.new_description;
}

function update_other_auction_row (auction) {
    const node = document.querySelector(`#others_auctions div.auction[auction_id="${auction.id}"]`);
    if (!node) {
        return;
    }

    node.querySelector(`span[actual_price]`).innerText = EURO_SYM + "" + auction.max_bid_value;
    node.querySelector(`.other-auction-btn-container>input[new_bid_input]`).value = Number(auction.max_bid_value) + 1;
    node.querySelector(`.other-auction-btn-container>input[new_bid_input]`).setAttribute('placeholder', `Place your bid, minimum ${EURO_SYM}${auction.max_bid_value+1}`);
    node.querySelector(`.other-auction-btn-container>input[new_bid_input]`).setAttribute('aria-label', `Place your bid, minimum ${EURO_SYM}${auction.max_bid_value+1}`);

    let bidder_node = get_last_bidder_card(auction);
    node.querySelector('div.card-body div[last_offer_from]').innerHTML = '';
    node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);
}

function update_preview_auction_row (auction) {
    const node = document.querySelector(`#preview_auction div.auction[auction_id="${auction.id}"]`);
    if (!node) {
        return;
    }

    node.querySelector(`span[actual_price]`).innerText = EURO_SYM + "" + auction.max_bid_value;
    node.querySelector(`.other-auction-btn-container>input[new_bid_input]`).value = Number(auction.max_bid_value) + 1;
    node.querySelector(`.other-auction-btn-container>input[new_bid_input]`).setAttribute('placeholder', `Place your bid, minimum ${EURO_SYM}${auction.max_bid_value+1}`);
    node.querySelector(`.other-auction-btn-container>input[new_bid_input]`).setAttribute('aria-label', `Place your bid, minimum ${EURO_SYM}${auction.max_bid_value+1}`);

    let bidder_node = get_last_bidder_card(auction);
    node.querySelector('div.card-body div[last_offer_from]').innerHTML = '';
    node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);
}

function update_your_auction_row (auction) {
    const node = document.querySelector(`#your_auctions div.auction[auction_id="${auction.id}"]`);
    if (!node) {
        return;
    }

    node.querySelector(`span[actual_price]`).innerText = EURO_SYM + "" + auction.max_bid_value;

    let bidder_node = get_last_bidder_card(auction);
    node.querySelector('div.card-body div[last_offer_from]').innerHTML = '';
    node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);
}

function update_your_auction_pic_row (image_number, auction_id) {
    if (image_number == 1) {
        document.querySelector(`#your_auctions div.auction[auction_id="${auction_id}"] img[main_img]`).src = `../uploads/auctions/${auction_id}/images/${image_number}.jpeg`;
    }
    document.querySelector(`#your_auctions div.auction[auction_id="${auction_id}"] img[img_number="${image_number}"]`).src = `../uploads/auctions/${auction_id}/images/${image_number}.jpeg`;
}

function load_confirm_cancel_auction_panel (auction) {

    confirm_panel_msg.innerText = `Are you sure you want to cancel the auction '${auction.name}'? You will continue to see this auction in this section, but you will no longer be able to inteact with it`

    btn_confirm_yes.addEventListener('click', () => {
        send_cancel_auction(auction);
    });
}

function load_confirm_auction_bid_panel (auction, new_bid) {

    confirm_panel_msg.innerText = `Are you sure you want to place your ${EURO_SYM}${new_bid} bid on the '${auction.name}' auction?`

    btn_confirm_yes.addEventListener('click', () => {
        send_auction_bid(auction, new_bid);
    });
}

function set_auction_status_color (status, node) {
    node.className = 'badge';

    switch(Number(status)) {
        case 1:
            node.classList.add('text-bg-primary');
            break;
        case 2:
            node.classList.add('text-bg-warning');
            break;
        case 3:
            node.classList.add('text-bg-danger');
            break;
        case 4:
            node.classList.add('text-bg-danger');
            break;
        case 5:
            node.classList.add('text-bg-success');
            break;
        case 6:
            node.classList.add('text-bg-warning');
            break;
        case 7:
            node.classList.add('text-bg-secondary');
    }
}

function get_last_bidder_card (auction) {
    const card_node = document.createElement('div');
            card_node.classList.add('card', 'mb-3', 'auction_bidder_card', 'clickable', 'w-75');
            card_node.setAttribute('title', 'Click to see account details');
            card_node.setAttribute('bidder_id', auction.max_bid_user_id);
            card_node.innerHTML = `<div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="../uploads/users/${auction.max_bid_user_id}/profile_pic/profile_pic.jpeg" class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${auction.max_bid_user_name} ${auction.max_bid_user_surname}</h5>
                                                <p class="card-text">Has offered €${auction.actual_price} for this auction</p>
                                                <p class="card-text"><small class="text-body-secondary">${date_to_locale(auction.max_bid_date)}</small></p>
                                            </div>
                                        </div>
                                    </div>`;

    card_node.addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.max_bid_user_id);
    });

    return card_node;
}

function load_user_panel (user, element) {
    //console.log(JSON.stringify(user));

    load_user_sent_rate(user.id);

    element.querySelector(`div.card img[account_image]`).src = `../uploads/users/${user.id}/profile_pic/profile_pic.jpeg`;
    element.querySelector(`div.card div.card-body span[account_name]`).innerText = user.name;
    element.querySelector(`div.card div.card-body span[account_surname]`).innerText = user.surname;
    element.querySelector(`div.card div.card-body span[account_country]`).innerText = user.country_name;
    element.querySelector(`div.card div.card-body span[account_biography]`).innerText = user.biography;
    element.querySelector(`div.card div.card-body span[account_reg_date]`).innerText = date_to_locale(user.registration_data);

    if (user.banned) {
        element.querySelector(`div.card div.card-body span[ban_reason]`).innerText = user.ban_reason;
        show_element(element.querySelector(`div.card div.card-body span[banned]`));
    } else {
        hide_element(element.querySelector(`div.card div.card-body span[banned]`));
    }

    manage_ban_unban_btn(user);
}

function manage_ban_unban_btn (user) {
    if (current_user.permission_level > 0 && current_user.id != user.id) {

        btn_ban_user.addEventListener('click', () => {
            const reason = ban_reason_input.value.trim();

            if (!valid_ban_reason(reason)) {
                show_live_toast('Invalid ban reason!');
                return;
            }

            send_ban_user(user.id, reason);
        });

        btn_unban_user.addEventListener('click', () => {
            send_unban_user(user.id);
        });

        if (user.banned) {
            hide_element(ban_form);
            show_element(btn_unban_user);
        } else {
            hide_element(btn_unban_user);
            show_element(ban_form);
        }

        show_element(user_ban_unban_form);
    } else {
        hide_element(user_ban_unban_form);
    }
}

function add_user_panel_posted_auction (element, auction) {
    const node = document.createElement('div');
    node.classList.add('card', 'mb-3');

    node.innerHTML = `
            <div class="row g-0">
                    <div class="col-md-4">
                        <img src="../uploads/auctions/${auction.id}/images/1.jpeg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title title">
                            <span status title="${auction.status_description}">${auction.status_name}</span> <span>${auction.name}</span>
                        </h5>
                        <p class="card-text text">
                            <h6 class="d-inline-block">Category:</h6> <span>${auction.category_name}</span> <br>
                            <h6 class="d-inline-block">Description:</h6> <span>${auction.description}</span> <br>
                            <h6 class="d-inline-block">End price:</h6> <span>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                            <h6 class="d-inline-block">Expire:</h6> <span>${date_to_locale(auction.end_time)}</span>
                        </p>
                        <div last_offer_from class="mb-2 d-flex flex-column flex-md-row justify-content-center">

                        </div>
                    </div>
                </div>
            </div>`;

    set_auction_status_color(auction.id_status, node.querySelector('div.card-body>h5.title>span[status]'));

    if (auction.max_bid_user_id) {
        let bidder_node = get_last_bidder_card(auction);
        if (node.querySelector('div.card-body div[last_offer_from] div.card')) {
            node.querySelector('div.card-body div[last_offer_from] div.card').remove();
        }
        node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);
    }

    element.appendChild(node);
}

function add_user_panel_active_auction (element, auction) {
    const node = document.createElement('div');
    node.classList.add('card', 'mb-3');

    node.innerHTML = `
            <div class="row g-0">
                    <div class="col-md-4">
                        <img src="../uploads/auctions/${auction.id}/images/1.jpeg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title title">
                            <span status title="${auction.status_description}">${auction.status_name}</span> <span>${auction.name}</span>
                        </h5>
                        <p class="card-text text">
                            <h6 class="d-inline-block">Category:</h6> <span>${auction.category_name}</span> <br>
                            <h6 class="d-inline-block">Description:</h6> <span>${auction.description}</span> <br>
                            <h6 class="d-inline-block">Actual price:</h6> <span>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                            <h6 class="d-inline-block">Expire:</h6> <span>${date_to_locale(auction.end_time)}</span>
                        </p>
                        <div last_offer_from class="mb-2 d-flex flex-column flex-md-row justify-content-center">

                        </div>
                    </div>
                </div>
            </div>`;

    set_auction_status_color(auction.id_status, node.querySelector('div.card-body>h5.title>span[status]'));

    if (auction.max_bid_user_id) {
        let bidder_node = get_last_bidder_card(auction);
        if (node.querySelector('div.card-body div[last_offer_from] div.card')) {
            node.querySelector('div.card-body div[last_offer_from] div.card').remove();
        }
        node.querySelector('div.card-body div[last_offer_from]').appendChild(bidder_node);
    }

    element.appendChild(node);
}

function add_user_panel_won_auction (element, auction) {
    const node = document.createElement('div');
    node.classList.add('card', 'mb-3');

    node.innerHTML = `
            <div class="row g-0">
                    <div class="col-md-4">
                        <img src="../uploads/auctions/${auction.id}/images/1.jpeg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title title">
                            <span status title="${auction.status_description}">${auction.status_name}</span> <span>${auction.name}</span>
                        </h5>
                        <p class="card-text text">
                            <h6 class="d-inline-block">Category:</h6> <span>${auction.category_name}</span> <br>
                            <h6 class="d-inline-block">Description:</h6> <span>${auction.description}</span> <br>
                            <h6 class="d-inline-block">Won price:</h6> <span>${EURO_SYM}${auction.actual_price}</span> <span>(<h6 class="d-inline-block">Starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                            <h6 class="d-inline-block">Expire:</h6> <span>${date_to_locale(auction.end_time)}</span>
                        </p>
                        <div class="mb-2 d-flex flex-column flex-md-row justify-content-center" author_container>
                        <div class="card mb-3 w-75 clickable" auction_author>
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="../uploads/users/${auction.id_owner}/profile_pic/profile_pic.jpeg" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Auction author</h5>
                                        <p class="card-text">${auction.owner_name} ${auction.owner_surname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>`;

    set_auction_status_color(auction.id_status, node.querySelector('div.card-body>h5.title>span[status]'));

    node.querySelector('div[author_container] div[auction_author]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.id_owner);
    });

    element.appendChild(node);
}

function add_user_panel_placed_bids (element, auction) {
    const node = document.createElement('div');
    node.classList.add('card', 'mb-3');

    node.innerHTML = `
            <div class="row g-0">
                    <div class="col-md-4">
                        <img src="../uploads/auctions/${auction.id}/images/1.jpeg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title title">
                            <span status title="${auction.status_description}">${auction.status_name}</span> <span>${auction.name}</span>
                        </h5>
                        <p class="card-text text">
                            <h6 class="d-inline-block">Category:</h6> <span>${auction.category_name}</span> <br>
                            <h6 class="d-inline-block">Description:</h6> <span>${auction.description}</span> <br>
                            <h6 class="d-inline-block">Max palced bid:</h6> <span>${EURO_SYM}${auction.max_bid_value} on ${date_to_locale(auction.bid_date)}</span> <span>(<h6 class="d-inline-block">Auction starting price</h6> <span>${EURO_SYM}${auction.starting_price}</span>)</span> <br>
                            <h6 class="d-inline-block">Expire:</h6> <span>${date_to_locale(auction.end_time)}</span>
                        </p>
                        <div class="mb-2 d-flex flex-column flex-md-row justify-content-center" author_container>
                            <div class="card mb-3 w-75 clickable" auction_author>
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="../uploads/users/${auction.id_owner}/profile_pic/profile_pic.jpeg" class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">Auction author</h5>
                                            <p class="card-text">${auction.owner_name} ${auction.owner_surname}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

    set_auction_status_color(auction.id_status, node.querySelector('div.card-body>h5.title>span[status]'));

    node.querySelector('div[author_container] div[auction_author]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.id_owner);
    });

    element.appendChild(node);
}

function load_user_account_info (user) {
    page_edit_account.querySelector('div.card>img[account_image]').src = `../uploads/users/${user.id}/profile_pic/profile_pic.jpeg`
    page_edit_account.querySelector('div.card>div.card-body>h4[name_surname]').innerHTML = user.name + " " + user.surname;
    page_edit_account.querySelector('div.card>div.card-body>span[account_reg_date]').innerHTML = date_to_locale(user.registration_data);

    edit_account_name_input.value = user.name;
    edit_account_surname_input.value = user.surname;
    edit_account_phone_input.value = user.phone;
    edit_account_biography_input.value = user.biography;
    edit_account_country_input.selectedIndex = user.country_id;
    edit_account_address_input.value = user.shipping_address;
    
    edit_account_email_input.value = user.email;
}

function get_user_row_node (user) {
    const node = document.createElement('div');
    node.classList.add('container', 'w-100', 'd-flex', 'flex-column', 'flex-md-row', 'align-items-center', 'clickable', 'hover-shadow', 'm-3', 'p-3');
    node.innerHTML = `
                <div class="text-center text-md-start">
                    <img user_img src="../uploads/users/${user.id}/profile_pic/profile_pic.jpeg" width="80" height="80" class="center-cropped circle mb-3 mb-md-0">
                </div>
                <div class="ms-md-3 text-center text-md-start">
                    <h5 name_surname>${user.name} ${user.surname}</h5>
                    <h6>${user.country_name}</h6>
                </div>`;

    node.addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(user.id);
    });

    return node;
}

function prepare_user_profile_panel (user_id) {
    if (current_user.id != user_id) {
        //Rating
        btn_send_feedback.addEventListener('click', () => {
            const new_rating = rating;
            const feedback = user_rate_feedback_input.value.trim();

            if (!valid_rating(new_rating)) {
                show_live_toast('Invalid rating!');
                return;
            }

            if (!valid_feedback(feedback)) {
                show_live_toast('Invalid feedback!');
                return;
            }

            send_user_feedback(user_id, new_rating, feedback);
        });

        btn_update_feedback.addEventListener('click', () => {
            const new_rating = rating;
            const feedback = user_rate_feedback_input.value.trim();

            if (!valid_rating(new_rating)) {
                show_live_toast('Invalid rating!');
                return;
            }

            if (!valid_feedback(feedback)) {
                show_live_toast('Invalid feedback!');
                return;
            }

            send_update_user_feedback(user_id, new_rating, feedback);
        });

        //Report
        btn_send_report.addEventListener('click', () => {
            let reason = ' ';
            const reason_id = report_reason_select.value;
        
            if (Number(reason_id) == -2) {
                reason = report_reason_input.value.trim();
        
                if (!valid_report_reason(reason)) {
                    show_live_toast('Invalid reason!');
                    return;
                }

                send_user_report(user_id, reason_id, reason);
                return
            }

            if (!valid_id(reason_id)) {
                show_live_toast('Invalid reason!');
                return;
            }
            
            send_user_report(user_id, reason_id, reason);
        });

        show_element(user_report_form);
        show_element(user_rate_form);
    } else {
        hide_element(user_report_form);
        hide_element(user_rate_form);
    }

    load_user_info(user_id, user_profile_panel);
    load_user_posted_auctions(user_id, user_profile_panel);
    load_user_active_auctions(user_id, user_profile_panel);
    load_user_placed_bids(user_id, user_profile_panel);
    load_user_won_auctions(user_id, user_profile_panel);
    load_user_received_feedback(user_id, user_profile_panel);
}

function prepare_auction_chat_panel (auction) {
    chat_content_messages.innerHTML = '';
    chat_name.innerHTML = 'Chat ' + auction.name;

    send_message_btn.addEventListener('click', () => {
        const message = send_message_input.value.trim();
        if (!message || message.length <= 0) {
            return;
        }

        socket.emit('new-auction-chat-msg', {message:message, auction_id:connected_room_auction, user: {id:current_user.id, name:current_user.name, surname: current_user.surname}});
        send_message_input.value = '';
    });
}

function get_report_row_node (report) {

    //console.log(JSON.stringify(report));
    //console.log(report.id);

    if (!report.reason_name) {
        report['reason_name'] = '';
    }

    const node = document.createElement('div');
    node.classList.add('container', 'w-75', 'report-background', 'mb-3');
    node.setAttribute('report_id', report.id);
    node.innerHTML = `
        <div class="row mb-3">
            <div class="d-flex align-items-center mb-2">
                <h6 class="mb-0">Report id:</h6> <span class="ms-2">${report.id}</span>
            </div>
            <div class="d-flex align-items-center mb-2">
                <h6 class="mb-0">Date:</h6> <span class="ms-2">${date_to_locale(report.timestamp)}</span>
            </div>
            <div class="d-flex align-items-center mb-2">
                <h6 class="mb-0">Reason:</h6> <span class="ms-2">${report.reason_name}${report.custom_reason}</span>
            </div>
        </div>
    
        <div class="row">
            <div class="col-md-6">
                <div reporter class="d-flex flex-column flex-md-row align-items-center clickable hover-shadow m-1 p-3">
                    <div class="text-center text-md-start">
                        <img user_img src="../uploads/users/${report.id_reporter}/profile_pic/profile_pic.jpeg" width="80" height="80" class="center-cropped circle mb-3 mb-md-0">
                    </div>
                    <div class="ms-md-3 text-center text-md-start">
                        <h5 name_surname>${report.reporter_name} ${report.reporter_surname}</h5>
                        <h6>Reporter</h6>
                    </div>
                </div>
            </div>
    
            <div class="col-md-6">
                <div reported class="d-flex flex-column flex-md-row align-items-center clickable hover-shadow m-1 p-3">
                    <div class="text-center text-md-start">
                        <img user_img src="../uploads/users/${report.id_reported}/profile_pic/profile_pic.jpeg" width="80" height="80" class="center-cropped circle mb-3 mb-md-0">
                    </div>
                    <div class="ms-md-3 text-center text-md-start">
                        <h5 name_surname>${report.reported_name} ${report.reported_surname}</h5>
                        <h6>Reported</h6>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-danger" btn_cancel_report>Cancel report</button>
                </div>
            </div>
        </div>`;

    node.querySelector('div[reporter]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(report.id_reporter);
    });

    node.querySelector('div[reported]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(report.id_reported);
    });

    node.querySelector('button[btn_cancel_report]').addEventListener('click', () => {
        delete_report(report);
    });

    return node;
}

function get_message_me_row_node (message) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble', 'chat-bubble-end');
    node.innerHTML = `
            <span class="mt-3">${message.text}</span>
            <div class="fw-light" style="font-size: small;">
                <span class="right-aligned">${message.time}</span>
            </div>`;

    return node;
}

function get_message_other_row_node (user, message) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble', 'chat-bubble-start');
    node.innerHTML = `
            <div user_info class="center-aligned clickable">
                <img src="../uploads/users/${user.id}/profile_pic/profile_pic.jpeg" width="30" height="30" class="d-inline-block align-text-top center-cropped circle">
                <span class="ms-2 fw-medium">${user.name} ${user.surname}</span>
            </div>
            <div>
                <span class="mt-3">${message.text}</span>
            </div>
            <div class="fw-light" style="font-size: small;">
                <span class="right-aligned">${message.time}</span>
            </div>`;

    node.querySelector('div[user_info]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(user.id);
    });

    return node;
}

function get_new_bid_chat_node (auction) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble-alert', 'chat-bubble-start', 'bg-info-subtle', 'text-dark');
    node.innerHTML = `
                <div user_info class="center-aligned clickable">
                    <img logged_img src="../uploads/users/${auction.max_bid_user_id}/profile_pic/profile_pic.jpeg" width="30" height="30" class="d-inline-block align-text-top center-cropped circle">
                    <span class="ms-2 fw-medium">${auction.max_bid_user_name} ${auction.max_bid_user_surname}</span>
                </div>
                <div>
                    <span>Placed a bid of ${EURO_SYM}${auction.max_bid_value} on this auction!</span>
                </div>
                <div class="fw-light" style="font-size: small;">
                    <span class="right-aligned">${date_to_locale(auction.max_bid_date)}</span>
                </div>`;

    node.querySelector('div[user_info]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.max_bid_user_id);
    });

    return node;
}

function get_expired_bid_chat_node (auction) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble-alert', 'chat-bubble-start', 'bg-warning', 'text-dark');
    node.innerHTML = `
                <div>
                    <span class="fw-medium">This auction is expired without any bid!</span>
                </div>
                <div class="fw-light" style="font-size: small;">
                    <span class="right-aligned">${date_to_locale(auction.end_time)}</span>
                </div>`;

    return node;
}

function get_sold_bid_chat_node (auction) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble-alert', 'chat-bubble-start', 'bg-success', 'text-light');
    node.innerHTML = `
                <div user_info class="center-aligned clickable">
                    <img logged_img src="../uploads/users/${auction.bidder_id}/profile_pic/profile_pic.jpeg" width="30" height="30" class="d-inline-block align-text-top center-cropped circle">
                    <span class="ms-2 fw-medium">${auction.bidder_name} ${auction.bidder_surname}</span>
                </div>
                <div>
                    <span>Has won this auction placing a max bid of ${EURO_SYM}${auction.max_bid_value}, congratulations!</span>
                </div>
                <div class="fw-light" style="font-size: small;">
                    <span class="right-aligned">${date_to_locale(auction.end_time)}</span>
                </div>`;

    node.querySelector('div[user_info]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.bidder_id);
    });

    return node;
}

function get_chat_alert_node (message) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble-alert', 'chat-bubble-start');
    node.innerHTML = `
            <span>${message}</span>`;

    return node;
}

function get_chat_user_join (user, message_time) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble-alert', 'chat-bubble-start', 'bg-success-subtle', 'text-dark');
    node.innerHTML = `
                <div user_info class="center-aligned clickable">
                    <img logged_img src="../uploads/users/${user.id}/profile_pic/profile_pic.jpeg" width="30" height="30" class="d-inline-block align-text-top center-cropped circle">
                    <span class="ms-2 fw-medium">${user.name} ${user.surname}</span><span class="ms-2 fw-small">joined the chat</span>
                </div>
                <div class="fw-light" style="font-size: small;">
                    <span class="right-aligned">${message_time}</span>
                </div>`;

    node.querySelector('div[user_info]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(user.id);
    });

    return node;
}

function get_chat_user_left (user, message_time) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble-alert', 'chat-bubble-start', 'bg-danger-subtle', 'text-dark');
    node.innerHTML = `
                <div user_info class="center-aligned clickable">
                    <img logged_img src="../uploads/users/${user.id}/profile_pic/profile_pic.jpeg" width="30" height="30" class="d-inline-block align-text-top center-cropped circle">
                    <span class="ms-2 fw-medium">${user.name} ${user.surname}</span><span class="ms-2 fw-small">left the chat</span>
                </div>
                <div class="fw-light" style="font-size: small;">
                    <span class="right-aligned">${message_time}</span>
                </div>`;

    node.querySelector('div[user_info]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(user.id);
    });

    return node;
}

function get_deleted_auction_chat_node (message_time) {
    const node = document.createElement('div');
    node.classList.add('chat-bubble-alert', 'chat-bubble-start', 'bg-danger', 'text-dark');
    node.innerHTML = `
                <div>
                    <span class="fw-medium">This auction has been cancelled by the author!</span>
                </div>
                <div class="fw-light" style="font-size: small;">
                    <span class="right-aligned">${message_time}</span>
                </div>`;

    return node;
}

function get_user_feedback_row_node (feedback) {

    let stars = '';
    for (let i=0; i<Number(feedback.star_value); i++) {
        stars += '★';
    }

    const node = document.createElement('div');
    node.setAttribute('feedback_id', feedback.id);
    node.classList.add('container', 'clickable', 'hover-shadow', 'p-1', 'mt-2','bg-white');
    node.innerHTML = `
            <div class="w-100 d-flex flex-column flex-md-row align-items-center">
                <div class="text-center text-md-start">
                    <img user_img src="../uploads/users/${feedback.id_sender}/profile_pic/profile_pic.jpeg" width="40" height="40" class="center-cropped circle mb-3 mb-md-0">
                </div>
                <div class="ms-md-3 text-center text-md-start">
                    <span class="fs-6 text fw-semibold" name_surname>${feedback.user_name} ${feedback.user_surname}</span>
                    <span>reviewed with</span>
                    <span class="fs-6 text fw-semibold text-warning-emphasis" stars>${stars}</span>
                    <span>on</span>
                    <span class="fs-6 text fw-semibold text-warning-emphasis">${date_to_locale(feedback.timestamp)}</span>
                </div>

            </div>
            <div class="text-md-start mt-1 ps-2 pe-2">
                <span class="fs-6 text" feedback>${feedback.feedback}</span>
            </div>`;

    node.addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(feedback.id_sender);
    });

    return node;
}

function get_preview_auction_row_node (auction) {
    const node = document.createElement('div');
    node.classList.add('p-2', 'd-inline-block', 'm-3', 'fs-7');
    node.setAttribute('auction_id', auction.id);
    node.style.width = "210px";
    node.style.height = "320px";

    node.innerHTML = `
        <div user_info class="d-flex align-items-center clickable">
            <img src="../uploads/users/${auction.id_owner}/profile_pic/profile_pic.jpeg" width="30" height="30" class="d-inline-block align-text-top center-cropped circle">
            <span class="ms-2 text-nowrap text-truncate">${auction.owner_name} ${auction.owner_surname}</span>
        </div>
        <div auction_info class="clickable">
            <div class="mt-2" style="width: 210px; height: 320px;">
                <img src="../uploads/auctions/${auction.id}/images/1.jpeg" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="mt-2 text-nowrap">
                <span class="text d-block text-truncate fw-medium">${auction.name}</span>
                <span class="text d-block text-truncate"> <span class="text-success" actual_price>${EURO_SYM}${auction.actual_price}</span> (from ${EURO_SYM}${auction.starting_price})</span>
                <span class="text d-block text-truncate"><span status_name>${auction.status_name}</span> ${auction.end_time}</span>
            </div>
        </div>`;

    set_auction_status_color(auction.id_status, node.querySelector('span[status_name]'))

    node.querySelector('div[user_info]').addEventListener('click', () => {
        open_panel(user_profile_panel);
        prepare_user_profile_panel(auction.id_owner);
    });

    node.querySelector('div[auction_info]').addEventListener('click', () => {
        hide_element(global_danger_alert_box);
        hide_element(global_success_alert_box);
        for (page of pages) {
            hide_element(page);
        }
        show_element(page_single_auction);

        get_single_auction(auction.id);
    });

    return node;
}

function update_global_compact_auction (auction) {
    const node = others_auctions_compact.querySelector(`div[auction_id="${auction.id}"]`);

    if (node) {
        node.querySelector('span[actual_price]').innerHTML = EURO_SYM + auction.actual_price;
    }
}

function update_favorite_compact_auction (auction) {
    const node = favorite_auctions.querySelector(`div[auction_id="${auction.id}"]`);

    if (node) {
        node.querySelector('span[actual_price]').innerHTML = EURO_SYM + auction.actual_price;
    }
}

function reload_page () {
    window.location.reload(true);
}

function get_notification_message(id_type, self, content) {
    switch (Number(id_type)) {
        case 1: // Auction won
            if (self) {
                return `Congratulations! You've won the auction for <span class="fw-medium">${content.auction_name}</span> with a final bid of <span class="fw-medium">${EURO_SYM}${content.max_bid_value}</span>`;
            } else {
                return `User <span class="fw-medium">${content.bidder_name} ${content.bidder_surname}</span> has won the auction for <span class="fw-medium">${content.auction_name}</span> with a final bid of <span class="fw-medium">${EURO_SYM}${content.max_bid_value}</span>`;
            }

        case 2: // Auction lost
            if (self) {
                return `Unfortunately, you've lost the auction for <span class="fw-medium">${content.auction_name}</span>`;
            } else {
                return `User ${content.user_name} has lost the auction for <span class="fw-medium">${content.auction_name}</span>`;
            }

        case 3: // Auction cancelled
            if (self) {
                return `You have cancelled the auction for <span class="fw-medium">${content.auction_name}</span>`;
            } else {
                return `The auction for <span class="fw-medium">${content.auction_name}</span> has been cancelled`;
            }

        case 4: // New bid
            if (self) {
                return `User <span class="fw-medium">${content.max_bid_user_name} ${content.max_bid_user_surname}</span> placed a new bid of <span class="fw-medium">${EURO_SYM}${content.max_bid_value}</span> on <span class="fw-medium">${content.auction_name}</span>`;
            } else {
                return `User <span class="fw-medium">${content.max_bid_user_name} ${content.max_bid_user_surname}</span> placed a new bid of <span class="fw-medium">${EURO_SYM}${content.max_bid_value}</span> on <span class="fw-medium">${content.auction_name}</span>`;
            }

        case 5: // New auction added
            if (self) {
                return `You have successfully added a new auction: <span class="fw-medium">${content.auction_name}</span>. Now you have to wait for a Moderator response`;
            } else {
                return `User ${content.user_name} has added a new auction: <span class="fw-medium">${content.auction_name}</span>`;
            }

        case 6: // Auction accepted
            if (self) {
                return `Your auction <span class="fw-medium">${content.auction_name}</span> has been accepted and is now live`;
            } else {
                return `User ${content.user_name}'s auction <span class="fw-medium">${content.auction_name}</span> has been accepted and is now live`;
            }

        case 7: // Auction denied
            if (self) {
                return `Your auction <span class="fw-medium">${content.auction_name}</span> has been denied`;
            } else {
                return `User ${content.user_name}'s auction <span class="fw-medium">${content.auction_name}</span> has been denied`;
            }

        case 8: // New rating
            if (self) {
                return `You have received a new rating of <span class="fw-medium">${content.new_rating}/5★</span>: "<span class="fw-medium">${content.feedback}</span>"`;
            } else {
                return `User ${content.user_name} has received a new rating for <span class="fw-medium">${content.auction_name}</span>`;
            }

        case 9: // Rating updated
            if (self) {
                return `Someone updated his/her rating with <span class="fw-medium">${content.new_rating}/5★</span>: "<span class="fw-medium">${content.feedback}</span>"`;
            } else {
                return `User ${content.user_name} has updated their rating for <span class="fw-medium">${content.auction_name}</span>`;
            }

        case 10: // Email changed
            if (self) {
                return `You have successfully changed your email address`;
            } else {
                return `User ${content.user_name} has changed their email address`;
            }

        case 11: // Password changed
            if (self) {
                return `You have successfully changed your password`;
            } else {
                return `User ${content.user_name} has changed their password`;
            }

        case 12: // Auction ended
            if (self) {
                return `Your auction for <span class="fw-medium">${content.auction_name}</span> has ended`;
            } else {
                return `The auction for <span class="fw-medium">${content.auction_name}</span> has ended`;
            }

        default:
            return "Unknown notification type.";
    }
}


function get_notification_row_node (notification) {
    const message = get_notification_message(notification.notification_id_type, notification.self, JSON.parse(notification.content));

    const node = document.createElement('div');
    node.classList.add('container', 'w-100', 'd-flex', 'flex-column', 'flex-md-row', 'align-items-center', 'hover-shadow', 'm-3', 'p-3');
    node.innerHTML = `
                <div class="text-center text-md-start">
                    <img user_img src="assets/imgs/auction_status_${notification.notification_id_type}.png" width="40" height="40" class="center-cropped circle mb-3 mb-md-0">
                </div>
                <div class="ms-md-3 text-center text-md-start w-75 text-break">
                    <span type_name class="fs-6 fw-medium text-break">${notification.notification_type_name}</span><span time class="fs-6 fw-light ms-3">${date_to_locale(notification.timestamp)}</span><br>
                    <span content class="fs-6 fw-normal text-break">${message}</span><br>
                </div>`;

    return node;
}

