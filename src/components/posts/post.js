import { Button } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"

export const Post = ({ AuthorFirstName, category, title, publication_date, AuthorLastName, id }) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <>

        <section className="post">
            <Link to={`/posts/${id}`} >{title}</Link>
            <div>Author: {AuthorFirstName} {AuthorLastName}</div>
            <div>{category}</div>
            {
                location.pathname === "/my-posts"
                    ? <><Button size="sm"
                        variant="danger"  >Remove Post</Button>
                        <Button size="sm" variant="warning" onClick={() => navigate(`${id}/edit`)} >Edit</Button></>
                    : ""
            }
        </section>
    </>
}