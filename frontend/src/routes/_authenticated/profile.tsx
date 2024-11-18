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
    <div className="p-2">
      <p>Hello from Profile!</p>
      <p>Hello {data.user.given_name}</p>
      <a href="/api/logout">Logout!</a>
    </div>
  );
}
