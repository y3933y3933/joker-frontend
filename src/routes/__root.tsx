import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <Toaster richColors />
    </>
  ),
});
