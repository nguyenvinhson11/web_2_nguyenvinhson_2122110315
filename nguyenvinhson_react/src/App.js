import * as React from "react";
import { useRoutes } from "react-router-dom";
import LayoutFrontend from "./layout/frontend";
import LayoutBackend from "./layout/backend";
import NotFound from "./pages/NotFound";
import RouterFrontend from "./router/RouterFrontend";
import RouterBackend from "./router/RouterBackend";
import AdminGuard  from "./pages/guards/AdminGuard"; // ✅
import LoginAdmin from "../src/pages/backend/loginadmin"

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend,
    },

    {
      path: "/loginadmin",
      element: <LoginAdmin />,
    },
    
    {
      
       
      
      path: "/admin",
      element: (
        <AdminGuard>
          <LayoutBackend />
        </AdminGuard>
      ),
      children: RouterBackend,
    },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
}

export default App;
