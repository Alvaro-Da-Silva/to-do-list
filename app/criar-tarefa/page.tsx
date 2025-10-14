"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Page() {
    const form = useForm();
    
    async function fetchData() {
        
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log(data))}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>
                                Criar Tarefa
                            </FieldLegend>
                            <FieldDescription>
                                Formulário para criar uma nova tarefa.
                            </FieldDescription>
                            <FieldGroup>
                                <FormField
                                    name="title"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Título</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Título da tarefa" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <Field orientation="horizontal" className="mt-4">
                        <Button type="submit" size="sm">
                            Salvar Tarefa
                        </Button>
                        <Link href="/">
                            <Button
                                type="reset"
                                variant="outline"
                                size="sm"
                                className="ml-2"
                            >
                                Voltar
                            </Button>
                        </Link>
                    </Field>
                </form>
            </Form>
        </div>
    )
}