import { createBrowserRouter } from "react-router-dom";

// Layouts
import PublicLayout from "@/layouts/public-layout";
import AuthenticationLayout from "@/layouts/auth-layout";
import ProtectedLayout from "@/layouts/protected-layout";
import MainLayout from "@/layouts/main-layout";

// Pages
import Home from "@/routes/home-page";
import SignInPage from "@/routes/Authentication/sign-in-page";
import SignUpPage from "@/routes/Authentication/sign-up-page";
import NotFoundPage from "@/routes/404-page";

const router = createBrowserRouter([
  // 🟢 Public Routes
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  // 🟡 Authentication Routes
  {
    element: <AuthenticationLayout />,
    children: [
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },

  // 🔒 Protected Routes (no actual pages yet, future-ready)
  {
    element: (
      <ProtectedLayout>
        <MainLayout />
      </ProtectedLayout>
    ),
    children: [],
  },

  // ❌ 404 - Catch All
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
