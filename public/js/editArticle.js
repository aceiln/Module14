async function editArticleHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#articleTitle').value.trim();
    const content = document.querySelector('articleContent').value.trim();

    const id = event.target.getAttribute('data-id');
    const response = await fetch ('/api/article/edit/${id', {
        method: 'PUT',
        body: JSON.stringify({
            articleTitle: title,
            articleID: id,
            articleContent: content,
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed. Response status: ' + response.statusText)
    }
};

document.querySelector('form[action^="/api/article/edit/"]').addEventListener('submit', editArticleHandler);