import { Head, Form } from '@inertiajs/react';
import { useState } from 'react';

//Form arriba
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
//import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';

import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { inicio, producto } from '@/routes';
import { store } from '@/routes/producto';
import type { BreadcrumbItem } from '@/types';
import type { Producto } from '@/types/models';

import { columns } from './columns';
import { DataTable } from './data-tabla-productos';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: producto(),
    },
];

export default function vistaProducto({
    productos,
}: {
    productos: Producto[];
}) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Gestion Productos</h1>
                <p>Administra los productos del café</p>
                <div className="flex gap-2">
                    <div className="">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Nuevo Producto
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-2/4 bg-card p-4 text-card-foreground">
                                <Form
                                    {...store.form()}
                                    resetOnSuccess={[
                                        'descripcion',
                                        'categoria',
                                        'stock_actual',
                                        'stock_minimo',
                                        'precio',
                                    ]}
                                    disableWhileProcessing
                                    className="flex flex-col gap-6"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <h1 className="text-lg font-semibold">
                                                Nuevo Producto
                                            </h1>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="descripcion"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    pattern="^[\p{L}\s]+$"
                                                    autoComplete="descripcion"
                                                    name="descripcion"
                                                    placeholder="Descripcion"
                                                />
                                                <InputError
                                                    message={errors.descripcion}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <NativeSelect
                                                name="categoria"
                                                required
                                                className="w-full"
                                            >
                                                <NativeSelectOption
                                                    disabled
                                                    value="0"
                                                >
                                                    Ninguna
                                                </NativeSelectOption>
                                                <NativeSelectOption value="1">
                                                    Helados
                                                </NativeSelectOption>
                                            </NativeSelect>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="stock_actual"
                                                    type="number"
                                                    required
                                                    autoFocus
                                                    autoComplete="0"
                                                    name="stock_actual"
                                                    placeholder="Stock Actual"
                                                />
                                                <InputError
                                                    message={
                                                        errors.stock_actual
                                                    }
                                                    className="mt-2"
                                                />
                                                <Input
                                                    id="stock_minimo"
                                                    type="number"
                                                    required
                                                    autoFocus
                                                    autoComplete="0"
                                                    name="stock_minimo"
                                                    placeholder="Stock Minimo"
                                                />
                                                <InputError
                                                    message={
                                                        errors.stock_minimo
                                                    }
                                                    className="mt-2"
                                                />
                                                <Input
                                                    id="precio"
                                                    type="number"
                                                    required
                                                    autoFocus
                                                    autoComplete="0"
                                                    name="precio"
                                                    placeholder="Precio"
                                                />
                                                <InputError
                                                    message={errors.precio}
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

                                                <Button
                                                    className="w-1/2"
                                                    type="submit"
                                                >
                                                    {processing && <Spinner />}
                                                    Guardar
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <DataTable columns={columns} data={productos} />
            </div>
        </AppLayout>
    );
}
