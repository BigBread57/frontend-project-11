

export const renderPosts = (elements, state) => {
    elements.posts.innerHTML = `
    <div class="col-md-10 col-lg-8 order-1 mx-auto posts">
    <div class="card border-0">
        <div class="card-body"><h2 class="card-title h4">Посты</h2></div>
        <ul class="list-group border-0 rounded-0">
            ${
        state.rssPosts.map((post) => (
            `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"><a
                            href=${post.link} class="fw-bold" data-id="34" target="_blank"
                            rel="noopener noreferrer">${post.title}</a>
                        <button type="button" 
                        class=${state.rssReadPosts ? "btn btn-outline-primary btn-sm" : "btn btn-outline-primary btn-sm"}
                        data-id="${post.id} data-bs-toggle="modal"
                                data-bs-target="#modal">Просмотр
                        </button>
                    </li>`
        )).join('')
    }
        </ul>
    </div>
       
    `
}
