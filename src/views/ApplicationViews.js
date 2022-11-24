import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Tags } from "../components/tags/tagManagement"
import { Category } from "../components/categories/Category"
import { PostContainer } from "../components/posts/postContainer"
import { Authorized } from "./Authorized"
import { CategoryForm } from "../components/categories/CategoryForm"
import { User } from "../components/users/user"
import { Users } from "../components/users/users"
import { PostDetails } from "../components/posts/postDetails"
import { TagForm } from "../components/tags/tagForm"
import { CategoryList } from "../components/categories/CategoryList"
import { MyPosts } from "../components/posts/myPosts"
import { PostEdits } from "../components/posts/editMyPost"
import { UserDetails } from "../components/users/userDetails"
import { PostForm } from "../components/posts/createPost"
import { MySubscriptions } from "../components/subscriptions/mySubscriptions"
import { PostComments } from "../components/posts/postComments"
import { AddComments } from "../components/posts/addComment"



export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        
        <Route path="/posts" element={<PostContainer token={token} />} />
        <Route path="posts/:postId" element={<PostDetails />} />
        <Route path="/create-post" element={<PostForm />} />
        <Route path="posts/:postId/comment" element={<PostComments />} />
        <Route path="posts/:postId/add-comment" element={<AddComments />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="my-posts/:postId/edit" element={<PostEdits />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/create-category" element={<CategoryForm />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/create-tag" element={<TagForm />} />
        <Route path="/user-list" element={<Users />} />
        <Route path="users/:userId" element={<UserDetails />} />
        {/* Add Routes here */}

      </Route>
    </Routes>
  </>
}
{/* <Route path="/" element={<MySubscriptions setToken={setToken} />} /> */}

