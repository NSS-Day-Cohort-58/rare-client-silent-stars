import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"

import { Category } from "../components/categories/Category"
import { PostContainer } from "../components/posts/postContainer"
import { Authorized } from "./Authorized"
import { CategoryForm } from "../components/categories/CategoryForm"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/categories" element={<Category setToken={setToken} />} />
      <Route path="/create-category" element={<CategoryForm setToken={setToken} />} />
      <Route path="/posts" element={<PostContainer setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}

      </Route>
    </Routes>
  </>
}
