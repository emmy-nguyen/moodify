import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getAllMoodsQueryOptions, userQueryOptions } from "../lib/api";
import Happy from "../components/moodIcons/happy";
import Super from "../components/moodIcons/super";
import Angry from "../components/moodIcons/angry";
import Meh from "../components/moodIcons/meh";
import Sad from "../components/moodIcons/sad";
import MoodChart from "../components/mood-chart";
import MoodGaugeChart from "../components/mood-gauge-chart";
import RandomQuote from "../components/random-quote";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isPending: userLoading, data: userData } = useQuery(userQueryOptions);
  const { isPending: moodsLoading, data: moodsData } = useQuery(
    getAllMoodsQueryOptions
  );

  if (userLoading || moodsLoading) return "Loading...";
  const recentMood = moodsData?.moods[0];

  return (
    <>
      <div className="space-y-6 p-4 bg-[#f5f0ec] md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              Hello, {userData?.user ? userData?.user.given_name : "Guest"}!
            </h1>
            <p className="text-muted-foreground">How are you feeling today?</p>
          </div>
          <a
            href="/create-mood"
            className="bg-[#181818] hover:bg-[#181818]/90 text-white text-sm font-semi py-2 px-4 rounded-lg transition duration-300"
          >
            Log Today's Mood
          </a>
        </header>

        {/* Mood Overview */}
        <section className="grid gap-4">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Your Last Mood</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
              {userData?.user && recentMood ? (
                <>
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 text-lg">
                      {recentMood.mood === "happy" ? (
                        <>
                          <Happy /> <span className="ml-2">Happy</span>
                        </>
                      ) : recentMood.mood === "super" ? (
                        <>
                          <Super /> <span className="ml-2">Super</span>
                        </>
                      ) : recentMood.mood === "angry" ? (
                        <>
                          <Angry /> <span className="ml-2">Angry</span>
                        </>
                      ) : recentMood.mood === "meh" ? (
                        <>
                          <Meh /> <span className="ml-2">Meh</span>
                        </>
                      ) : recentMood.mood === "sad" ? (
                        <>
                          <Sad /> <span className="ml-2">Sad</span>
                        </>
                      ) : (
                        "No mood yet"
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start mt-4">
                    <div
                      className={`flex items-center justify-center rounded-lg ${recentMood.category === "project" ? "bg-yellow-200" : recentMood.category === "exam" ? "bg-blue-200" : recentMood.category === "study" ? "bg-green-200" : recentMood.category === "class" ? "bg-red-200" : recentMood.category === "assignment" ? "bg-purple-200" : "bg-gray-200"} w-[100px]`}
                    >
                      {recentMood.category}
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Date & Time:</span>{" "}
                      {recentMood.time} -{" "}
                      {new Date(
                        `${recentMood.date.split("T")[0]}T00:00:00`
                      ).toDateString()}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">Note:</span>{" "}
                      {recentMood.notes}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500">
                  You need to log in to see your mood
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Calendar />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Mood Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <MoodChart />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Mood Count</CardTitle>
            </CardHeader>
            <CardContent>
              <MoodGaugeChart />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Tip of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <RandomQuote />
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
