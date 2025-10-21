"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, TrashIcon } from "lucide-react";
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
  const [showCriar, setShowCriar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  //aqui vai o getData(GET)


  useEffect(() => {
    getData();
  }, []);

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

                  {/* Aqui vai o map */}

                  <TableRow>
                    <TableCell className="rounded-l-md font-medium">
                      {/* Aqui vai o ID da tarefa */}

                    </TableCell>
                    <TableCell className="truncate max-w-[40ch]">
                      {/* Aqui vai o título da tarefa */}

                    </TableCell>
                    <TableCell>
                      {/* Aqui vai verificação de status da tarefa */}
                      { ? (
                        <span className="text-green-600 font-medium">Concluída</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pendente</span>
                      )}
                    </TableCell>
                    <TableCell className="rounded-r-md">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border border-muted-foreground/50"
                          // Aqui vai o onClick de editar tarefa
                          onClick={ }
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          // Aqui vai o onClick de deletar tarefa
                          onClick={ }
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <CreateModal
        open={showCriar}
        onOpenChange={setShowCriar}
        // Em caso de sucesso, chamar o getData novamente
        onSuccess={ }
      />

      <EditarModal
        open={showEditar}
        onOpenChange={setShowEditar}
        id={selectedTodo?.id ?? 0}
        title={selectedTodo?.title ?? ''}
        status={selectedTodo?.completed ?? false}
        // Em caso de sucesso, chamar o getData novamente
        onSuccess={ }
      />

      <DeleteModal
        open={showExcluir}
        onOpenChange={setShowExcluir}
        id={selectedTodo?.id ?? 0}
        // Em caso de sucesso, chamar o getData novamente
        onSuccess={ }
      />
    </>
  );
}
