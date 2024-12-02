import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getAllMoodsQueryOptions,
  loadingCreateMoodOptions,
} from "../../lib/api";
import Super from "../../components/moodIcons/super";
import Happy from "../../components/moodIcons/happy";
import Meh from "../../components/moodIcons/meh";
import Sad from "../../components/moodIcons/sad";
import Angry from "../../components/moodIcons/angry";
import { Skeleton } from "../../components/ui/skeleton";
import DeleteMoodButton from "../../components/delete-mood-button";
import { Pencil } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import EditMoodModal from "../../components/edit-modal";
interface Mood {
  id: number;
  userId: string;
  time: string;
  date: string;
  mood: string | null;
  categoryId?: number | null;
  notes?: string | null;
}

interface GroupedMoodByDate {
  [date: string]: Mood[];
}
export const Route = createFileRoute("/_authenticated/all-moods")({
  component: AllMoods,
});

function AllMoods() {
  const { isPending, error, data } = useQuery(getAllMoodsQueryOptions);
  const { data: loadingCreateMood } = useQuery(loadingCreateMoodOptions);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [editMood, setEditMood] = useState<Mood | null>(null);

  const openModal = (mood: Mood) => {
    setModalIsOpen(true);
    setEditMood(mood);
  };
  console.log("editMood", editMood);

  const closeModal = () => {
    setModalIsOpen(false);
    setEditMood(null);
  };

  let sortedMoodsByDate = data?.moods || [];
  console.log("data", data);

  if (!sortedMoodsByDate || sortedMoodsByDate === undefined) {
    sortedMoodsByDate = [];
    console.log("No moods found");
  }
  sortedMoodsByDate.sort((a, b) => {
    const dateB = new Date(b.date);
    const dateA = new Date(a.date);
    return dateB.getTime() - dateA.getTime();
  });

  const groupedMoodsByDate = sortedMoodsByDate.reduce((acc, mood) => {
    const date = new Date(mood.date).toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(mood);
    return acc;
  }, {} as GroupedMoodByDate);
  if (error) return <div>"An error occurred"</div>;

  const renderMoodIcon = (mood: string | null) => {
    switch (mood) {
      case "super":
        return <Super />;
      case "happy":
        return <Happy />;
      case "meh":
        return <Meh />;
      case "sad":
        return <Sad />;
      case "angry":
        return <Angry />;
      default:
        return null;
    }
  };
  return (
    <>
      {/* skeleton here */}
      {loadingCreateMood?.mood && (
        <div className="mt-4">
          <div className="w-full flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 " />
              <Skeleton className="h-4 " />
            </div>
          </div>
        </div>
      )}
      {isPending ? (
        "..."
      ) : (
        <div className="mt-4">
          {Object.keys(groupedMoodsByDate).map((date) => (
            <div className="w-full rounded-lg border-[1px] mb-4">
              <div key={date}>
                <div className="w-full bg-[#FEF0D3] rounded-t-lg flex items-center justify-start">
                  <h2 className="text-[#E5B73F] text-lg p-2">{date}</h2>
                </div>
                <div className="my-2">
                  {groupedMoodsByDate[date].map((mood) => (
                    <div key={mood.id} className="grid grid-cols-5 p-2">
                      <div className="flex items-center justify-center">
                        {renderMoodIcon(mood.mood)}
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-row items-center">
                          <p className="mr-4 font-semibold text-xl text-[#E5B73F]">
                            {mood.mood}
                          </p>
                          <p>{mood.time}</p>
                        </div>
                        <p>Notes: {mood.notes}</p>
                        <div>category</div>
                      </div>
                      <div></div>
                      <div></div>
                      <div className="flex flex-col gap-y-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="cursor-pointer ml-auto mr-4"
                          onClick={() => openModal(mood)}
                        >
                          <Pencil className="h-4 w-4 /" />
                        </Button>
                        <DeleteMoodButton id={mood.id} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && <EditMoodModal data={editMood} onClose={closeModal} />}
    </>
  );
}
