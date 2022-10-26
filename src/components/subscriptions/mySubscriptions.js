import { useEffect, useState } from "react"
import { Post } from "../posts/post"



export const MySubscriptions = () => {

    const [subscriptions, setSubscriptions] = useState([])
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const localFireHawksUser = localStorage.getItem("auth_token")
    const FireHawksUserObject = JSON.parse(localFireHawksUser)




    useEffect(
        () => {

            fetch(`http://localhost:8088/subscriptions`)
                .then(response => response.json())
                .then((SubscriptionsArray) => {
                    setSubscriptions(SubscriptionsArray)
                })
        },
        []
    )
    useEffect(
        () => {

            fetch(`http://localhost:8088/posts`)
                .then(response => response.json())
                .then((postsArray) => {
                    setPosts(postsArray)
                })
        },
        []
    )
    useEffect(
        () => {


            const mySubs = subscriptions.map(sub => posts.filter(post => sub.follower_id === FireHawksUserObject && post.user_id === sub.author_id)
            )
            setFilteredPosts(mySubs)
        }
        ,
        [posts]
    )

    const refresh = () => {
        return window.location.reload(false);
    }


    return <>

        <h2>My Subs</h2>


        <article>

            {

                filteredPosts.map(
                    (post) =>
                        post.map(pos =>
                            <Post
                                id={pos.id}
                                userId={pos.userId}
                                category={pos.category?.label}
                                title={pos.title}
                                publication_date={pos.publication_date}
                                image_url={pos.image_url}
                                content={pos.content}
                                AuthorFirstName={pos.user?.first_name}
                                AuthorLastName={pos.user?.last_name}
                                key={`post--${pos.id}`}


                            />

                        ))
            }


        </article>
    </>
}



