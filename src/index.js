/* global document */
import './style.css'
import i18next from "i18next";
import ru from "../locales/ru.js";
import en from "../locales/en.js";
import onChange from "on-change";
import {validate} from "./validate.js";
import {watcher} from "./watcher.js";
import {staticText} from "./render/static-text.js";
import {renderPosts} from "./render/posts.js";
import {renderFeeds} from "./render/feeds.js";

const index = () => {
    i18next.init({
        lng: 'ru', // if you're using a language detector, do not define the lng option
        debug: true,
        resources: {
            ru, en,
        }
    }).then(function (t) {
        const elements = {
            form: document.querySelector('form'),
            urlInput: document.querySelector('#url-input'),
            feedback: document.querySelector('.feedback'),
            posts: document.querySelector('.posts'),
            feeds: document.querySelector('.feeds'),
            lead: document.querySelector('.lead'),
            urlInputLabel: document.querySelector('label'),
            title: document.querySelector('#title'),
            example: document.querySelector('#example'),
            addUrlRss: document.querySelector('#add-url-rss'),
        }

        const state = +{
            rssReadPosts: [],
            listRssUrls: [
                'https://lorem-rss.hexlet.app/feed'
            ],
            rssPosts: [
    {
        "title": "Lorem ipsum 2026-01-15T10:14:00Z",
        "description": "Cillum fugiat ullamco irure dolor enim occaecat non.",
        "link": "http://example.com/test/1768472040",
        "isRead": false,
        "id": 1
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:13:00Z",
        "description": "Nulla deserunt nisi fugiat non pariatur mollit cupidatat ut do.",
        "link": "http://example.com/test/1768471980",
        "isRead": false,
        "id": 2
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:12:00Z",
        "description": "Occaecat nulla proident aliquip sunt et nisi id consequat.",
        "link": "http://example.com/test/1768471920",
        "isRead": false,
        "id": 3
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:11:00Z",
        "description": "Nostrud exercitation irure veniam officia eu et minim velit anim occaecat aliquip enim.",
        "link": "http://example.com/test/1768471860",
        "isRead": false,
        "id": 4
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:10:00Z",
        "description": "Sint sit dolore sint do et ullamco magna commodo mollit irure.",
        "link": "http://example.com/test/1768471800",
        "isRead": false,
        "id": 5
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:09:00Z",
        "description": "Cupidatat adipisicing nostrud reprehenderit Lorem est fugiat.",
        "link": "http://example.com/test/1768471740",
        "isRead": false,
        "id": 6
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:08:00Z",
        "description": "Veniam magna laborum eiusmod labore elit.",
        "link": "http://example.com/test/1768471680",
        "isRead": false,
        "id": 7
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:07:00Z",
        "description": "Et enim laborum aliqua nulla.",
        "link": "http://example.com/test/1768471620",
        "isRead": false,
        "id": 8
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:06:00Z",
        "description": "Reprehenderit ea laboris fugiat ad reprehenderit ad non elit fugiat aliqua ad duis occaecat.",
        "link": "http://example.com/test/1768471560",
        "isRead": false,
        "id": 9
    },
    {
        "title": "Lorem ipsum 2026-01-15T10:05:00Z",
        "description": "Aliquip proident elit commodo non Lorem veniam eiusmod culpa cillum nostrud ea mollit.",
        "link": "http://example.com/test/1768471500",
        "isRead": false,
        "id": 10
    }
],
            rssFeeds: [
    {
        "title": "Lorem ipsum feed for an interval of 1 minutes with 10 item(s)",
        "description": "This is a constantly updating lorem ipsum feed",
        "url": "https://lorem-rss.hexlet.app/feed"
    }
],
            increment: 1,
        }
        const watchedObject = watcher(state, elements)
        staticText(elements);
        validate(watchedObject, elements);
        renderPosts(elements, watchedObject)
        renderFeeds(elements, watchedObject)
    })
}

index()