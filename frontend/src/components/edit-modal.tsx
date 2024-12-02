import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import {
  createMood,
  getAllMoodsQueryOptions,
  loadingCreateMoodOptions,
  updateMood,
} from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createMoodSchema } from "../../../server/sharedTypes";
import Super from "./moodIcons/super";
import Happy from "./moodIcons/happy";
import Meh from "./moodIcons/meh";
import Sad from "./moodIcons/sad";
import Angry from "./moodIcons/angry";
import { Label } from "./ui/label";
import { DatePicker } from "./date-picker";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";

// export const Route = createFileRoute("/_authenticated/create-mood")({
//   component: CreateMood,
// });
type Mood = "happy" | "super" | "meh" | "sad" | "angry";
const moodIcons: Record<Mood, JSX.Element> = {
  super: <Super />,
  happy: <Happy />,
  meh: <Meh />,
  sad: <Sad />,
  angry: <Angry />,
};
export default function EditMoodModal({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) {
  // const queryClient = useQueryClient();
  // //   const mutation = useMutation()
  // const form = useForm({
  //   validatorAdapter: zodValidator(),
  //   defaultValues: {
  //     date: new Date(data.date).toISOString(),
  //     time: data.time as String,
  //     mood: data.mood as Mood,
  //     category: data.category as null,
  //     notes: data.notes as String,
  //     image: data.image as String | null,
  //   },
  //   onSubmit: async ({ value }) => {
  //     mutation.mutate(value);
  //     toast("Mood updated successfully!");
  //     onClose();
  //   },
  // });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative w-full max-w-sm m-auto p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <h2 className="text-2xl mb-4">Edit Mood</h2>
            <Button
              //   variant="outline"
              //   size="icon"
              className="absolute top-4 right-4 bg-white text-gray-300 hover:text-neutral hover:bg-neutral-50 p-2"
              onClick={onClose}
            >
              <X className="text-gray-500 w-5 h-5" />
            </Button>
          </div>
          {/* <form.Provider> */}
          <form onSubmit={() => {}} className="max-w-xl p-4">
            <div className="flex flex-col justify-start gap-y-4">
              <div>
                <Label htmlFor="">Date</Label>
                <DatePicker
                  selected={new Date(data.date)}
                  onChange={() => {}}
                />
              </div>

              <div>
                <Label htmlFor="">Time</Label>
                <Input
                  type="time"
                  id=""
                  value={data.time}
                  onChange={() => {}}
                />
              </div>

              <div className="flex flex-row gap-3">
                {Object.entries(moodIcons).map(([mood, Icon]) => (
                  <button
                    key={mood}
                    type="button"
                    className={`p-2 rounded hover:bg-blue-200`}
                    onClick={() => {}}
                  >
                    {Icon}
                  </button>
                ))}
              </div>

              <div>
                <Label htmlFor="">Category</Label>
                <Input type="text" id="" value="" onChange={() => {}} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="">Notes</Label>
                <Textarea
                  id=""
                  name=""
                  value={data.notes}
                  //   onBlur=""
                  onChange={() => {}}
                  placeholder="Add Note..."
                />
              </div>

              <input type="file" accept="image/*" />

              <Button type="submit">
                {/* {isSubmitting ? "Saving" : "Save"} */}
                Save
              </Button>
            </div>
          </form>
          {/* </form.Provider> */}
        </div>
      </div>
    </div>
  );
}
