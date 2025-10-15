import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface EditarTarefaProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    status: boolean;
}

type FormValues = {
    title: string;
    status: boolean;
}

export default function EditarModal({ open, onOpenChange, title, status }: EditarTarefaProps) {
    const form = useForm<FormValues>({ defaultValues: { title, status } });
    const [submitting, setSubmitting] = React.useState(false);

    async function onSubmit(data: FormValues) {
        try {
            setSubmitting(true);
            console.log('Atualizando', data);
            toast.success('Tarefa atualizada com sucesso!', { closeButton: true });
            form.reset();
            onOpenChange?.(false);
        } catch (error) {
            console.error('Erro ao atualizar a tarefa:', error);
            toast.error('Erro ao atualizar a tarefa.', { closeButton: true });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <DialogHeader>
                                <DialogTitle>Editar Tarefa</DialogTitle>
                                <DialogDescription>Edite os detalhes da tarefa</DialogDescription>
                            </DialogHeader>

                            <FieldGroup>
                                <FormField
                                    name="title"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Input autoFocus placeholder="Nome da tarefa" {...field} required />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                                <FormField
                                    name="status"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-1">
                                                        <Checkbox className="rounded-md border-primary/50" />
                                                        <span className="select-none">Concluída</span>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FieldGroup>
                        </FieldGroup>

                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => onOpenChange?.(false)}
                                disabled={submitting}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={submitting}
                            >
                                {submitting ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}