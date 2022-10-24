import "./users.css"

export const User = ({ username, firstName, lastName, email  }) => {
    
    return <>
        <section className="userbox">
        <article className="users">
        <div>User: {username}</div>
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
        <div>Email: {email}</div>
        </article>
        </section>
    </>
}