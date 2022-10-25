import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

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
        <article key={`post--${post.id}`}>
            <Button size="sm" variant="primary" onClick={() => navigate(`/posts`)} >All posts</Button>
            <h2>{post.title}</h2>
            <div>Created by: {post?.user?.first_name} {post?.user?.last_name}</div>
            <div>Category: {post?.category?.label} </div>
            <div>Publication date: {post.publication_date}</div>
            <div>Content: {post.content} </div>
        </article>
    </>
}