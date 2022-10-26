import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export const PostComments = () => {
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [post, setPosts] = useState({})
    const [filteredComments, setFilteredComments] = useState([])
    const { postId } = useParams()
    useEffect(
        () => {

            fetch(`http://localhost:8088/comments`)
                .then(response => response.json())
                .then((commentsArray) => {
                    setComments(commentsArray)
                })
        },
        [postId]
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

    useEffect(
        () => {
            const postComments = comments.filter(comment => comment.post_id === post.id)
            setFilteredComments(postComments)
        }
        ,
        [comments]
    )



    return <>
        {
            filteredComments.map(comment =>
                <article key={`comment--${comment.id}`}>

                    <h2>{post.title}</h2>
                    <div> {comment.content}</div>


                </article>
            )
        }
    </>
}