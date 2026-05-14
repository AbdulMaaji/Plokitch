import { api } from '@/lib/api'

export default async function Page() {
  const todos = await api.todos.list()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Todos</h1>
      <ul className="space-y-2">
        {todos?.map((todo: any) => (
          <li key={todo.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
            {todo.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
