import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_layout/questions")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/_layout/questions"!</div>;
}
