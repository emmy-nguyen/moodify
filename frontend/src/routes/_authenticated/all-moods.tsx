import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/all-moods")({
  component: AllMoods,
});

async function getAllMoods() {
  const res = await api.mood.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}
function AllMoods() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-all-moods"],
    queryFn: getAllMoods,
  });

  if (error) return <div>"An error occurred"</div>;
  return <>{isPending ? "..." : JSON.stringify(data, null, 2)}</>;
}
