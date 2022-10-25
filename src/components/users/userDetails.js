import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export const UserDetails = () => {
    const navigate = useNavigate()
    const [user, setUsers] = useState({})
    const { userId } = useParams()
    useEffect(
        () => {

            fetch(`http://localhost:8088/users/${userId}`)
                .then(response => response.json())
                .then((usersArray) => {
                    setUsers(usersArray)
                })
        },
        [userId]
    )

    return <>
        <article key={`user--${user.id}`}>
            <Button size="sm" variant="primary" onClick={() => navigate(`/user-list`)} >All Users</Button>
            <h2>{user.first_name} {user.last_name}</h2>
            <div>{user.profile_image_url}</div>
            <div>Username: {user.username} </div>
            <div>Date Created: {user.created_on}</div>
            <div>Bio: {user.bio} </div>
            <Button
            variant="dark"
            className="subscription_button"
            onClick={() => navigate(`/`)}
            >
            Subscribe
          </Button>
          <Button
            variant="dark"
            className="subscription__button"
            onClick={() => navigate(`/`)}
            >
            Unsubscribe
          </Button>
        </article>

    </>
}