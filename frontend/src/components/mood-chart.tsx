import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getAllMoodsQueryOptions } from "../lib/api";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";

// register ChartJS's elements
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

// mapping emojis to numbers, add 0 & 6 for chart's gap
const moodEmojis: Record<number, string> = {
  6: "",
  5: "😍",
  4: "😊",
  3: "😐",
  2: "😢",
  1: "😡",
  0: "",
};

// mapping mood string to number
const moodMap: Record<string, { value: number }> = {
  super: { value: 5 },
  happy: { value: 4 },
  meh: { value: 3 },
  sad: { value: 2 },
  angry: { value: 1 },
};

const MoodChart = () => {
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

  // date & mood values
  const chartLabels = data.moods.map((mood: any) => mood.date);
  const chartDataValues = data.moods.map(
    (mood: any) => moodMap[mood.mood]?.value || 3
  );

  // chartConfig using tick callback to show emoji on Y
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date", color: "#666" },
        grid: { display: false },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 30, // show data in 30 days
        },
      },
      y: {
        title: { display: true, text: "Mood", color: "#666" },
        min: 0, // min range of Y
        max: 6, // max range of Y
        grid: { color: "rgba(200, 200, 200, 0.3)" },
        ticks: {
          font: { size: 18 }, // emoji size
          callback: (value) => moodEmojis[value as number] || "", // show emojis instead of numbers
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="h-64">
        <Line
          data={{
            labels: chartLabels,
            datasets: [
              {
                label: "Moods",
                data: chartDataValues,
                backgroundColor: "rgba(75, 192, 192, 0.1)",
                borderColor: "rgba(75, 192, 192, 0.8)",
                borderWidth: 2,
                tension: 0.3,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointRadius: 4,
                spanGaps: true,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default MoodChart;
