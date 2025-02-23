import { createBrowserRouter } from "react-router-dom";
import Blogs from "../pages/Blogs";
import Create from "../pages/Create";
import Blog from "../pages/Blog";
import Update from "../pages/Update";

 
 const router = createBrowserRouter( [
    {
        path : "",
        element : <Blogs/>
    },
    {
        path : "create/",
        element : <Create/>
    },
    {
        path : ":id/",
        element : <Blog/>
    },
    {
       path : ":id/update",
       element: <Update/>
    }
 ]);

 export default router;