export const getAllCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rareUser")}`
        }
    })
        .then(response => response.json())

    }

export const createCategory = (category) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("rareUser")}`
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
