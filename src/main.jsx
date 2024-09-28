import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { Protected as AuthLayout } from "./Components";

import AddPost from "./Pages/AddPost";
import Signup from "./Pages/Signup";
import EditPost from "./Pages/EditPost";
import Login from "./Pages/Login.jsx";
import Post from "./Pages/Post";

import AllPosts from "./Pages/AllPosts";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: <AuthLayout children={<Login />} authentication={false} />,
//       },
//       {
//         path: "/signup",
//         element: <AuthLayout children={<Signup />} authentication={false} />,
//       },
//       {
//         path: "/all-posts",
//         element: <AuthLayout children={<AllPosts />} authentication={true} />,
//       },
//       {
//         path: "/add-post",
//         element: <AuthLayout children={<AddPost />} authentication />,
//       },
//       {
//         path: "/edit-post/:slug",
//         element: <AuthLayout children={<EditPost />} authentication />,
//       },
//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<AuthLayout children={<Login />} authentication={false} />}
      />
      <Route
        path="/signup"
        element={<AuthLayout children={<Signup />} authentication={false} />}
      />
      <Route
        path="/all-posts"
        element={<AuthLayout children={<AllPosts />} authentication={true} />}
      />
      <Route
        path="/add-post"
        element={<AuthLayout children={<AddPost />} authentication={true} />}
      />
      <Route
        path="/edit-post/:slug"
        element={<AuthLayout children={<EditPost />} authentication={true} />}
      />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
