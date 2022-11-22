import { useEffect, useState } from "react"
import { Button, Col, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export const AddComments = () => {
    const navigate = useNavigate()
    const [comment, setComment] = useState({})
    const { postId } = useParams()

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        //create API object
        const CommentToSendToAPI = {

            post_id: postId,
            author_id: FireHawksUserObject,
            content: comment.content
        };

        return fetch(`http://localhost:8088/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(CommentToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => {
                navigate(`/posts/${postId}/comment`);
            });
    };
    return (
        <>

            <Container>
                <Form>
                    <Col className="">
                        <Form.Group controlId="formTag">
                            <Form.Label>
                                Create Your Own Comment!
                            </Form.Label>
                            <Form.Control type="text" placeholder="Create comment" onChange={(evt) => {
                                const copy = { ...comment };
                                copy.content = evt.target.value;
                                setComment(copy)
                            }} />
                            <Button variant="dark" type="submit"
                                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
                        </Form.Group>
                    </Col>
                </Form>
            </Container>
        </>

    )

}