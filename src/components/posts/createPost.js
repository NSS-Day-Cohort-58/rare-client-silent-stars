import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./createPost.css"


export const PostForm = () => {
    const [newPost, updateNewPost] = useState({
        user_id: 0,
        category_id: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: false
    })
    const [postTag, updatePostTag] = useState({
        post_id: 0,
        tag_id: 0
    })
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [chosenTags, setChosenTags] = useState(new Set())
    const newDate = new Date()
    const month = newDate.getUTCMonth() + 1
    const date = newDate.getUTCDate()
    const year = newDate.getUTCFullYear()
    const today = year + "-" + month + "-" + date

    const navigate = useNavigate()
    const localFireHawksUser = localStorage.getItem("auth_token")
    const fireHawksUserObject = JSON.parse(localFireHawksUser)

    const getPosts = () => {
        return fetch(`http://localhost:8000/posts`)
            .then(res => res.json())
    }
    const getCategories = () => {
        return fetch(`http://localhost:8000/categories`)
            .then(res => res.json())
    }
    const getTags = () => {
        return fetch(`http://localhost:8000/tags`)
            .then(res => res.json())
    }

    const getNewPost = () => {
        getPosts()
            .then((newPostArray) => {
                updateNewPost(newPostArray)
            })
            .then(navigate('/posts'))
    }

    useEffect(() => {
        getCategories()
            .then((categoriesArray) => {
                setCategories(categoriesArray)
            })
    }, []
    )

    useEffect(() => {
        getTags()
            .then((tagsArray) => {
                setTags(tagsArray)
            })
    }, []
    )
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
            user_id: fireHawksUserObject,
            category_id: categoryId,
            title: newPost.title,
            publication_date: today,
            image_url: newPost.image_url,
            content: newPost.content,
            approved: false
        }

        fetch(`http://localhost:8000/posts`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)
        })
            .then(response => response.json())
            .then(parsedResponse => {
                TagPost(parsedResponse)
            })
            .then(() => {
                getNewPost()
            })


    }

    return (
        <form className="postForm">
            <h2 className="postForm__title"><u>Create A Post</u></h2>
            <div className="wholePostForm">
                <fieldset>
                    <div className="formSections">
                        <label htmlFor="title"><b id="name">Title:</b></label>
                        <input
                            required autoFocus
                            type="text"
                            className="postTitle"
                            placeholder="Post Title"
                            value={newPost.title}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPost }
                                    copy.title = evt.target.value
                                    updateNewPost(copy)
                                }

                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="formSections">
                        <label htmlFor="image"><b id="name">Image:</b></label>
                        <input
                            required autoFocus
                            type="text"
                            className="postImage"
                            placeholder="Image"
                            value={newPost.image_url}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPost }
                                    copy.image_url = evt.target.value
                                    updateNewPost(copy)
                                }

                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="formSections">
                        <label htmlFor="content"><b id="name">Content:</b></label>
                        <input
                            required autoFocus
                            type="textarea"
                            className="postContent"
                            placeholder="Content"
                            value={newPost.content}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPost }
                                    copy.content = evt.target.value
                                    updateNewPost(copy)
                                }

                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="formSections">
                        <label htmlFor="category"><b id="name">Category:  </b></label>
                        <select className="dropDown"
                            onChange={(evt) => {
                                setCategoryId(parseInt(evt.target.value))
                            }}
                        >
                            <option value={0}><b>Select Category</b></option>
                            {
                                categories.map(categorie => {
                                    return <option value={categorie.id}><b>{categorie.label}</b></option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="formSections">
                    <h2 className="tagsTitle"><b>Choose Tags: </b></h2>
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
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="submit">
                    <b>Submit Post</b>
                </button>
            </div>
        </form>
    )
}