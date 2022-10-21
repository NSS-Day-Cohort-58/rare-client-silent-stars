export const Post = ({ userId, category_id, title, publication_date, image_url, content }) => {

    return <>
        <h2>title: {title}</h2>

        <div>{publication_date}</div>
        <div className="image"> <img src={image_url} /></div>
        <div>{content}</div>
    </>
}