import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "../lib/api";
// src/routes/_authenticated.tsx

const Login = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full text-center mt-4 items-center justify-center">
        <p className="text-gray-600 mb-4">You have to log in!</p>
        <a
          href="/api/login"
          className="bg-black hover:bg-yellow-500 text-white text-sm font-semi py-2 px-4 rounded-lg transition duration-300"
        >
          Login
        </a>
      </div>
    </div>
  );
};
const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
