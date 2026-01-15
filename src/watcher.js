import onChange from "on-change";
import {renderPosts} from "./render/posts.js";
import {renderFeeds} from "./render/feeds.js";


const watcherHandler = (state, elements) => (path) => {
    switch (path) {
        case 'rssPosts':
            renderPosts(elements, state);
            break;
        case 'rssFeeds':
            renderFeeds(elements, state);
            break;
        default:
            break;
    }
}


export const watcher = (state, elements) => onChange(state, watcherHandler(state, elements))
