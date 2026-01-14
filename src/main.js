
import i18next from 'i18next'
import {string} from "yup";

let listRssUrls = []


export default () => {
    const form = document.querySelector('form')
    const urlInput = document.querySelector('#url-input')
    const feedback = document.querySelector('.feedback')
    urlInput.focus()

    const schema = string().url().required()

    form.addEventListener('submit',  (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const rawRssUrl = formData.get('url')
        schema.validate(rawRssUrl)
            .then(() => {
            if (listRssUrls.includes(rawRssUrl)) {
                feedback.classList.replace("text-success", "text-danger")
                feedback.textContent = 'RSS уже существует'
                throw new Error('RSS уже существует')
            }
            listRssUrls.push(rawRssUrl)
            form.reset()
            urlInput.focus()
            feedback.textContent = 'RSS успешно загружен'
            feedback.classList.replace("text-danger", "text-success")
        })
        .catch((error) => {
            if (error.message === 'RSS уже существует') {
                return
            }
            feedback.classList.replace("text-success", "text-danger")
            feedback.textContent = 'Ссылка должна быть валидным URL'
        })

    })
}


fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent('https://wikipedia.org')}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then(data => console.log(data.contents));