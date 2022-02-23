// const editPageHandler = async (event) => {
//     const response = await fetch('/dashboard/editPost', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application'}
//     })
//     document.location.replace('/editPost')
// }

const updateBlogHandler = async (event) => {
    event.preventDefault();
    console.log('this is the update Blog handler before the if statement');
    const topic = document.querySelector('#editTopic').value.trim();
    const content = document.querySelector('#editContent').value.trim();
    const id = parseInt(document.querySelector('#editTopic').dataset.set);

    if (content && topic) {
        const response = await fetch(`/api/blog_post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                topic,
                content
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert ('Failed to edit post');
        }
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', updateBlogHandler);