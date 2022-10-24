import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Col, Form } from "react-bootstrap";

export const CategoryForm = () => {

    const [category, update] = useState({
        id: 0,
        label: "",
    })

    const navigate = useNavigate();
    const localFireHawkUser = localStorage.getItem("fireHawk_user");
    const fireHawkUserObject = JSON.parse(localFireHawkUser);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        //create API object
        const categoryToSendToAPI = {
            id: fireHawkUserObject.id,
            label: category.label,
        };

        return fetch(`http://localhost:8088/categories`, {
            method: "POST",
            headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryToSendToAPI),
    })
        .then((response) => response.json())
        .then(() => {
            navigate("/create-category");
      });
    };

    return (
        <>
        <Container>
            <Form>
                <Col className="">
                    <Form.Group controlId="formCategory">
                        <Form.Label>
                            Create Your Own Category!
                        </Form.Label>
                        <Form.Control type="text" placeholder="Create Category Label"/>
                        <Button variant="dark" type="submit" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
                    </Form.Group>
                </Col>
            </Form>
        </Container>
        </>

    )

    }


