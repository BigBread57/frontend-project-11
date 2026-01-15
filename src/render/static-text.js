import i18next from "i18next";

export const staticText = (elements) => {
    elements.urlInputLabel.textContent = i18next.t('static.urlInputLabel')
    elements.title.textContent = i18next.t('static.title')
    elements.lead.textContent = i18next.t('static.lead')
    elements.example.textContent = i18next.t('static.example')
    elements.addUrlRss.textContent = i18next.t('static.addUrlRss')
}