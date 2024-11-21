import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getAllMoodsQueryOptions,
  loadingCreateMoodOptions,
} from "../../lib/api";

export const Route = createFileRoute("/_authenticated/all-moods")({
  component: AllMoods,
});

function AllMoods() {
  const { isPending, error, data } = useQuery(getAllMoodsQueryOptions);
  const { data: loadingCreateMood } = useQuery(loadingCreateMoodOptions);

  if (error) return <div>"An error occurred"</div>;
  return (
    <>
      {/* skeleton here */}
      {loadingCreateMood?.mood && <div>Show a new Mood here</div>}
      {isPending ? "..." : JSON.stringify(data, null, 2)}
    </>
  );
}
