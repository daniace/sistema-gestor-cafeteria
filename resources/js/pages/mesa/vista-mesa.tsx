import { Head, Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { inicio } from '@/routes';
import { index as mesaIndex, store } from '@/routes/mesa';
import type { BreadcrumbItem } from '@/types';
import type { Mesa as MesaType } from '@/types/models';
import { columns } from './columns';
import { DataTable } from './data-tabla-mesas';
import DialogFormMesa from './dialog-form-mesa';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: inicio() },
    { title: 'Mesas', href: mesaIndex() },
];

export default function VistaMesa({
    mesas,
    editMesa,
}: {
    mesas: MesaType[];
    editMesa?: MesaType;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mesas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Gestión de Mesas</h1>
                <p>Administra las mesas del café</p>

                <div className="mt-4">
                    <Card className="w-2/4 bg-card p-4 text-card-foreground">
                        <Form
                            {...store.form()}
                            resetOnSuccess={['numero', 'capacidad']}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <h1 className="text-lg font-semibold">
                                        Nueva Mesa
                                    </h1>
                                    <div className="flex gap-2">
                                        <Input
                                            id="numero"
                                            type="number"
                                            required
                                            autoFocus
                                            name="numero"
                                            placeholder="N° Mesa"
                                        />
                                        <InputError
                                            message={errors.numero}
                                            className="mt-2"
                                        />
                                        <Input
                                            id="capacidad"
                                            type="number"
                                            required
                                            name="capacidad"
                                            placeholder="Capacidad"
                                        />
                                        <InputError
                                            message={errors.capacidad}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            className="w-1/2"
                                            variant="secondary"
                                            type="reset"
                                        >
                                            Limpiar
                                        </Button>
                                        <Button className="w-1/2" type="submit">
                                            {processing && <Spinner />}
                                            Guardar
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </Card>
                </div>

                <DataTable columns={columns} data={mesas} />
            </div>

            {editMesa && <DialogFormMesa mesa={editMesa} />}
        </AppLayout>
    );
}
