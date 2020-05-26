function onLoad() {
    loadSuggestions();
    addEventListeners();
}

function addEventListeners() {
    const input_comment = document.body.querySelector('.comment-form input');
    document.body.querySelector('.comment-form button').addEventListener('click', e => {
        e.preventDefault();
        addComment(input_comment.value, "You")
    });

    const
        hearts = document.body.querySelector('.hearts'),
        claps = document.body.querySelector('.claps');

    hearts.addEventListener('click', () => {
        let heart_count = document.body.querySelector('.hearts .heart_count');

        let heart_count_value = heart_count.getAttribute('data-heart-count');

        heart_count_value = parseInt(heart_count_value) + 1;

        heart_count.setAttribute('data-heart-count', heart_count_value);
        heart_count.innerHTML = formatNumber(heart_count_value);

        const s = hearts.querySelector('span');

        s.classList.remove('animate');
        window.requestAnimationFrame(() => {
            s.classList.add('animate');
        });
    });

    claps.addEventListener('click', () => {
        let clap_count = document.body.querySelector('.claps .clap_count');

        let clap_count_value = clap_count.getAttribute('data-clap-count');

        clap_count_value = parseInt(clap_count_value) + 1;

        clap_count.setAttribute('data-clap-count', clap_count_value);
        clap_count.innerHTML = formatNumber(clap_count_value);

        const s = claps.querySelector('span');

        s.classList.remove('animate');
        window.requestAnimationFrame(() => {
            s.classList.add('animate');
        });
    });

}

function loadSuggestions() {
    const suggestions_list = document.querySelector('.suggestions ul');

    for(let i = 0; i < 7; i++) {

        const list_item = document.createElement('li');
        list_item.innerHTML = comment_suggestions[i];

        list_item.addEventListener('click', () => addComment(comment_suggestions[i], "You"));

        suggestions_list.appendChild(list_item);
    }

}

function addComment(user_comment, user_name) {

    if(user_comment == "") {
        return;
    }

    const comment = document.createElement('div');
    comment.classList.add('comment');

    comment.innerHTML = `
        <span class="user_name">${user_name}</span>
        <span class="user_comment">${user_comment}</span>
    `;

    document.querySelector('.comments').appendChild(comment);
    comment.scrollIntoView({block: "end", behavior: "smooth"});
}

function formatNumber(number) {
    if(number > 999 && number < 1000000){

        return (number/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    }
    else if(number > 1000000){

        return (number/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    }
    else if(number < 900){

        return number; // if value < 1000, nothing to do
    }
}

setInterval(() => {

    let
        viewers_count = document.body.querySelector('.viewers .viewers_count'),
        viewers_count_value = viewers_count.getAttribute('data-viewers-count');

    viewers_count_value = parseInt(viewers_count_value) + Math.floor(Math.random() * 500);

    viewers_count.setAttribute('data-viewers-count', viewers_count_value);
    viewers_count.innerHTML = formatNumber(viewers_count_value);
}, 2000);

setInterval(() => {
    addComment(
        comment_suggestions[Math.floor(Math.random() * comment_suggestions.length)],
        user_names[Math.floor(Math.random() * user_names.length)]
    )

}, 5000);
