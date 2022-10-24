export const User = ({ username, first_name, last_name, email}) => {

    return <>
        <div>Username: {username}</div>
        <div>First Name: {first_name}</div>
        <div>Last Name: {last_name} </div>
        <div>Email: {email}</div>
    </>
}