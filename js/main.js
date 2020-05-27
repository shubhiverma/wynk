"use strict";

if(typeof window != 'undefined') {
    window.addEventListener('DOMContentLoaded',  () => (new WynkLive()).load());
}

class WynkLive {

    constructor() {
        this.container = document.body.querySelector('.container');
    }

    load() {
        this.loadSuggestions();
        this.addEventListeners();
        this.manageTraffic();
    }

    loadSuggestions() {
        const suggestions_list = document.createElement('ul');

        for(let i = 0; i < 7; i++) {

            const list_item = document.createElement('li');
            list_item.innerHTML = comment_suggestions[i];

            list_item.addEventListener('click', () => this.addComment(comment_suggestions[i], "You"));

            suggestions_list.appendChild(list_item);
        }

        this.container.querySelector('.suggestions').appendChild(suggestions_list);
    }

    addEventListeners() {
        const comment_form = this.container.querySelector('.comment-form');
        comment_form.addEventListener('submit', e => {
            e.preventDefault();
            this.addComment(comment_form.comment.value, "You");
            comment_form.reset();
        });

        const
            hearts = this.container.querySelector('.hearts'),
            claps = this.container.querySelector('.claps');

        hearts.addEventListener('click', () => {
            let heart_count = hearts.querySelector('.heart_count');

            let heart_count_value = heart_count.dataset.heartCount;

            heart_count_value = parseInt(heart_count_value) + 1;

            heart_count.dataset.heartCount = heart_count_value;
            heart_count.innerHTML = this.formatNumber(heart_count_value);

            const span = hearts.querySelector('span');

            span.classList.remove('animate');
            window.requestAnimationFrame(() => {
                span.classList.remove('animate');
                span.classList.add('animate');
            });
        });

        claps.addEventListener('click', () => {
            let clap_count = claps.querySelector('.clap_count');

            let clap_count_value = clap_count.dataset.clapCount;

            clap_count_value = parseInt(clap_count_value) + 1;

            clap_count.dataset.clapCount = clap_count_value;
            clap_count.innerHTML = this.formatNumber(clap_count_value);

            const span = claps.querySelector('span');

            span.classList.remove('animate');
            window.requestAnimationFrame(() => {
                span.classList.remove('animate');
                span.classList.add('animate');
            });
        });
    }

    addComment(user_comment, user_name) {

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

    formatNumber(number) {
        if(number > 999 && number < 1000000){

            return (number/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
        }
        else if(number > 1000000){

            return (number/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
        }
        else {
            return number; // if value < 1000, nothing to do
        }
    }

    manageTraffic() {

        setInterval(() => {

            let
                viewers_count = this.container.querySelector('.viewers .viewers_count'),
                viewers_count_value = parseInt(viewers_count.dataset.viewersCount);

            viewers_count_value += Math.floor(Math.random() * 500);

            viewers_count.dataset.viewersCount = viewers_count_value;
            viewers_count.innerHTML = this.formatNumber(viewers_count_value || 0);
        }, 2000);

        setInterval(() => {
            this.addComment(
                comment_suggestions[Math.floor(Math.random() * comment_suggestions.length)],
                user_names[Math.floor(Math.random() * user_names.length)]
            )

        }, 3000);

        setInterval(() => {
            this.container.querySelector('.hearts').click();
        }, 6000);
    }
}
