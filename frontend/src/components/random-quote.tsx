import { useQuery } from "@tanstack/react-query";
import { getQuoteQueryOptions } from "../lib/api";

const RandomQuote = () => {
  const { data, isLoading, error } = useQuery(getQuoteQueryOptions);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching quote</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <blockquote
        className={`italic text-gray-700 text-lg ${error ? "text-red-500" : ""}`}
      >
        {data?.quote || "No quote available"}
      </blockquote>
      <p className="mt-2 text-sm text-gray-500">{data?.author || "Unknown"}</p>
    </div>
  );
};
export default RandomQuote;
