export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

class FakeDb {
  private todos: Todo[] = [
    { userId: 1, id: 1, title: "Exemplo: estudar React", completed: false },
    { userId: 1, id: 2, title: "Exemplo: escrever testes", completed: true }
  ];

  getAll() {
    return this.todos;
  }

  getById(id: number) {
    return this.todos.find(t => t.id === id) ?? null;
  }

  create(data: { title: string; completed?: boolean; userId?: number }) {
    const maxId = this.todos.length ? Math.max(...this.todos.map(t => t.id)) : 0;
    const newTodo: Todo = {
      userId: data.userId ?? 1,
      id: maxId + 1,
      title: data.title,
      completed: !!data.completed
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, data: { title?: string; completed?: boolean }) {
    const idx = this.todos.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.todos[idx] = { ...this.todos[idx], ...data };
    return this.todos[idx];
  }

  delete(id: number) {
    const idx = this.todos.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.todos.splice(idx, 1);
    return true;
  }
}

const singleton = new FakeDb();
export default singleton;