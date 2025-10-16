"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DeleteModal from "./_components/deletar-tarefa-modal";
import CreateModal from "./_components/criar-tarefa-modal";
import EditarModal from "./_components/editar-tarefa";
import Render from "@/components/Render";
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCriar, setShowCriar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Todo[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data.slice(0, 10)); 
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Falha ao carregar os dados");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(todo: Todo) {
    setSelectedTodo(todo);
    setShowEditar(true);
  }

  function handleDelete(todo: Todo) {
    setSelectedTodo(todo);
    setShowExcluir(true);
  }

  function handleTaskCreated(newTodo?: any) {
    console.log('handleTaskCreated chamado com:', newTodo);
    if (newTodo) {
      console.log('Adicionando nova tarefa à lista');
      setTodos(prev => {
        // Encontrar o maior ID atual e incrementar
        const maxId = prev.length > 0 ? Math.max(...prev.map(todo => todo.id)) : 0;
        const nextId = maxId + 1;
        
        const taskWithSequentialId = {
          ...newTodo,
          id: nextId
        };
        console.log('Tarefa com ID sequencial:', taskWithSequentialId);
        
        // Adicionar no final da lista
        const newList = [...prev, taskWithSequentialId];
        console.log('Nova lista:', newList.length, 'itens');
        return newList;
      });
    } else {
      console.log('Recarregando lista completa');
      fetchData();
    }
  }

  function handleTaskUpdated(updatedTodo: any) {
    console.log('handleTaskUpdated chamado com:', updatedTodo);
    setTodos(prev => 
      prev.map(todo => 
        todo.id === updatedTodo.id 
          ? { ...todo, title: updatedTodo.title, completed: updatedTodo.completed }
          : todo
      )
    );
  }

  function handleTaskDeleted(deletedId: number) {
    console.log('handleTaskDeleted chamado com ID:', deletedId);
    setTodos(prev => prev.filter(todo => todo.id !== deletedId));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function toggleCompleted(id: number) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }


  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col mb-2 gap-6">
            <div>
              <h1 className="text-2xl font-bold">Minhas Tarefas</h1>
              <p className="text-sm text-muted-foreground">Gerencie suas tarefas rapidamente</p>
            </div>

            <Button
              variant="default"
              size="sm"
              className="flex items-center w-min"
              onClick={() => setShowCriar(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          </header>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4">
              <Table>
                <TableCaption>Lista de afazeres</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell className="w-16">ID</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell className="w-40">Status</TableCell>
                    <TableCell className="w-36">Ações</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={4}>Carregando...</TableCell>
                    </TableRow>
                  )}

                  {error && (
                    <TableRow>
                      <TableCell colSpan={4}>{error}</TableCell>
                    </TableRow>
                  )}

                  {!loading && !error && todos.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4}>Nenhuma tarefa encontrada</TableCell>
                    </TableRow>
                  )}

                  {todos.map((todo) => (
                    <Render
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      onToggle={toggleCompleted}
                      onEdit={() => handleEdit(todo)}
                      onDelete={() => handleDelete(todo)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <CreateModal open={showCriar} onOpenChange={setShowCriar} onSuccess={handleTaskCreated} />
      <EditarModal 
        open={showEditar} 
        onOpenChange={setShowEditar} 
        id={selectedTodo?.id ?? 0}
        title={selectedTodo?.title ?? ''} 
        status={selectedTodo?.completed ?? false}
        onSuccess={handleTaskUpdated}
      />
      <DeleteModal 
        open={showExcluir} 
        onOpenChange={setShowExcluir} 
        id={selectedTodo?.id ?? 0}
        onSuccess={handleTaskDeleted}
      />
    </>
  );
}
