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
import Generate from "@/layouts/generate";
import Dashboard from "@/routes/dashboard-page";
import CreateEditPage from "@/routes/create-edit-page";
import MockLoadPage from "@/routes/mock-load-page";
import MockInterviewPage from "@/routes/mock-interview-page";
import Feedback from "@/routes/feedback-page";

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

  // 🔒 Protected Routes
  {
    element: (
      <ProtectedLayout>
        <MainLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: "/generate",
        element: <Generate />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: ":interviewId",
            element: <CreateEditPage />,
          },
          {
            path: "interview/:interviewId",
            element: <MockLoadPage />,
          },
          {
            path: "interview/:interviewId/start",
            element: <MockInterviewPage />,
          },
          {
            path: "feedback/:interviewId",
            element: <Feedback />,
          },
        ],
      },
    ],
  },

  // ❌ 404 - Catch All
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
