export const getAllTags = () => {
    return fetch(`http://localhost:8000/tags`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(response => response.json())

}

export const createTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(tag)
    })
        .then(response => response.json())
}


export const deleteTag = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("rare_token")}` },
    })
}