"use client";

import Image from "next/image";
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
import Link from "next/link";

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

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Todo[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data.slice(0, 20)); // limitar para 20 itens por padrão
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Falha ao carregar os dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Link href="/criar-tarefa">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Adicionar Tarefa</span>
          </Button>
        </Link>
      </div>
      <Table>
        <TableCaption>Lista de afazeres</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Concluído</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={3}>Carregando...</TableCell>
            </TableRow>
          )}

          {error && (
            <TableRow>
              <TableCell colSpan={3}>{error}</TableCell>
            </TableRow>
          )}

          {!loading && !error && todos.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>Nenhuma tarefa encontrada</TableCell>
            </TableRow>
          )}

          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.completed ? "Sim" : "Não"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
