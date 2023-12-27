import { Navigate } from "react-router-dom";
import Layout from "../component/layout";
import Login from "../page/Login";
import Today from "../page/Today";
import TaskBox from "../page/TaskBox";
import TagBox from "../page/TagBox";
import Project from "../page/Project";
import Register from "../page/Register";

const router = [
  {
    path: '/',
    element: <Navigate to="/app" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/app',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="today" /> },
      { path: 'today', element: <Today /> },
      { path: 'task', element: <TaskBox /> },
      { path: 'tag', element: <TagBox /> },
      { path: 'project', element: <Project /> }
    ]
  }
]

export default router