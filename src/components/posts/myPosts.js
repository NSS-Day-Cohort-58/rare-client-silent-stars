import { useEffect, useState } from "react"
import { Post } from "./post";
import { getPosts, deletePost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";


export const MyPosts = ({ searchTermState }) => {


    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const navigate = useNavigate()
    const localRareUserObject = localStorage.getItem("rareUser")
    const RareUserObject = JSON.parse(localRareUserObject)




    useEffect(
        () => {
            getPosts().then(data => setPosts(data))
        },[])

    useEffect(
        () => {
            const myPosts = posts.filter(post => post.user_id === RareUserObject)

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
                    (post) => 
                        <>
                        <Post
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
                        <button className="button" onClick={() => {deletePost(post.id).then(() => navigate("/posts"))}}> Delete</button>
                        </>
                        )
                    }
        </article>
    </>
}



