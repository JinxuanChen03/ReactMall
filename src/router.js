import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DetailPage from "./pages/DetailPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import PayPage from './pages/PayPage';
import OrderListPage from "./pages/OrderListPage";
import CartListPage from "./pages/CartListPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "detail/:goodId",
        element: <DetailPage />
      },
      {
        path: "createOrder/:goodId",
        element: <CreateOrderPage />
      },
      {
        path: "pay/:orderId",
        element: <PayPage />
      },
      {
        path: "orderList",
        element: <OrderListPage />
      },
      {
        path: "orderDetail/:orderId",
        element: <OrderDetailPage />
      },
      {
        path: "cartList",
        element: <CartListPage />
      },
    ]
  }
]);

export default router;
