import { createBrowserRouter } from "react-router";
import Add from "../pages/Add";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import ModAndAdminPage from "../pages/ModAndAdminPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: (
              <AdminPage>
                <Add />,
              </AdminPage>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: (
      <UserPage>
        <Register />
      </UserPage>
    ),
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/mod",
    element: (
      <ModAndAdminPage>
        <div>Moderator & Admin Only Content</div>
      </ModAndAdminPage>
    ),
  },
]);
export default router;
