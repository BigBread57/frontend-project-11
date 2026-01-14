/* global document */
import './style.css'
import i18next from "i18next";
import ru from "../locales/ru.js";
import en from "../locales/en.js";
import onChange from "on-change";
import {validate} from "./validate.js";

export default() => {
    i18next.init({
    lng: 'ru',
    resources: {
        ru,
        en,
    },
    })

    const elements = {
        form: document.querySelector('form'),
        urlInput: document.querySelector('#url-input'),
        feedback: document.querySelector('.feedback'),
        posts: document.querySelector('.posts'),
    }

    const state = {
        listRssUrls: [],
        rssPosts: [],
        rssChannels: [],
        increment: 1,
    }
    const watchedState = onChange(state, elements)
    validate(watchedState, elements);
}