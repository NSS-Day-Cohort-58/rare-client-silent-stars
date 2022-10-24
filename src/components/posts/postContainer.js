import { useState } from "react"
import { Posts } from "./posts"
import { PostSearch } from "./postSearch"


export const PostContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <PostSearch setterFunction={setSearchTerms} />
        <Posts searchTermState={searchTerms} />

    </>
}