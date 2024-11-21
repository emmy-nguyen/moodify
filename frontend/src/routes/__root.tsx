import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { type QueryClient } from "@tanstack/react-query";
import { Toaster } from "../components/ui/sonner";

interface MyRouterContext {
  queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  return (
    <div className="p-2 flex gap-2 max-x-2xl m-auto">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/all-moods" className="[&.active]:font-bold">
        All Moods
      </Link>
      <Link to="/create-mood" className="[&.active]:font-bold">
        Log Today's Mood
      </Link>
      <Link to="/profile" className="[&.active]:font-bold">
        Profile
      </Link>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2 gap-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}
