function create_pagination_node (pages_number = 2, parent_node, function_to_use) {
    const pagination_node = get_pagination_node();

    add_page_pagination_node(pagination_node, Number(1), function_to_use);

    for (let i=2; i<=pages_number; i++) {
        add_page_pagination_node(pagination_node, Number(i), function_to_use);
    }

    parent_node.innerHTML = '';
    parent_node.appendChild(pagination_node);
}

function get_pagination_node () {
    const node = document.createElement('ul');
    node.classList.add('pagination', 'justify-content-center');
    return node;
}

function add_page_pagination_node (pagination_node, page_number, function_to_use) {

    const node = document.createElement('li');
    node.classList.add('page-item', 'clickable');
    node.setAttribute('page-number', page_number);

    if (page_number == 1) {
        node.classList.add('active');
    }

    node.innerHTML = `
            <a class="page-link">${page_number}</a>`;

    node.addEventListener('click', async () => {
        const res_length = await function_to_use(page_number);
        let more_pages_needed = true;
        if (!res_length || (res_length && res_length < 5)) {
            more_pages_needed = false;
        }

        if (!more_pages_needed) {
            node.className = 'page-item active clickable';
            const prev_node = pagination_node.querySelector(`li.page-item[page-number="${Number(page_number-1)}"]`);
            if (prev_node) {
                prev_node.className = 'page-item clickable';
            }

            const next_node = pagination_node.querySelector(`li.page-item[page-number="${Number(page_number+1)}"]`);
            if (next_node) {
                next_node.className = 'page-item clickable';
            }

            show_live_toast("No more results found for page " + page_number);
            return;
        }

        if (page_number == 1) {
            remove_all_paginations_page(pagination_node);
            for (let i=page_number; i<page_number+2; i++) {
                add_page_pagination_node(pagination_node, i, function_to_use);
            }
            
            node.className = 'page-item active clickable';
        }
        
        if (page_number >= 2 && page_number < 4) {
            if (!pagination_node.querySelector(`li.page-item[page-number="${Number(page_number+1)}"]`)) {
                add_page_pagination_node(pagination_node, Number(page_number+1), function_to_use);
            }
            pagination_node.querySelector(`li.page-item[page-number="${Number(page_number+1)}"]`).className = 'page-item clickable';
            node.className = 'page-item active clickable';
            
            const prev_node = pagination_node.querySelector(`li.page-item[page-number="${Number(page_number-1)}"]`);
            if (prev_node) {
                prev_node.className = 'page-item clickable';
            }

            const points_node = pagination_node.querySelector(`li.page-item[page-points-start]`);
            if (points_node) {
                points_node.remove();

                for (let i=page_number; i<page_number+3; i++) {
                    remove_page_from_pagination_node(pagination_node, i);
                }

                for (let i=2; i<5; i++) {
                    add_page_pagination_node(pagination_node, i, function_to_use);
                }

                pagination_node.querySelector(`li.page-item[page-number="${page_number}"]`).className = 'page-item active clickable';
            }

        }

        if (page_number >= 4) {
            if (!pagination_node.querySelector(`li.page-item[page-number="${Number(page_number+1)}"]`)) {
                add_start_points_pagination_node(pagination_node);
                remove_page_from_pagination_node(pagination_node, Number(page_number-2));
                add_page_pagination_node(pagination_node, Number(page_number+1), function_to_use);
            }
            node.className = 'page-item active clickable';
            pagination_node.querySelector(`li.page-item[page-number="${Number(page_number+1)}"]`).className = 'page-item clickable';

            const prev_node = pagination_node.querySelector(`li.page-item[page-number="${Number(page_number-1)}"]`);
            if (!prev_node) {
                for (let i=page_number; i<page_number+3; i++) {
                    remove_page_from_pagination_node(pagination_node, i);
                }

                for (let i=page_number-1; i<page_number+2; i++) {
                    add_page_pagination_node(pagination_node, i, function_to_use);
                }

                pagination_node.querySelector(`li.page-item[page-number="${page_number}"]`).className = 'page-item active clickable';
            } else {
                prev_node.className = 'page-item clickable';
            }
        }

    });

    pagination_node.appendChild(node);
}

function add_start_points_pagination_node (pagination_node) {

    if (pagination_node.querySelector('li.page-item[page-points-start]')) {
        return;
    }

    const node = document.createElement('li');
    node.classList.add('page-item');
    node.setAttribute('page-points-start', '');

    node.innerHTML = `
            <a class="page-link">...</a>`;

    add_node_after_another(node, pagination_node.querySelector('li.page-item[page-number="2"]'));
    //pagination_node.appendChild(node);
}

function remove_page_from_pagination_node (pagination_node, page_number) {
    pagination_node.querySelector(`li.page-item[page-number="${page_number}"]`).remove();
}

function remove_all_paginations_page (pagination_node) {
    pagination_node.innerHTML = '';
}