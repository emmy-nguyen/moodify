import { createFileRoute } from "@tanstack/react-router";
// import "./App.css";
// import { api } from "./lib/api";
// import { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";

export const Route = createFileRoute("/")({
  component: Index,
});
// async function getTotalSpent() {
//   const result = await api.mood["total-spent"].$get();
//   if (res.ok) {
//     throw new Error("server error");
//   }
//   const data = await res.json();
//   return;
// }
function Index() {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["get-total-spent"],
  //   queryFn: getTotalSpent,
  // });
  // if (isPending) return "Loading...";
  // if (error) return "An error occurred";

  return (
    <>
      <div className="space-y-6 p-4 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Hello, Jane!</h1>
            <p className="text-muted-foreground">How are you feeling today?</p>
          </div>
          <Button className="bg-primary">Log Today's Mood</Button>
        </header>

        {/* Mood Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Mood Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Your last mood: 😊 Happy (8/10)</p>
              {/*  <Line data={moodTrendData} /> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4">
                <li>You've felt mostly happy this week!</li>
                <li>Tuesday was your best day.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Calendar */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
              // onDayClick={(day) => console.log("Selected Day:", day)}
              // modifiers={{
              //   logged: moods?.calendarDays.map((day) => new Date(day.date)),
              // }}
              // modifiersClassNames={{
              //   logged: "bg-primary text-white",
              // }}
              />
            </CardContent>
          </Card>
        </section>

        {/* Daily Tip */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Tip of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic">
                "Take a deep breath and enjoy the little things in life 🌱."
              </p>
              <Button variant="link">Explore Exercises</Button>
            </CardContent>
          </Card>
        </section>

        {/* Shortcuts */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <Button variant="ghost" className="w-full">
                View Full Analytics
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Button variant="ghost" className="w-full">
                Explore Mental Health Exercises
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Button variant="ghost" className="w-full">
                Upcoming Events & Reminders
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

// export default function Home() {
// const { data: moods } = useQuery(["moods"], fetchMoodData);

// const moodTrendData = {
//   labels: moods?.last7Days.map((day) => day.date) || [],
//   datasets: [
//     {
//       label: "Mood Trend",
//       data: moods?.last7Days.map((day) => day.score) || [],
//       borderColor: "#4ade80", // Green color for mood trend
//       backgroundColor: "rgba(74, 222, 128, 0.2)",
//     },
//   ],
// };

//   return (

//   );
// }

// Mock fetch function for moods
// async function fetchMoodData() {
//   return {
//     last7Days: [
//       { date: "Mon", score: 7 },
//       { date: "Tue", score: 8 },
//       { date: "Wed", score: 6 },
//       { date: "Thu", score: 5 },
//       { date: "Fri", score: 7 },
//       { date: "Sat", score: 9 },
//       { date: "Sun", score: 8 },
//     ],
//     calendarDays: [
//       { date: "2024-11-13", mood: "Happy" },
//       { date: "2024-11-14", mood: "Stressed" },
//     ],
//   };
// }
