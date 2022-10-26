import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const PostComments = () => {
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [post, setPosts] = useState({})
    const localFireHawksUser = localStorage.getItem("auth_token")
    const FireHawksUserObject = JSON.parse(localFireHawksUser)
    const location = useLocation()
    const { postId } = useParams()

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
    
    const DeleteButton = (id) => {
        return <Button
            size="sm"
            variant="danger"
            onClick={
                () => {
                    return fetch(`http://localhost:8088/comments/${id}`, {
                        method: "DELETE",
                    })
                        .then(() => {(window.location.reload(false))})

                }
            }
        >Delete </Button>
    }



    return <>
        {
            comments.map(comment =>
                <article key={`comment--${comment.id}`}>

                    <h2>On post: {post.title}</h2>
                    <div>You have a comment: {comment.content}</div>
                    {
                        FireHawksUserObject === comment.author_id
                            ? DeleteButton(comment.id)
                            : ""
                    }


                </article>
            )
        }
    </>
}