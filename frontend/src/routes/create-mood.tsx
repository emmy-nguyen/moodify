import { createFileRoute } from "@tanstack/react-router";
import Happy from "../components/moodIcons/happy";
import Super from "../components/moodIcons/super";
import Meh from "../components/moodIcons/meh";
import Bad from "../components/moodIcons/bad";
import Angry from "../components/moodIcons/angry";

export const Route = createFileRoute("/create-mood")({
  component: CreateMood,
});

function CreateMood() {
  return (
    <div>
      <h2>How are you?</h2>
      <p>Calendar here</p>
      <div className="flex flex-row gap-3">
        <Super />
        <Happy />
        <Meh />
        <Bad />
        <Angry />
      </div>
    </div>
  );
}
