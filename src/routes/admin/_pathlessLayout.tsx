import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_pathlessLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_pathlessLayout"!</div>
}
