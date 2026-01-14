import {string} from "yup";
import i18next from "i18next";
import axios from "axios";

export const validate = (watchedState, elements) => {
    // eslint-disable-next-line no-undef
    const parser = new DOMParser()

    const schema = string().url().required()
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const rawRssUrl = formData.get('url')
        console.log(rawRssUrl)
        schema.validate(rawRssUrl)
            .then(() => {
                if (watchedState.listRssUrls.includes(rawRssUrl)) {
                    elements.feedback.classList.replace('text-success', 'text-danger')
                    elements.feedback.textContent = 'RSS уже существует'
                    throw new Error('RSS уже существует')
                }
            })
            axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${rawRssUrl}`)
                .then(function (response) {
                    let rssPosts = []
                    const xmlDoc = parser.parseFromString(response.toString(), "application/xml")
                    const isRss = xmlDoc.getElementsByTagName("rss")
                    if (isRss != null ) {
                        watchedState.listRssUrls.push(rawRssUrl)
                        elements.form.reset()
                        elements.urlInput.focus()
                        elements.feedback.textContent = i18next.t('form.urlExists')
                        elements.feedback.classList.replace('text-danger', 'text-success')
                        const items = xmlDoc.getElementsByTagName("item")
                        const channel = xmlDoc.getElementsByTagName("channel")
                        elements.rssChannels.push(
                            {
                                title: channel.getElementsByTagName("title")[0].textContent,
                                description: channel.getElementsByTagName("description")[0].textContent,
                            }
                        )

                        for (let i = 0; i < items.length; i++) {
                            const title = items[i].getElementsByTagName("title")[0].textContent
                            const description = items[i].getElementsByTagName("description")[0].textContent
                            const link = items[i].getElementsByTagName("link")[0].textContent
                            rssPosts.push(
                                {
                                    title,
                                    description,
                                    link,
                                    isRead: false,
                                    id: watchedState.increment,
                                }
                            )
                            watchedState.increment += 1
                        }
                        elements.rssPosts.push(...rssPosts)
                    }
                })
                .catch(() => {
                    elements.feedback.classList.replace('text-success', 'text-danger')
                    elements.feedback.textContent = i18next.t('form.netError')
                    throw new Error(i18next.t('form.netError'))
                })

            .catch((error) => {
                if (error.message === i18next.t('form.urlExists')) {
                    return
                }
                elements.feedback.classList.replace('text-success', 'text-danger')
                elements.feedback.textContent = i18next.t('form.notValidUrl')
            })
    })
}
