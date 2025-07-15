import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_layout/game-rooms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_layout/game-rooms"!</div>
}
