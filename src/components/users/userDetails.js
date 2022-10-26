import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export const UserDetails = () => {
    const navigate = useNavigate()
    const [user, setUsers] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
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

    useEffect(
        () => {

            fetch(`http://localhost:8088/subscriptions`)
                .then(response => response.json())
                .then((usersArray) => {
                    setSubscriptions(usersArray)
                })
        },
        []
    )

    const localFireHawksUser = localStorage.getItem("auth_token")
    const FireHawksUserObject = JSON.parse(localFireHawksUser)

    const findSubscription = subscriptions.find(subscription => {
        return subscription.follower_id === FireHawksUserObject && subscription.author_id === user.id
    })
    
    const createSubscription = (subscription) => {
        return fetch(`http://localhost:8088/subscriptions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscription)
        })
    }

    const deleteSubscription = (event) => {
        return fetch(`http://localhost:8088/subscriptions/${event.target.id}`, {
            method: "DELETE"
        })
    }

    const establishSubscription = () => {
        let timeDate = Date.now()
        let newSubscription = {
            author_id: user.id,
            follower_id: FireHawksUserObject,
            created_on: timeDate
        }
        createSubscription(newSubscription)
    }

    let notSelf = true

    if(user.id === FireHawksUserObject) {
        notSelf = false
    }

    return <>
        <article key={`user--${user.id}`}>
            <Button size="sm" variant="primary" onClick={() => navigate(`/user-list`)} >All Users</Button>
            <h2>{user?.first_name} {user?.last_name}</h2>
            <div><img src={user?.profile_image_url} alt="img"></img></div>
            <div>Username: {user?.username} </div>
            <div>Date Created: {user?.created_on}</div>
            <div>Bio: {user?.bio} </div>
            {
                notSelf
                ? <> {findSubscription 
                    ? <Button variant="dark" className="subscription_button"
                onClick={() => establishSubscription()}>Subscribe</Button>
                : <Button variant="dark" className="subscription__button"
                onClick={clickEvent => deleteSubscription(clickEvent)}>Unsubscribe</Button>
            } </> 
            : null
        }
          
        </article>

    </>
}