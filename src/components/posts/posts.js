import { useEffect, useState } from "react"


import { Post } from "./post";
export const Posts = ({ searchTermState }) => {


    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [category, setCategory] = useState([])
    const [selected, setSelected] = useState(false)



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

                posts.map(
                    (post) => <Post
                        userId={post.userId}
                        category_id={post.category_id}
                        title={post.title}
                        publication_date={post.publication_date}
                        image_url={post.image_url}
                        content={post.content}


                    />

                )
            }


        </article>
    </>
}



