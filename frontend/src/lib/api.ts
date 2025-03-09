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
  await new Promise((r) => setTimeout(r, 5000));
  const res = await api.mood.$post({ json: value });
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

export async function deleteMood({ id }: { id: number }) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.mood[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });
  if (!res.ok) {
    throw new Error("Server error");
  }
}

export async function updateMood({
  id,
  values,
}: {
  id: number;
  values: CreateMood;
}) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.mood[":id{[0-9]+}"].$put({
    param: { id: id.toString() },
    json: values,
  });
  if (!res.ok) {
    throw new Error("Server error");
  }
  const updatedMood = await res.json();
  return updatedMood;
}
export async function getQuote() {
  const res = await api.quote.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const getQuoteQueryOptions = queryOptions({
  queryKey: ["get-quote"],
  queryFn: getQuote,
  staleTime: 1000 * 60 * 60 * 12,
});
