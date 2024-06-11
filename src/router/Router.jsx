import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Fragment } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import LogIn from "@/pages/LogIn";
import Home from "@/pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<HomeLayout />} errorElement={<NotFoundPage />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
    </Fragment>
  )
);

const Router = () => <RouterProvider router={router}></RouterProvider>;

export default Router;
