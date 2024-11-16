import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/moods")({
  component: Moods,
});

function Moods() {
  return <div className="p-2">Show All Moods</div>;
}
