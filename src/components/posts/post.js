import { Link } from "react-router-dom"

export const Post = ({ AuthorFirstName, category, title, publication_date, AuthorLastName, id }) => {

    return <>

        <section className="post">
            <Link to={`/posts/${id}`} >{title}</Link>
            <div>Author: {AuthorFirstName} {AuthorLastName}</div>
            <div>{category}</div>
        </section>
    </>
}