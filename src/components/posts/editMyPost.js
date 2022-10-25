import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export const PostEdits = () => {
    const [post, update] = useState({
        category_id: 0,
        title: "",
        image_url: "",
        content: "",
        publication_date: "",
        approved: ""


    })
    const navigate = useNavigate()
    const { postId } = useParams()
    const [category, updateCategory] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8088/posts/${postId}`)
            .then(response => response.json())
            .then((postObject) => {
                update(postObject)
            })
    }, [postId])
    useEffect(() => {
        fetch(`http://localhost:8088/categories`)
            .then(response => response.json())
            .then((postObject) => {
                updateCategory(postObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const postToSendToAPI = {
            category_id: parseInt(post.category_id),
            user_id: parseInt(post.user_id),
            title: post.title,
            image_url: post.image_url,
            content: post.content,
            publication_date: post.publication_date,
            approved: parseInt(post.approved)
        }
        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)
        })

            .then(() => {
                navigate(`/posts/${postId}`)
            })
    }

    return (

        <form className="profile">


            <h2 className="profile__title">Edit Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={post.title}
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.title = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Photo URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={post.image_url}
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.image_url = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Content:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={post.content}
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.content = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Category:</label>
                    <select type="number" key={`category--${category.id}`}
                        value={post.category_id}
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.category_id = evt.target.value
                                update(copy)
                            }
                        } >
                        {category.map(categorie => {
                            return <option value={categorie.id} key={`category--${categorie.id}`}> {categorie.label}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <Button
                variant="outline-warning"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">

                Save Post Edit
            </Button>

        </form>
    )

}