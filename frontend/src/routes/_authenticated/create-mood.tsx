import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import Happy from "../../components/moodIcons/happy";
import Super from "../../components/moodIcons/super";
import Meh from "../../components/moodIcons/meh";
import Angry from "../../components/moodIcons/angry";
import { Label } from "../../components/ui/label";
import { DatePicker } from "../../components/date-picker";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import Sad from "../../components/moodIcons/sad";
import {
  createMood,
  getAllMoodsQueryOptions,
  loadingCreateMoodOptions,
} from "../../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  Category,
  createMoodSchema,
  Mood,
} from "../../../../server/sharedTypes";
import Exam from "../../components/categoryIcons/exam";
import Study from "../../components/categoryIcons/study";
import Class from "../../components/categoryIcons/class";
import Assignment from "../../components/categoryIcons/assignment";
import Project from "../../components/categoryIcons/project";

export const Route = createFileRoute("/_authenticated/create-mood")({
  component: CreateMood,
});
// type Mood = "happy" | "super" | "meh" | "sad" | "angry";
const moodIcons: Record<Mood, JSX.Element> = {
  super: <Super />,
  happy: <Happy />,
  meh: <Meh />,
  sad: <Sad />,
  angry: <Angry />,
};

// type Category = "exam" | "project" | "study" | "class" | "assignment";
const categoryNames: Record<Category, JSX.Element> = {
  exam: <Exam />,
  project: <Project />,
  study: <Study />,
  class: <Class />,
  assignment: <Assignment />,
};
function CreateMood() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      date: new Date().toISOString(),
      time: "",
      mood: "" as Mood,
      category: "" as Category,
      notes: "",
      image: "",
    },
    onSubmit: async ({ value }) => {
      const existingMood = await queryClient.ensureQueryData(
        getAllMoodsQueryOptions
      );
      navigate({ to: "/all-moods" });
      // loading state
      queryClient.setQueryData(loadingCreateMoodOptions.queryKey, {
        mood: value,
      });
      try {
        // caching resutls
        const newMood = await createMood({ value });
        queryClient.setQueryData(getAllMoodsQueryOptions.queryKey, {
          ...existingMood,
          moods: [newMood, ...existingMood.moods],
        });
        // success state
        toast("Mood Created", {
          description: `Successfull created mood: ${newMood.id}`,
        });
      } catch (error) {
        toast("Error", {
          description: "Failed to create new mood",
        });
      } finally {
        queryClient.setQueryData(loadingCreateMoodOptions.queryKey, {});
      }
    },
  });
  return (
    <div className="max-w-md m-auto p-4">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-medium mb-4">How are you today?</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="max-w-xl m-auto"
        >
          <div className="flex flex-col justify-start gap-y-4">
            <form.Field
              name="date"
              validators={{
                onChange: createMoodSchema.shape.date,
              }}
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Date</Label>
                  <DatePicker
                    selected={new Date(field.state.value)}
                    onChange={(date) =>
                      field.handleChange((date ?? new Date()).toISOString())
                    }
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em className="text-red-700">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                </>
              )}
            />
            <form.Field
              name="time"
              validators={{
                onChange: createMoodSchema.shape.time,
              }}
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Time</Label>
                  <Input
                    type="time"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em className="text-red-700">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                </>
              )}
            />
            <p>Pick your mood</p>

            <form.Field
              name="mood"
              validators={{
                onChange: createMoodSchema.shape.mood,
              }}
            >
              {(field) => (
                <>
                  <div className="flex flex-row gap-3">
                    {Object.entries(moodIcons).map(([mood, Icon]) => (
                      <button
                        key={mood}
                        type="button"
                        className={`p-2 rounded hover:bg-yellow-200 ${
                          field.state.value === mood
                            ? "bg-yellow-200"
                            : "bg-gray-200"
                        }`}
                        onClick={() => field.handleChange(mood as Mood)}
                      >
                        {Icon}
                        <span className="text-sm">
                          {mood === "super"
                            ? "Super"
                            : mood === "happy"
                              ? "Happy"
                              : mood === "meh"
                                ? "Meh"
                                : mood === "sad"
                                  ? "Sad"
                                  : mood === "angry"
                                    ? "Angry"
                                    : "None"}
                        </span>
                      </button>
                    ))}
                  </div>
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em className="text-red-700">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                </>
              )}
            </form.Field>
            <p>Category</p>

            <form.Field
              name="category"
              validators={{
                onChange: createMoodSchema.shape.category,
              }}
            >
              {(field) => (
                <>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    {Object.entries(categoryNames).map(([category, Icon]) => (
                      <div
                        key={category}
                        className={`p-2 rounded-lg text-sm hover:bg-yellow-200 ${
                          field.state.value === category
                            ? "bg-yellow-200"
                            : "bg-gray-200"
                        }`}
                        onClick={() => field.handleChange(category as Category)}
                      >
                        {Icon}
                      </div>
                    ))}
                  </div>
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em className="text-red-700">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                </>
              )}
            </form.Field>

            <div className="space-y-1">
              <form.Field
                name="notes"
                validators={{
                  onChange: createMoodSchema.shape.notes,
                }}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Notes</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Add Note..."
                    />
                    {field.state.meta.isTouched &&
                    field.state.meta.errors.length ? (
                      <em className="text-red-700">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}
                  </>
                )}
              />
            </div>
            {/* <input type="file" accept="image/*" /> */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "Saving" : "Save"}
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
