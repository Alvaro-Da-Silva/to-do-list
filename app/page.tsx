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
import { Pencil, Plus, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import DeleteModal from "./_components/deletar-tarefa-modal";
import CreateModal from "./_components/criar-tarefa-modal";
import EditarModal from "./_components/editar-tarefa";

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

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Todo[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data.slice(0, 100));
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Falha ao carregar os dados");
    } finally {
      setLoading(false);
    }
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
                    <TableRow key={todo.id}
                      className={clsx(
                        "transition-color duration-200",
                        { 'bg-chart-2/40 hover:bg-chart-2/30': todo.completed }
                      )}
                    >
                      <TableCell className="rounded-l-md font-medium">{todo.id}</TableCell>
                      <TableCell className="truncate max-w-[40ch]">
                        {todo.title}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleCompleted(todo.id)}
                          className={clsx("cursor-pointer", todo.completed ? 'text-chart-2' : 'border-primary')}
                        />
                      </TableCell>
                      <TableCell className="rounded-r-md">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label={`Editar ${todo.id}`}
                            className="border border-muted-foreground/50"
                            onClick={() => setShowEditar(true)}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            aria-label={`Remover ${todo.id}`}
                            onClick={() => setShowExcluir(true)}
                          >
                            <TrashIcon />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <CreateModal open={showCriar} onOpenChange={setShowCriar} />
      <EditarModal open={showEditar} onOpenChange={setShowEditar} />
      <DeleteModal open={showExcluir} onOpenChange={setShowExcluir} />
    </>
  );
}
