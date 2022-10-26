import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import "./postDetails.css"

export const PostDetails = () => {
    const navigate = useNavigate()
    const [post, setPosts] = useState({})
    const { postId } = useParams()
    useEffect(
        () => {

            fetch(`http://localhost:8088/posts/${postId}`)
                .then(response => response.json())
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        [postId]
    )


    return <>
        <h2 className="postDetails">Post Details</h2>
        <article key={`post--${post.id}`} className="postDeets">
            <Button size="sm" variant="primary" onClick={() => navigate(`/posts`)} >All posts</Button>
            <div id="deets">
            <h2 id="postTitle"><u>{post.title}</u></h2>
            <div><u>Created by:</u> {post?.user?.first_name} {post?.user?.last_name}</div>
            <div><u>Category:</u> {post?.category?.label} </div>
            <div><u>Publication date:</u> {post.publication_date}</div>
            <div><u>Content:</u> {post.content} </div>
            </div>
            <Button size="sm" variant="warning" onClick={() => navigate(`/posts/${postId}/comment`)} >Comments</Button>
        </article>
    </>
}