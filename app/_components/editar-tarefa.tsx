import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

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

    React.useEffect(() => {
        if (open) {
            form.reset({ title, status });
        }
    }, [open, title, status]);

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
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="flex items-center justify-center p-6 bg-sky-50 md:w-20">
                        <div className="rounded-full bg-white p-2 shadow-sm">
                            <Edit className="size-7 text-sky-600" />
                        </div>
                    </div>

                    <div className="p-6 flex-1">
                        <DialogHeader className="p-0 mb-1">
                            <DialogTitle className="text-lg font-semibold">Editar Tarefa</DialogTitle>
                        </DialogHeader>

                        <div className="text-sm text-muted-foreground mb-4">
                            <p>Altere as informações da tarefa.</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="space-y-3">
                                    <FormField
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input autoFocus placeholder="Nome da tarefa" {...field} required />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center gap-3">
                                                        <Checkbox checked={!!field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} className="h-5 w-5 rounded border-primary/50" />
                                                        <span className="select-none">Concluída</span>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-4 flex justify-end gap-2">
                                    <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange?.(false)} disabled={submitting}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" size="sm" disabled={submitting}>
                                        {submitting ? 'Salvando...' : 'Salvar'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}