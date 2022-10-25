import { useEffect, useState } from "react"


import { Post } from "./post";
export const MyPosts = ({ searchTermState }) => {


    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const localFireHawksUser = localStorage.getItem("auth_token")
    const FireHawksUserObject = JSON.parse(localFireHawksUser)




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
    useEffect(
        () => {
            const myPosts = posts.filter(post => post.user_id === FireHawksUserObject)

            setFilteredPosts(myPosts)
        },
        [posts]
    )

    const refresh = () => {
        return window.location.reload(false);
    }


    return <>

        <h2>My Posts</h2>


        <article>
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


        </article>
    </>
}



