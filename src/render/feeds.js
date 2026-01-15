export const renderFeeds = (elements, feeds) => {
    if (elements.posts.firstChild != null) {
        elements.posts.innerHTML = `
            <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
                <div class="card border-0">
                    <div class="card-body"><h2 class="card-title h4">Фиды</h2></div>
                    <ul class="list-group border-0 rounded-0">
                        ${
                            feeds.map(() => (
                                `        <li class="list-group-item border-0 border-end-0"><h3 class="h6 m-0">{ feed.title }</h3>
                            <p class="m-0 small text-black-50">{ feed.description }</p></li>`
                            )).join('')}
                                }
                
                    </ul>
                </div>
            </div>
        `
    }
}
