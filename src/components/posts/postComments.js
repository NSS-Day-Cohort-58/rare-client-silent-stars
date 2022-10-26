import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export const PostComments = () => {
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [post, setPosts] = useState({})

    const { postId } = useParams()

    const localFireHawksUser = localStorage.getItem("auth_token")
    const fireHawksUserObject = JSON.parse(localFireHawksUser)

    useEffect(
        () => {

            fetch(`http://localhost:8088/comments?post_id=${postId}`)
                .then(response => response.json())
                .then((commentsArray) => {
                    setComments(commentsArray)
                })
        },
        []
    )
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
        {
            comments.map(comment =>
                <article key={`comment--${comment.id}`}>

                    <h2>On post: {post.title}</h2>
                    <div>You have a comment: {comment.content}</div>


                </article>
            )
        }
    </>
}