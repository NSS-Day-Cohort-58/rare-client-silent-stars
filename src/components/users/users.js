import { useEffect, useState } from "react"
import { User } from "./user"
import "./users.css"

export const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {

            fetch(`http://localhost:8000/users`)
                .then(response => response.json())
                .then((postsArray) => {
                    setUsers(postsArray)
                })
        },
        []
    )





    return <>
        <h2> All Users</h2>
        <article className="mainBox">
            {

                users.map(
                    (user) => <User
                        id={user.id}
                        username={user.username}
                        firstName={user.first_name}
                        lastName={user.last_name}
                        email={user.email}

                        />

                )
            }
        </article>
    </>
}