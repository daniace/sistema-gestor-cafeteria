import { Head, Form } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent  } from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';

import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { producto } from '@/routes';
import { store } from '@/routes/producto';
import type { BreadcrumbItem } from '@/types';
import type { CategoriaProducto, Producto } from '@/types/models';

import { columns } from './columns';
import { DataTable } from './data-tabla-productos';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: producto(),
    },
];

const stockChartConfig = {
    stock_actual: {
        label: 'Stock Actual',
        color: 'var(--color-chart-1)',
    },
    stock_minimo: {
        label: 'Stock Mínimo',
        color: 'var(--color-chart-2)',
    },
    critico: {
        label: 'Estado Crítico',
        color: 'var(--color-destructive)',
    },
} satisfies ChartConfig;

export default function VistaProducto({
    productos,
    categorias,
}: {
    productos: Producto[];
    categorias: CategoriaProducto[];
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pageProductos, setPageProductos] = useState<Producto[]>([]);

    const activos = useMemo(
        () => productos.filter((p) => p.producto_esta_vigente),
        [productos],
    );

    const totalProductos = activos.length;

    const productosCriticos = useMemo(
        () => activos.filter((p) => p.stock_actual < p.stock_minimo).length,
        [activos],
    );

    const chartData = useMemo(() => {
        return pageProductos
            .filter((p) => p.producto_esta_vigente)
            .map((p) => ({
                producto: p.descripcion,
                stock_actual: p.stock_actual,
                stock_minimo: p.stock_minimo,
                critico: Math.max(0, p.stock_minimo - p.stock_actual),
            }))
            .sort((a, b) => b.critico - a.critico);
    }, [pageProductos]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Gestion Productos</h1>
                <p>Administra los productos del café</p>

                {chartData.length > 0 && (
                    <div className="flex gap-4">
                        <div className="flex w-1/3 flex-col gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Total Productos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        {totalProductos}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        productos activos en el sistema
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Estado Crítico
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-destructive">
                                        {productosCriticos}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        productos con stock por debajo del
                                        mínimo
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-2/3">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        Stock por Producto
                                    </CardTitle>
                                    <CardDescription>
                                        Comparativa de stock actual, stock
                                        mínimo y estado crítico (página actual)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer
                                        config={stockChartConfig}
                                        className="h-72 w-full"
                                    >
                                        <BarChart data={chartData}>
                                            <CartesianGrid
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="producto"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tick={({
                                                    x,
                                                    y,
                                                    payload,
                                                }) => {
                                                    const label = String(
                                                        payload.value,
                                                    );

                                                    return (
                                                        <text
                                                            x={x}
                                                            y={y}
                                                            textAnchor="end"
                                                            fontSize={10}
                                                            transform={`rotate(-20, ${x}, ${y})`}
                                                            fill="currentColor"
                                                            className="fill-muted-foreground"
                                                        >
                                                            {label.length > 15
                                                                ? `${label.slice(0, 15)}...`
                                                                : label}
                                                        </text>
                                                    );
                                                }}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                            />
                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent indicator="dot" />
                                                }
                                                cursor={false}
                                            />
                                            <Bar
                                                dataKey="stock_actual"
                                                fill="var(--color-stock_actual)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="stock_minimo"
                                                fill="var(--color-stock_minimo)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="critico"
                                                fill="var(--color-critico)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

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
                                        'categoria_id',
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
                                                name="categoria_id"
                                                required
                                                className="w-full"
                                            >
                                                <NativeSelectOption
                                                    disabled
                                                    value=""
                                                >
                                                    Selecciona una categoría
                                                </NativeSelectOption>
                                                {categorias.map((cat) => (
                                                    <NativeSelectOption
                                                        key={cat.id}
                                                        value={String(cat.id)}
                                                    >
                                                        {
                                                            cat.nombre_categoria_producto
                                                        }
                                                    </NativeSelectOption>
                                                ))}
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
                <DataTable
                    columns={columns}
                    data={productos}
                    onPageDataChange={setPageProductos}
                />
            </div>
        </AppLayout>
    );
}
