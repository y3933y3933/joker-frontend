import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games/$code/lobby')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/games/$code/lobby"!</div>
}
