import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import Happy from "../components/moodIcons/happy";
import Super from "../components/moodIcons/super";
import Meh from "../components/moodIcons/meh";
import Angry from "../components/moodIcons/angry";
import { Label } from "../components/ui/label";
import { DatePicker } from "../components/date-picker";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import Sad from "../components/moodIcons/sad";

export const Route = createFileRoute("/create-mood")({
  component: CreateMood,
});

function CreateMood() {
  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: "",
      mood: "",
      category: "",
      notes: "",
      image: null,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(value);
    },
  });
  return (
    <div className="max-w-md m-auto p-4">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl mb-4">How are you?</h2>
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
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Date</Label>
                  <DatePicker
                    selected={field.state.value}
                    onChange={(date) => field.handleChange(date || new Date())}
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </>
              )}
            />
            <form.Field
              name="time"
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Time</Label>
                  <Input
                    type="time"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="12:00 PM"
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                </>
              )}
            />
            <div className="flex flex-row gap-3">
              {["super", "happy", "meh", "bad", "angry"].map((mood) => (
                <button
                  key={mood}
                  type="button"
                  className={`p-2 rounded hover:bg-blue-200 ${
                    form.getFieldValue("mood") === mood
                      ? "bg-blue-200"
                      : "bg-gray-200"
                  }`}
                  onClick={() => form.setFieldValue("mood", mood)}
                >
                  {mood === "super" && <Super />}
                  {mood === "happy" && <Happy />}
                  {mood === "meh" && <Meh />}
                  {mood === "bad" && <Sad />}
                  {mood === "angry" && <Angry />}
                </button>
              ))}
            </div>
            <p>Category here</p>
            <div className="space-y-1">
              <form.Field
                name="notes"
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
                      <em>{field.state.meta.errors.join(", ")}</em>
                    ) : null}
                  </>
                )}
              />
            </div>
            <input type="file" accept="image/*" />
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
