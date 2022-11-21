import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Col, Form } from "react-bootstrap";
import "./Categories.css"
import { getAllCategories, createCategory } from "../../managers/categoriesManager";


export const CategoryForm = () => {
    const navigate = useNavigate();
    const [categories, setCatagories] = useState([])
    const [category, update] = useState({
        label: "",
    })

    useEffect(() => {
        getAllCategories().then(setCatagories)
    }, [])


    const newCategory = (e) => {
        const copy = { ...category }
        copy[evt.target.id] = evt.target.value
        update(copy)
        }



    return (
        <>
            <Container>
                <Col className="CategoryListLeft">
                    <h2>Categories</h2>
                    {
                        categories.map(category => {
                            return <ul className="categories">{category.label}</ul>
                        })
                    }
                </Col>


                <Form className="categoryForm">
                    <Col className="CategoryFormRight">
                        <Form.Group controlId="formCategory">
                            <Form.Label>
                                Create Your Own Category!
                            </Form.Label>
                            <Form.Control type="text" placeholder="Create Category Label" onChange={ newCategory } />
                            <Button variant="dark" type="submit" className="submit" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
                        </Form.Group>
                    </Col>
                </Form>

            </Container >
        </>

    )

}


