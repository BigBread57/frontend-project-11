/* global document */
import './style.css'
import i18next from "i18next";
import ru from "../locales/ru.js";
import en from "../locales/en.js";
import onChange from "on-change";
import {validate} from "./validate.js";
import {watcher} from "./watcher.js";

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
        }

        const state = {
            listRssUrls: [],
            rssPosts: [],
            rssFeeds: [],
            increment: 1,
        }
        validate(state, elements);
        watcher(state, elements)
    })
}

index()