export const getAllCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rareUser")}`
        }
    })
        .then(response => response.json())

    }