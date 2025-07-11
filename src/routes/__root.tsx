import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner.tsx";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        <Outlet />
      </div>
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
      <Toaster richColors />
    </>
  ),
});
