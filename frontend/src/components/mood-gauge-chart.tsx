import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getAllMoodsQueryOptions } from "../lib/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Super from "../components/moodIcons/super.tsx";
import Happy from "../components/moodIcons/happy.tsx";
import Meh from "../components/moodIcons/meh.tsx";
import Sad from "../components/moodIcons/sad.tsx";
import Angry from "../components/moodIcons/angry.tsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const moods = [
  { label: "super", icon: <Super />, color: "#9dce9a" },
  { label: "happy", icon: <Happy />, color: "#f9c84b" },
  { label: "meh", icon: <Meh />, color: "#ffb299" },
  { label: "sad", icon: <Sad />, color: "#ff7b7f" },
  { label: "angry", icon: <Angry />, color: "#97a0a3" },
];

const MoodGaugeChart = () => {
  const { isPending, error, data } = useQuery(getAllMoodsQueryOptions);
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.moods || data.moods.length === 0) {
    return (
      <div className="flex items-center justify-center bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 text-center">
          We need more data to draw this chart. <br /> Check back soon! 👋
        </p>
      </div>
    );
  }
  const moodCounts = moods.map((mood) => {
    return data.moods.filter((entry: any) => entry.mood === mood.label).length;
  });

  const totalMoods = moodCounts.reduce((acc, count) => acc + count, 0);

  const chartData = {
    labels: moods.map((m) => m.label),
    datasets: [
      {
        data: moodCounts,
        backgroundColor: moods.map((m) => m.color),
        borderWidth: 0,
        borderRadius: 10,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw} entries`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="relative w-full h-[180px] flex items-center justify-center">
        <Doughnut data={chartData} options={chartOptions} />
        {totalMoods > 0 && (
          <div className="absolute top-0 transform translate-y-[100px] text-4xl font-bold text-gray-600">
            {totalMoods}
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {moods.map((mood, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-lg">{mood.icon}</span>
            <span className="text-xs text-gray-600">{mood.label}</span>
            <span className="text-sm font-semibold">{moodCounts[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodGaugeChart;
