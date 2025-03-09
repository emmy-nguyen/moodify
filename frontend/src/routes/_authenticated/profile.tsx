import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "Loading...";
  if (error) return "Not Logged in";
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src="/smile.jpg"
          alt="Avatar"
          className="w-20 h-20 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">Welcome, {data.user.given_name}</h2>
      </div>

      <div className="text-center">
        <a
          className="bg-black hover:bg-yellow-500 text-white text-sm font-semi py-2 px-4 rounded-lg transition duration-300"
          href="/api/logout"
        >
          Log out
        </a>
      </div>
    </div>
  );
}
