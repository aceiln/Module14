async function addArticleHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#articleTitle').value.trim();
    const content = document.querySelector('articleContent').value.trim();

    if (title && content) {
        const response = await fetch('/api/articles/new', {
            method: 'POST',
            body: JSON.stringify({ articleTitle: title, articleContent: content }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log(response);
            document.location.replace('/dashboard');
        } else {
            alert('Failed, response: ' + response.statusText);
        }
    }
};

document.querySelector('.new-article-form').addEventListener('submit', addArticleHandler)