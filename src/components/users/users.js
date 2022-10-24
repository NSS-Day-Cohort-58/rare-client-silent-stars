import { useEffect, useState } from "react"
import { User } from "./user";

export const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {

            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((postsArray) => {
                    setUsers(postsArray)
                })
        },
        []
    )


    return <>
        <h2> All Users</h2>
        
    </>
}