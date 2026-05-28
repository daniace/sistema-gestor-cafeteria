import { Head, Form } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard, producto } from '@/routes';
import { TableActions } from './tabla-productos';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { store } from '@/routes/producto';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productardo',
        href: producto(),
    },
    {
        title: 'GODINESSS',
        href: dashboard(),
    },
];

export default function vistaProducto({ productos }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Gestion Usuarios</h1>
                <p>Administra el acceso y roles del personal del café</p>
                <div className="flex gap-2">
                    <div className="w-10/12">
                        <TableActions productos={productos} />
                    </div>

                    <div className="mt-4">
                        <Card className="w-full bg-card p-4 text-card-foreground">
                            <Form
                                {...store.form()}
                                resetOnSuccess={[
                                    'password',
                                    'password_confirmation',
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
                                                selected
                                                value="ninguna"
                                            >
                                                Ninguna
                                            </NativeSelectOption>
                                            <NativeSelectOption value="helados">
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
                                                name="stockactual"
                                                placeholder="StockActual"
                                            />
                                            <InputError
                                                message={errors.stock_actual}
                                                className="mt-2"
                                            />
                                            <Input
                                                id="stock_minimo"
                                                type="number"
                                                required
                                                autoFocus
                                                autoComplete="0"
                                                name="stockminimo"
                                                placeholder="StockMinimo"
                                            />
                                            <InputError
                                                message={errors.stock_minimo}
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
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
