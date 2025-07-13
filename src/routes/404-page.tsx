import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-7xl font-extrabold tracking-wide mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Oops! Page not found.</p>
      <p className="text-lg text-gray-400 mb-8 max-w-md text-center">
        The page you’re looking for might have been removed or is temporarily
        unavailable.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-2xl shadow-md hover:bg-gray-200 transition-all duration-200"
        >
          Go to Homepage
        </Link>

        <button
          onClick={goBack}
          className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-200 cursor-pointer"
        >
          Go Back
        </button>
      </div>

      <div className="mt-12">
        <svg
          className="w-40 h-40 opacity-30 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFoundPage;
