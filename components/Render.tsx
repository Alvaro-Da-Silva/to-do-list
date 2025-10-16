import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { Pencil, TrashIcon } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "./ui/button";
import React from "react";

type Props = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function Render({ id, title, completed, onToggle, onEdit, onDelete }: Props) {
  return (
    <TableRow
      className={clsx("transition-color duration-200", { "bg-chart-2/40 hover:bg-chart-2/30": completed })}
    >
      <TableCell className="rounded-l-md font-medium">{id}</TableCell>
      <TableCell className="truncate max-w-[40ch]">{title}</TableCell>
      <TableCell>
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className={clsx("cursor-pointer", completed ? "text-chart-2" : "border-primary")}
        />
      </TableCell>
      <TableCell className="rounded-r-md">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label={`Editar ${id}`}
            className="border border-muted-foreground/50"
            onClick={onEdit}
          >
            <Pencil />
          </Button>
          <Button variant="destructive" size="icon" aria-label={`Remover ${id}`} onClick={onDelete}>
            <TrashIcon />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}