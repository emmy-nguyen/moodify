import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);
  const loggedIn = Boolean(data?.user?.id);

  if (isPending) return "Loading...";
  if (error) return "Not Logged in";
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Header Section */}
      <header className="flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/80"
          alt="Avatar"
          className="w-20 h-20 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">
          {loggedIn ? `Welcome, ${data.user.given_name}` : "Welcome, Guest"}
        </h2>
      </header>

      <footer className="text-center">
        <a
          className={`w-full px-4 py-2 rounded-lg text-white ${
            loggedIn ? "bg-black" : "bg-green-500"
          }`}
          href="/api/logout"
        >
          {loggedIn ? "Logout" : "Login"}
        </a>
      </footer>
    </div>
  );
}
