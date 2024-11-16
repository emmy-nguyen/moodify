import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/show-mood")({
  component: ShowMood,
});

function ShowMood() {
  return "Hello /show-mood!";
}
