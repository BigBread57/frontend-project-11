export default () => {
  return {
    translation: {
      rss: {
        aggregator: 'RSS агрегатор',
        description: 'Начните читать RSS сегодня! Это легко, это красиво.',
        add: 'Добавить',
        example: 'Пример: https://lorem-rss.hexlet.app/feed',
      },
      form: {
        label: 'Ссылка RSS',
        notValidRssUrl: 'Ресурс не содержит валидный RSS',
        notValidUrl: 'Ссылка должна быть валидным URL',
        urlExists: 'RSS уже существует',
        urlSuccessLoad: 'RSS успешно загружен',

      },
      body: {
        posts: 'Посты',
        feeds: 'Фиды',
        view: 'Просмотр',
        viewAll: 'Читать полностью',
        close: 'Закрыть',
      },
      footer: {
        created: 'created by',
        url: 'Hexlet',
      },
    },
  }
}
