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
import { destroy } from '@/routes/producto';
import type { Producto } from '@/types/models';

export default function DialogFormBajaProducto({
    producto,
}: {
    producto: Producto;
}) {
    const [open, setOpen] = useState(false);
    const form = useForm({
        motivo_baja: '',
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
                        producto: producto,
                    })}
                    resetOnSuccess={['producto_vigente', 'motivo_baja']}
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
                                    <FieldLabel>
                                        {producto.descripcion}
                                    </FieldLabel>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="motivo_baja">
                                        Ingrese el motivo de la baja
                                    </FieldLabel>
                                    <Input
                                        id="motivo_baja"
                                        type="text"
                                        name="motivo_baja"
                                        placeholder="Motivo Baja"
                                        onChange={(e) =>
                                            setData(
                                                'motivo_baja',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.motivo_baja}
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
