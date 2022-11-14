import "./postSearch.css"

export const PostSearch = ({ setterFunction }) => {
    return (
        <input id="search"
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }

            type="text" placeholder="Enter search terms" />
    )
}