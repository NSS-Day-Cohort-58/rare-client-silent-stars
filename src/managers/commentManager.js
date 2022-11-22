export const createComment = (comment) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("rareUser")}`
        },
        body: JSON.stringify(comment)
    })
        .then(response => response.json())
}