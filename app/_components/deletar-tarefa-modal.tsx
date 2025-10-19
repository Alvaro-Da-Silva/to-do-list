import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CircleAlert } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import axios from "axios";

interface DeleteModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    id: number;
    onSuccess?: (deletedId: number) => void;
}

export default function DeleteModal({ open, onOpenChange, id, onSuccess }: DeleteModalProps) {
    const [deleting, setDeleting] = React.useState(false);

//aqui vai a handleDelete(DELETE)
    

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-sm p-0 overflow-hidden'>
                <div className='flex flex-col md:flex-row'>
                    <div className='flex items-center justify-center p-6 bg-red-50 md:w-20'>
                        <div className="rounded-full bg-white p-2 shadow-sm">
                            <CircleAlert className='size-8 text-red-600' />
                            </div>
                    </div>

                    <div className='p-6 flex-1'>
                        <DialogHeader className='p-0 mb-2'>
                            <DialogTitle className='text-lg font-medium'>Excluir Tarefa</DialogTitle>
                        </DialogHeader>

                        <div className='text-sm text-muted-foreground mb-4'>
                            <p>Tem certeza de que deseja excluir esta tarefa? Esta ação não pode ser desfeita.</p>
                        </div>

                        <DialogFooter className="p-0 mt-4 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onOpenChange?.(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Excluindo..." : "Excluir"}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}