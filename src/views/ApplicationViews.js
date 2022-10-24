import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Posts } from "../components/posts/posts"
import { Category } from "../components/categories/Category"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/posts" element={<Posts setToken={setToken} />} />
      <Route path="/categories" element={<Catergory setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}

      </Route>
    </Routes>
  </>
}
