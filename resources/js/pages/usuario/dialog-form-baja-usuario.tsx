import { Form, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { destroy } from '@/routes/usuario';
import type { User } from '@/types/auth';

export default function DialogFormBajaUsuario({ usuario }: { usuario: User }) {
    const [open, setOpen] = useState(false);
    const form = useForm({
        causa_eliminacion: '',
    });
    const { setData, errors, processing } = form;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Eliminar</Button>
            </DialogTrigger>
            <DialogContent>
                <Form
                    {...destroy.form({
                        user: usuario,
                    })}
                    resetOnSuccess={[
                        'estado_cuenta_usuario',
                        'causa_eliminacion',
                    ]}
                    onSuccess={() => setOpen(false)}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {() => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Eliminar Producto</DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                                <Field className="flex gap-2">
                                    <FieldLabel>{usuario.nombre}</FieldLabel>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="causa_eliminacion">
                                        Ingrese el motivo de la baja
                                    </FieldLabel>
                                    <Input
                                        id="causa_eliminacion"
                                        type="text"
                                        name="causa_eliminacion"
                                        placeholder="Causa de la Eliminación"
                                        onChange={(e) =>
                                            setData(
                                                'causa_eliminacion',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.causa_eliminacion}
                                        className="mt-2"
                                    />
                                </Field>
                            </FieldGroup>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button className="w-1/2" type="submit">
                                    {processing && <Spinner />}
                                    Confirmar
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
