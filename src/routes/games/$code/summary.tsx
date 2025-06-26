import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games/$code/summary')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/games/$code/summary"!</div>
}
