import { useState } from "react"
import { Button, Col, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { createComment } from "../../managers/commentManager"

export const AddComments = () => {
    const navigate = useNavigate()
    const { postId } = useParams()

    const [comment, setComment] = useState({
            post_id: postId,
            author_id: RareUserObject,
            content: comment.content
        })

        const newComment = (evt) => {
            const copy = { ...comment }
            copy[evt.target.id] = evt.target.value
            setComment(copy)
        }

    return (
        <>

            <Container>
                <Form>
                    <Col className="">
                        <Form.Group controlId="formTag">
                            <Form.Label>
                                Create Your Own Comment!
                            </Form.Label>
                            <Form.Control type="text" placeholder="Create comment" id="comment" />
                            <Button variant="dark" type="submit"
                                onClick={evt => {
                                    // Prevent form from being submitted
                                    evt.preventDefault()
                
                                    const event = {
                                        post_id: postId,
                                        author_id: RareUserObject,
                                        content: comment.content
                                    }
                
                                    createComment(event)
                                        .then(() => navigate("/posts/:postId/comment"))
                                }}
                                className="btn btn-primary">Submit</Button>
                        </Form.Group>
                    </Col>
                </Form>
            </Container>
        </>

    )

}