import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_authenticated/game-rooms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_authenticated/game-rooms"!</div>
}
