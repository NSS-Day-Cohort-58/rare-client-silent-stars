import { useState } from "react"
import { Alert, Button } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./post.css"

export const Post = ({ AuthorFirstName, category, title, publication_date, AuthorLastName, id }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [added, setAdded] = useState(false)
    const [show, setShow] = useState(true);

    const DeletedButton = () => {

        if (show) {
            return (
                <Alert variant="danger" onClose={() => { setShow(false)(window.location.reload(false)) }} dismissible >
                    <Alert.Heading>Deleted! </Alert.Heading>
                    <p>
                        {title} has been deleted.
                    </p>
                </Alert>
            );
        }
    }
    const DeleteButton = () => {
        if (added) {
            return DeletedButton()
        }
        return <Button
            size="sm"
            variant="danger"
            onClick={
                () => {
                    return fetch(`http://localhost:8088/posts/${id}`, {
                        method: "DELETE",
                    })
                        .then(() => {
                            setAdded(true)
                        })

                }
            }
        >Delete </Button>
    }

    return <>

        <section className="post">
            <Link to={`/posts/${id}`} ><b>{title}</b></Link>
            <div><u>Author:</u> {AuthorFirstName} {AuthorLastName}</div>
            <div><u>Category:</u> {category}</div>
            <Button size="sm" variant="info" onClick={() => navigate(`/posts/${id}/add-comment`)} >Add Comment</Button>
            {
                location.pathname === "/my-posts"
                    ? <>{DeleteButton()}
                        <Button size="sm" variant="warning" onClick={() => navigate(`${id}/edit`)} >Edit</Button></>
                    : ""
            }
        </section>
    </>
}