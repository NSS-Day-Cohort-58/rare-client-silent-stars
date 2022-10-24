import { useEffect, useState } from "react"


import { Post } from "./post";
export const Posts = ({ searchTermState }) => {


    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [category, setCategory] = useState([])
    const [selected, setSelected] = useState(false)


    useEffect(
        () => {
            const searchedPosts = posts.filter(post => { return post.title.toLowerCase().startsWith(searchTermState.toLowerCase()) })

            setFilteredPosts(searchedPosts)
        },
        [searchTermState]
    )

    useEffect(
        () => {

            fetch(`http://localhost:8088/posts`)
                .then(response => response.json())
                .then((postsArray) => {
                    setFilteredPosts(postsArray)
                })
        },
        []
    )
    useEffect(
        () => {

            fetch(`http://localhost:8088/posts`)
                .then(response => response.json())
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        []
    )

    const refresh = () => {
        return window.location.reload(false);
    }


    return <>

        <h2>All Posts</h2>

        <article>
            {

                filteredPosts.map(
                    (post) => <Post
                        userId={post.userId}
                        category_id={post.category_id}
                        title={post.title}
                        publication_date={post.publication_date}
                        image_url={post.image_url}
                        content={post.content}
                        AuthorFirstName={post.user.first_name}
                        AuthorLastName={post.user.last_name}


                    />

                )
            }


        </article>
    </>
}



