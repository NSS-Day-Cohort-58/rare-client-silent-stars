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

    const [postTag, updatePostTag] = useState({
        post_id: 0,
        tag_id: 0
    })
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const { postId } = useParams()
    const [category, updateCategory] = useState([])
    const [chosenTags, setChosenTags] = useState(new Set())

    const getTags = () => {
        return fetch(`http://localhost:8000/tags`)
            .then(res => res.json())
    }

    useEffect(() => {
        getTags()
            .then((tagsArray) => {
                setTags(tagsArray)
            })
    }, []
    )

    useEffect(() => {
        fetch(`http://localhost:8000/posts/${postId}`)
            .then(response => response.json())
            .then((postObject) => {
                update(postObject)
            })
    }, [postId])

    useEffect(() => {
        fetch(`http://localhost:8000/categories`)
            .then(response => response.json())
            .then((postObject) => {
                updateCategory(postObject)
            })
    }, [])

    const TagPost = (parsedResponse) => {
        chosenTags.forEach(tag => {
            const TagToAPI = {
                post_id: parsedResponse.id,
                tag_id: tag
            }
            fetch(`http://localhost:8000/postTags`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(TagToAPI)
            })
                .then(response => response.json())
        }
        )
    }

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

        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)
        })
            .then(
                TagPost(postId)
            )
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
            <fieldset>
                    <h2 className="tagsTitle"><b>Choose Tags: </b></h2>
                    <div className="formGroup">
                        {
                            tags.map((tag) => {
                                return <>
                                    <label htmlFor="addTags" className="tagLabel">{tag.label}</label>
                                    <input
                                        type="checkbox"
                                        className="addTags"
                                        value={false}
                                        onChange={(evt) => {

                                            const copy = new Set(chosenTags)
                                            if (copy.has(tag.id)) {
                                                copy.delete(tag.id)
                                            }
                                            else {
                                                copy.add(tag.id)
                                            }

                                            setChosenTags(copy)

                                        }}
                                    />
                                </>
                            })
                        }
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