import { useEffect, useState } from "react"
import "./posts.css"

import { Post } from "./post";
export const Posts = ({ searchTermState }) => {


    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState(false)
    const [category, setCategory] = useState({
        id: (0),
        label: ""
    })
    const [users, setUsers] = useState([])
    const [user, setSelectedUser] = useState({
        id: (0),
    })
    const [postTags, setPostTags] = useState([])
    const [postTag, setPostTag] = useState({
        id: (0),
        post_id: ""
    })



    useEffect(
        () => {
            const searchedPosts = posts.filter(post => { return post.title.toLowerCase().startsWith(searchTermState.toLowerCase()) })

            setFilteredPosts(searchedPosts)
        },
        [searchTermState]
    )

    useEffect(
        () => {

            fetch(`http://localhost:8000/posts`)
                .then(response => response.json())
                .then((postsArray) => {
                    postsArray.sort(function (a, b) {
                        return new Date(b.publication_date) - new Date(a.publication_date);
                    });
                    setFilteredPosts(postsArray)
                })
        },
        []
    )
    useEffect(
        () => {

            fetch(`http://localhost:8000/posts`)
                .then(response => response.json())
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        []
    )

    useEffect(
        () => {

            fetch(`http://localhost:8000/categories`)
                .then(response => response.json())
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        []
    )

    useEffect(
        () => {

            fetch(`http://localhost:8000/users`)
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
        },
        []
    )
    useEffect(
        () => {

            fetch(`http://localhost:8000/postTags`)
                .then(response => response.json())
                .then((postTagsArray) => {
                    setPostTags(postTagsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const filteredByCategories = posts.filter(post => post.category_id === parseInt(category.id))
            setFilteredPosts(filteredByCategories)
        },
        [category]
    )
    useEffect(
        () => {
            const filteredByCategories = posts.filter(post => post.user_id === parseInt(user.id))
            setFilteredPosts(filteredByCategories)
        },
        [user]
    )
    useEffect(
        () => {
            const filteredByCategories = posts.filter(post => post.id === parseInt(postTag.post_id))
            setFilteredPosts(filteredByCategories)
        },
        [postTag]
    )

    return <>

        <h2 className="allPosts">All Posts</h2>
        <div className="dropdownMenus">
        <select id="description" value={category.id}
            onChange={(evt) => {
                const copy = { ...category }
                copy.id = evt.target.value
                setCategory(copy)
            }}
        >
            <option value={0}>Select the category to sort by</option>
            {
                categories.map(category => {
                    return <option key={`type--${category.id}`} value={category.id}>{category.label}</option>
                })
            }
        </select>
        <select id="description" value={user.id}
            onChange={(evt) => {
                const copy = { ...user }
                copy.id = evt.target.value
                setSelectedUser(copy)
            }}
        >
            <option value={0}>Select the User to sort by</option>
            {
                users.map(user => {
                    return <option key={`type--${user.id}`} value={user.id}>{user.first_name} {user.last_name}</option>
                })
            }
        </select>
        <select id="description" value={postTag.id}
            onChange={(evt) => {
                const copy = { ...postTag }
                copy.post_id = evt.target.value
                setPostTag(copy)
            }}
        >
            <option value={0}>Select the Tags to sort by</option>
            {
                postTags.map(postTag => {
                    return <option key={`type--${postTag.id}`} value={postTag.id}>{postTag?.tag?.label}</option>
                })
            }
        </select>
        </div>
        <article>
            <div className="postList">
            {
                filteredPosts.map(
                    (post) => <Post
                        id={post.id}
                        userId={post.userId}
                        category={post.category.label}
                        title={post.title}
                        publication_date={post.publication_date}
                        image_url={post.image_url}
                        content={post.content}
                        AuthorFirstName={post.user.first_name}
                        AuthorLastName={post.user.last_name}
                        key={`post--${post.id}`}


                    />
                    )
                }
                </div>


        </article>
    </>
}



