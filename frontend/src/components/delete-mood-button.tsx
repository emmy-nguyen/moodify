import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMood, getAllMoodsQueryOptions } from "../lib/api";
import { toast } from "sonner";

export default function DeleteMoodButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMood,
    onError: () => {
      toast("Error", {
        description: `Failed to delete mood: ${id}`,
      });
    },
    onSuccess: () => {
      toast("Success", {
        description: `Mood deleted: ${id}`,
      });
      queryClient.setQueryData(
        getAllMoodsQueryOptions.queryKey,
        (existingMoods) => ({
          ...existingMoods,
          moods: existingMoods!.moods.filter((e) => e.id !== id),
        })
      );
    },
  });
  return (
    <>
      <Button
        disabled={mutation.isPending}
        variant="outline"
        size="icon"
        className="cursor-pointer ml-auto mr-4"
        onClick={() => mutation.mutate({ id })}
      >
        {mutation.isPending ? "..." : <Trash2 className="h-4 w-4 /" />}
      </Button>
    </>
  );
}
