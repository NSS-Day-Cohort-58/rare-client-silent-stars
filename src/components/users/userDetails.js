import { useEffect, useState,  } from "react"
import { Button } from "react-bootstrap"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const UserDetails = () => {
    const navigate = useNavigate()
    const [user, setUsers] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const { userId } = useParams()
    const [subs, setsubs] = useState([])
    const location = useLocation()

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
                .then((subsArray) => {
                    setSubscriptions(subsArray)
                })
        }, [])

    const localFireHawksUser = localStorage.getItem("auth_token")
    const FireHawksUserObject = JSON.parse(localFireHawksUser)
    
    useEffect(
        () => {
            const filtered = subscriptions.find(sub => FireHawksUserObject === sub.follower_id && sub.author_id === user.id)
            setsubs(filtered)
        },
        [subscriptions]
    )

    const DeleteButton = () => {
        return <Button
            size="sm"
            variant="danger"
            onClick={
                () => {
                    return fetch(`http://localhost:8088/subscriptions/${subs.id}`, {
                        method: "DELETE",
                    })
                    .then(() => {(window.location.reload(false))})

                }
            }
        >TrashCan </Button>
    }

        const createSubscription = (subscription) => {
            return fetch(`http://localhost:8088/subscriptions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(subscription)
            })
            .then(() => {(window.location.reload(false))})
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

        if (user.id === FireHawksUserObject) {
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
                        ? <>{subs
                            ?DeleteButton()
                            : <Button variant="dark" className="subscription_button"
                            onClick={() => establishSubscription()}>Subscribe</Button>
                            }</>
                        : null
                }


            </article>

        </>
    }