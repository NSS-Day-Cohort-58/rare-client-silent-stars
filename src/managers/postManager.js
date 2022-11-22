export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(response => response.json())
}

export const getPostById = (id) => {
    return fetch (`http://localhost:8000/posts/${id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
    })
        .then(response => response.json())
}

export const deletePost = (post) => {
    return fetch (`http://localhost:8000/posts/${post.id}`,{
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
}