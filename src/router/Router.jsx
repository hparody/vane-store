import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Fragment } from "react";

import PageLayout from "@/components/PageLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import LogIn from "@/pages/LogIn";
import Products from "@/pages/Products";
import Home from "@/pages/Home";

import ProtectedLogin from "./ProtectedLogin";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<PageLayout />} errorElement={<NotFoundPage />}>
        <Route path="" element={<Home />} />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <Products />
            </ProtectedAdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        path="/login"
        element={
          <ProtectedLogin>
            <LogIn />
          </ProtectedLogin>
        }
      />
    </Fragment>
  )
);

const Router = () => <RouterProvider router={router}></RouterProvider>;

export default Router;
