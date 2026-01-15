import {string} from "yup";
import i18next from "i18next";
import axios from "axios";

export const validate = (watchedState, elements) => {
    // eslint-disable-next-line no-undef
    const parser = new DOMParser()

    console.log(123)
    const schema = string().url().required()

    elements.form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const rawRssUrl = formData.get('url')
        elements.feedback.classList.replace('text-danger', 'text-success')
        elements.feedback.textContent = ''

        schema.validate(rawRssUrl)
            .then(() => {
                if (watchedState.listRssUrls.includes(rawRssUrl)) {
                    elements.feedback.classList.replace('text-success', 'text-danger')
                    elements.feedback.textContent = 'RSS уже существует'
                    throw new Error('RSS уже существует')
                }
                return rawRssUrl
            })
            .then((rawRssUrl) => {
                return axios.get(`https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(rawRssUrl.trim())}`)
            })
            .then((response) => {
                const data = response.data
                const xmlDoc = parser.parseFromString(data.contents, "application/xml")

                // Проверяем на ошибки парсинга XML
                const parserError = xmlDoc.querySelector('parsererror')
                if (parserError) {
                    throw new Error('Ошибка парсинга RSS')
                }

                const isRss = xmlDoc.getElementsByTagName("rss")
                if (isRss.length === 0) {
                    throw new Error('Неверный RSS формат')
                }

                watchedState.listRssUrls.push(rawRssUrl)
                elements.form.reset()
                elements.urlInput.focus()
                elements.feedback.textContent = 'RSS успешно загружен'
                elements.feedback.classList.replace('text-danger', 'text-success')

                const items = xmlDoc.getElementsByTagName("item")
                const channels = xmlDoc.getElementsByTagName("channel")
                if (channels.length > 0) {
                    const channel = channels[0]
                    const channelTitle = channel.getElementsByTagName("title")[0]?.textContent || ''
                    const channelDescription = channel.getElementsByTagName("description")[0]?.textContent || ''

                    watchedState.rssFeeds.push({
                        title: channelTitle,
                        description: channelDescription,
                        url: rawRssUrl
                    })
                }

                const rssPosts = []
                for (let i = 0; i < items.length; i++) {
                    const item = items[i]
                    const title = item.getElementsByTagName("title")[0]?.textContent || ''
                    const description = item.getElementsByTagName("description")[0]?.textContent || ''
                    const link = item.getElementsByTagName("link")[0]?.textContent || ''
                    rssPosts.push({
                        title,
                        description,
                        link,
                        isRead: false,
                        id: watchedState.increment,
                    })
                    watchedState.increment += 1
                }

                watchedState.rssPosts.push(...rssPosts)
            })
            .catch((error) => {
                if (error.message === 'RSS уже существует') {
                    return // уже показали сообщение
                }

                elements.feedback.classList.replace('text-success', 'text-danger')

                if (error.name === 'ValidationError') {
                    elements.feedback.textContent = i18next.t('form.notValidUrl')
                } else if (error.message === 'Network Error' || !error.response) {
                    elements.feedback.textContent = i18next.t('form.netError')
                } else {
                    elements.feedback.textContent = i18next.t('form.generalError')
                }
            })

    })
}