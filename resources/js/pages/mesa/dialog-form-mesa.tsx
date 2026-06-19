import { Form } from '@inertiajs/react';
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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/mesa';
import type { Mesa } from '@/types/models';

export default function DialogFormMesa({ mesa }: { mesa: Mesa }) {
    const [dialogOpen, setDialogOpen] = useState(true);
    const [formData, setFormData] = useState({
        numero: mesa.numero,
        capacidad: mesa.capacidad,
    });

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Editar Mesa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <Form
                    {...update.form({ mesa: mesa.id })}
                    resetOnSuccess={['numero', 'capacidad']}
                    onSuccess={() => setDialogOpen(false)}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Modificar Mesa</DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <Input
                                        id="numero"
                                        type="number"
                                        required
                                        autoFocus
                                        name="numero"
                                        placeholder="N° Mesa"
                                        value={formData.numero}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                numero: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.numero}
                                        className="mt-2"
                                    />
                                </Field>
                                <Field>
                                    <Input
                                        id="capacidad"
                                        type="number"
                                        required
                                        name="capacidad"
                                        placeholder="Capacidad"
                                        value={formData.capacidad}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                capacidad: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.capacidad}
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
                                    Guardar
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
