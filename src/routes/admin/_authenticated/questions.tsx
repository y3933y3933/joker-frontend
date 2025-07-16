import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_authenticated/questions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/_authenticated/questions"!</div>
}
