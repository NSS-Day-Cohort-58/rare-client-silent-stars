import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Col, Form } from "react-bootstrap";

export const TagForm = () => {
    const [tags, setTags] = useState([])
    const [tag, update] = useState({
        id: 0,
        label: "",
    })

    const navigate = useNavigate();
    const localFireHawkUser = localStorage.getItem("fireHawk_user");
    const fireHawkUserObject = JSON.parse(localFireHawkUser);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        //create API object
        const tagToSendToAPI = {
            id: fireHawkUserObject.id,
            label: tag.label,
        };

        return fetch(`http://localhost:8088/tags`, {
            method: "POST",
            headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(tagToSendToAPI),
    })
        .then((response) => response.json())
        .then(() => {
            navigate("/create-tag");
      });
    };

    useEffect(
        () => {

            fetch(`http://localhost:8088/tags`)
                .then(response => response.json())
                .then((tagsArray) => {
                    setTags(tagsArray)
                })
        },
        []
    )

    return (
        <>
        <h2>Tags</h2>
        <article>
            {
                tags.map(tag => {return <ul>{tag.label}</ul>})
            }
        </article>
        <Container>
            <Form>
                <Col className="">
                    <Form.Group controlId="formTag">
                        <Form.Label>
                            Create Your Own Tag!
                        </Form.Label>
                        <Form.Control type="text" placeholder="Create Tag Label"/>
                        <Button variant="dark" type="submit" 
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
                    </Form.Group>
                </Col>
            </Form>
        </Container>
        </>

    )

    }