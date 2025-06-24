import { useUserID } from "@/integrations/zustand/store/user.store";
import { WebSocketProvider } from "@/ws/websocketProvider";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$code")({
  component: RouteComponent,
});

function RouteComponent() {
  const { code } = Route.useParams();
  const playerID = useUserID();
  return (
    <WebSocketProvider
      code={code}
      playerID={playerID}
      onMessage={(msg) => {
        console.log(msg);
      }}
    >
      <Outlet />
    </WebSocketProvider>
  );
}
