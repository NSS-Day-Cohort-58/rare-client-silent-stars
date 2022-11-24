import { useEffect, useState } from "react"

import { Tag } from "./tag";
export const Tags = ({ searchTermState }) => {

    
    const [tags, setTags] = useState([])
    // const [filteredTags, setFilteredTags] = useState([])

    useEffect(
        () => {

            fetch(`http://localhost:8000/tags`)
                .then(response => response.json())
                .then((tagsArray) => {
                    setTags(tagsArray)
                })
        },
        []
    )

    const tagsAlpha = tags.sort()

    return <>

        <h2>All Tags</h2>

        <article>
            {

                tagsAlpha.map(
                    (tag) => <Tag
                        label = {tag.label}
                    />

                )
            }
            </article>
    </>
}