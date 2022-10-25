import "./users.css"
import { Link } from "react-router-dom"


export const User = ({ username, firstName, lastName, email, id  }) => {

    return <>
        <section className="userbox">
        <article className="users">
        <div>User: <Link to={`/users/${id}`} >{username}</Link></div>
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
        <div>Email: {email}</div>
        </article>
        </section>
    </>
}
