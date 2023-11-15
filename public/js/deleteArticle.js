async function deleteArticleHandler(event) {
event.preventDefault();
 const id = event.target.getAttribute('data-id');
 const response = await fetch('/api/article/${id}', {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'}
 });
 if (response.ok) {
    document.location.replace('/dashboard');
 } else {
    alert('Failed. Response status: ' + response.statusText);
 }
};

document.querySelector('.delete-btn').addEventListener('click', deleteArticleHandler);
