export const getAllCategories = () => {
    return fetch(`http://localhost:8088/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rareUser")}`
        }
    })
        .then(response => response.json())
}