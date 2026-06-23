import { Head, router } from '@inertiajs/react';
import {
    CalendarBlank,
    ChartBar,
    ChartLine,
    CurrencyDollar,
    PresentationChart,
    Receipt,
    ShoppingBag,
    TrendDown,
} from '@phosphor-icons/react';
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent  } from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { reporte } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reporte',
        href: reporte(),
    },
];

const salesChartConfig = {
    total: {
        label: 'Total',
        color: 'var(--color-chart-1)',
    },
    cantidad: {
        label: 'Ventas',
        color: 'var(--color-chart-2)',
    },
} satisfies ChartConfig;

const CHART_COLORS = [
    'var(--color-chart-1)',
    'var(--color-chart-2)',
    'var(--color-chart-3)',
    'var(--color-chart-4)',
    'var(--color-chart-5)',
];

function DatePicker({
    date,
    onChange,
    label,
}: {
    date: string;
    onChange: (d: string) => void;
    label: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-1.5">
            <Label className="text-xs">{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn('w-44 justify-start gap-2 text-left font-normal')}
                    >
                        <CalendarBlank className="size-4" />
                        {date ? format(new Date(date), 'dd/MM/yyyy') : 'Seleccionar fecha'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date ? new Date(date) : undefined}
                        onSelect={(d) => {
                            if (d) {
                                onChange(format(d, 'yyyy-MM-dd'));
                                setOpen(false);
                            }
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(value);
}

export default function VistaReporte({
    salesChart,
    productStats,
    paymentMethodStats,
    summary,
    filters,
}: {
    salesChart: { period: string; label: string; total: number; cantidad: number }[];
    productStats: { descripcion: string; cantidad: number }[];
    paymentMethodStats: { metodo: string; cantidad: number; total: number }[];
    summary: { total_ventas: number; ingresos_totales: number; total_descuentos: number; promedio_venta: number };
    filters: { start_date: string; end_date: string; period: string };
}) {
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);
    const [period, setPeriod] = useState(filters.period);

    function applyFilters() {
        router.get(
            reporte(),
            {
                start_date: startDate,
                end_date: endDate,
                period,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function setQuickRange(days: number) {
        const end = new Date();
        const start = addDays(end, -days);
        setStartDate(format(start, 'yyyy-MM-dd'));
        setEndDate(format(end, 'yyyy-MM-dd'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reporte" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Reportes</h1>
                        <p className="text-muted-foreground">
                            Visualiza las ventas y el rendimiento del negocio
                        </p>
                    </div>
                </div>

                <Separator />

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <CalendarBlank className="size-4" />
                            Filtrar por fecha
                        </CardTitle>
                        <CardDescription>
                            Selecciona el rango de fechas y el período de agrupación
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-end gap-4">
                            <DatePicker
                                date={startDate}
                                onChange={setStartDate}
                                label="Fecha inicio"
                            />
                            <DatePicker
                                date={endDate}
                                onChange={setEndDate}
                                label="Fecha fin"
                            />
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs">Período</Label>
                                <Select value={period} onValueChange={setPeriod}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Período" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="day">Por día</SelectItem>
                                        <SelectItem value="week">Por semana</SelectItem>
                                        <SelectItem value="month">Por mes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button onClick={applyFilters}>Aplicar</Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuickRange(7)}
                                >
                                    7 días
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuickRange(30)}
                                >
                                    30 días
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setQuickRange(90)}
                                >
                                    90 días
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Ventas
                            </CardTitle>
                            <Receipt className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary.total_ventas}</div>
                            <p className="text-xs text-muted-foreground">
                                en el período seleccionado
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Ingresos Totales
                            </CardTitle>
                            <CurrencyDollar className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(summary.ingresos_totales)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                suma de ventas realizadas
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Promedio por Venta
                            </CardTitle>
                            <ChartLine className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(summary.promedio_venta)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                valor promedio por transacción
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Descuentos
                            </CardTitle>
                            <TrendDown className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(summary.total_descuentos)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                descuentos aplicados
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ChartBar className="size-4" />
                                Ventas por período
                            </CardTitle>
                            <CardDescription>
                                Evolución de ventas agrupadas por {period === 'day'
                                    ? 'día'
                                    : period === 'week'
                                        ? 'semana'
                                        : 'mes'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {salesChart.length > 0 ? (
                                <ChartContainer
                                    config={salesChartConfig}
                                    className="h-72 w-full"
                                >
                                    <BarChart data={salesChart}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(v) => `$${v}`}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    labelKey="total"
                                                    indicator="dot"
                                                />
                                            }
                                            cursor={false}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="var(--color-total)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            ) : (
                                <div className="flex h-72 items-center justify-center text-muted-foreground">
                                    No hay datos para el período seleccionado
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ShoppingBag className="size-4" />
                                Productos más vendidos
                            </CardTitle>
                            <CardDescription>
                                Top 10 productos con más pedidos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {productStats.length > 0 ? (
                                <div className="space-y-3">
                                    {productStats.map((product, index) => (
                                        <div key={product.descripcion} className="flex items-center gap-3">
                                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                                {index + 1}
                                            </span>
                                            <div className="flex-1 truncate">
                                                <p className="truncate text-sm font-medium">
                                                    {product.descripcion}
                                                </p>
                                                <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${(product.cantidad / Math.max(...productStats.map((p) => p.cantidad))) * 100}%`,
                                                            backgroundColor:
                                                                CHART_COLORS[
                                                                    index % CHART_COLORS.length
                                                                ],
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium tabular-nums">
                                                {product.cantidad}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-48 items-center justify-center text-muted-foreground">
                                    No hay ventas en el período
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <PresentationChart className="size-4" />
                                Métodos de pago
                            </CardTitle>
                            <CardDescription>
                                Distribución por método de pago
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {paymentMethodStats.length > 0 ? (
                                <>
                                    <ChartContainer
                                        config={paymentMethodStats.reduce(
                                            (acc, m, i) => ({
                                                ...acc,
                                                [m.metodo]: {
                                                    label: m.metodo,
                                                    color: CHART_COLORS[i % CHART_COLORS.length],
                                                },
                                            }),
                                            {} as ChartConfig,
                                        )}
                                        className="h-48 w-full"
                                    >
                                        <PieChart>
                                            <ChartTooltip
                                                content={<ChartTooltipContent indicator="dot" />}
                                                cursor={false}
                                            />
                                            <Pie
                                                data={paymentMethodStats}
                                                dataKey="cantidad"
                                                nameKey="metodo"
                                                innerRadius={44}
                                                strokeWidth={4}
                                                stroke="var(--background)"
                                            >
                                                {paymentMethodStats.map((_, i) => (
                                                    <Cell
                                                        key={i}
                                                        fill={
                                                            CHART_COLORS[
                                                                i % CHART_COLORS.length
                                                            ]
                                                        }
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ChartContainer>
                                    <Separator className="my-3" />
                                    <div className="space-y-2">
                                        {paymentMethodStats.map((method, i) => (
                                            <div
                                                key={method.metodo}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="size-2.5 shrink-0 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                CHART_COLORS[
                                                                    i % CHART_COLORS.length
                                                                ],
                                                        }}
                                                    />
                                                    <span className="text-sm">
                                                        {method.metodo}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm tabular-nums text-muted-foreground">
                                                        {method.cantidad} ventas
                                                    </span>
                                                    <span className="text-sm font-medium tabular-nums">
                                                        {formatCurrency(method.total)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-48 items-center justify-center text-muted-foreground">
                                    No hay ventas en el período
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
