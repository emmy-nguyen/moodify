import { hc } from "hono/client";
import { type ApiRoutes } from "../../../server/app";
import { queryOptions } from "@tanstack/react-query";
import { CreateMood } from "../../../server/sharedTypes";
const client = hc<ApiRoutes>("/");

export const api = client.api;
async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  console.log("getCurrentUser", data);
  return data;
}
export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export async function getAllMoods() {
  const res = await api.mood.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const getAllMoodsQueryOptions = queryOptions({
  queryKey: ["get-all-moods"],
  queryFn: getAllMoods,
  staleTime: 1000 * 60 * 5,
});

export async function createMood({ value }: { value: CreateMood }) {
  const res = await api.mood.$post({ json: value });
  console.log(res);
  if (!res.ok) {
    throw new Error("Server error");
  }

  const newMood = await res.json();
  return newMood;
}

export const loadingCreateMoodOptions = queryOptions<{
  mood?: CreateMood;
}>({
  queryKey: ["loading-create-mood"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});
