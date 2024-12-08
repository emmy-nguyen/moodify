// import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import { getAllMoodsQueryOptions, updateMood } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
// import { createMoodSchema } from "../../../server/sharedTypes";
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
import { Category, createMoodSchema, Mood } from "../../../server/sharedTypes";
import Exam from "./categoryIcons/exam";
import Project from "./categoryIcons/project";
import Study from "./categoryIcons/study";
import Class from "./categoryIcons/class";
import Assignment from "./categoryIcons/assignment";

// type Mood = "happy" | "super" | "meh" | "sad" | "angry";
const moodIcons: Record<Mood, JSX.Element> = {
  super: <Super />,
  happy: <Happy />,
  meh: <Meh />,
  sad: <Sad />,
  angry: <Angry />,
};

const categoryNames: Record<Category, JSX.Element> = {
  exam: <Exam />,
  project: <Project />,
  study: <Study />,
  class: <Class />,
  assignment: <Assignment />,
};

export default function EditMoodModal({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateMood,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllMoodsQueryOptions);
      toast.success(`Updated mood successfully ${data.id}`);
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update mood: ${data.id}`);
      console.error(error);
    },
  });
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      date: new Date(data.date).toISOString(),
      time: data.time as string,
      mood: data.mood as Mood,
      category: data.category as Category,
      notes: data.notes as string,
      image: data.image as string | null,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({ id: data.id, values: value });
      toast("Mood updated successfully!");
      onClose();
    },
  });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative w-full max-w-sm m-auto p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <h2 className="text-2xl mb-4 font-medium">Edit Your Mood</h2>
            <Button
              className="absolute top-4 right-4 bg-white text-gray-300 hover:text-neutral hover:bg-neutral-50 p-2"
              onClick={onClose}
            >
              <X className="text-gray-500 w-5 h-5" />
            </Button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
            className="max-w-xl p-4"
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
                      selected={
                        new Date(`${field.state.value?.split("T")[0]}T00:00:00`)
                      }
                      onChange={(date) => {
                        const fixedDate = new Date(
                          `${date?.toISOString().split("T")[0]}T00:00:00`
                        );
                        field.handleChange(fixedDate.toISOString());
                      }}
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
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
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
                name="mood"
                validators={{
                  onChange: createMoodSchema.shape.mood,
                }}
                children={(field) => (
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
                          onClick={() => {
                            field.handleChange(mood as Mood);
                          }}
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
              />
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
                          onClick={() =>
                            field.handleChange(category as Category)
                          }
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
              <form.Field
                name="notes"
                validators={{
                  onChange: createMoodSchema.shape.notes,
                }}
                children={(field) => (
                  <>
                    <div className="space-y-1">
                      <Label htmlFor={field.name}>Notes</Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        // placeholder="Add Note..."
                      />
                      {field.state.meta.isTouched &&
                      field.state.meta.errors.length ? (
                        <em className="text-red-700">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      ) : null}
                    </div>
                  </>
                )}
              />
              <input type="file" accept="image/*" />

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
