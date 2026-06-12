import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Bell,
    ClipboardList,
    Coffee,
    Package,
    TrendingUp,
    Users,
    AlertTriangle,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { inicio, producto, usuario } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { Producto } from '@/types/models';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: inicio(),
    },
];

export default function Inicio({ productos }: { productos: Producto[] }) {
    const totalProductos = productos?.length ?? 0;
    const conPocoStock =
        productos?.filter(
            (p) => p.stock_actual <= p.stock_minimo && p.producto_esta_vigente,
        ) ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 p-6 text-white shadow-lg md:p-10">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                            <Coffee className="size-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                                Buen día, Administrador
                            </h1>
                            <p className="mt-1 text-sm text-amber-100/80">
                                Panel de control — Café Central
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-2xl font-bold">{totalProductos}</p>
                            <p className="mt-0.5 text-xs text-amber-100/70">
                                Productos registrados
                            </p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-2xl font-bold">—</p>
                            <p className="mt-0.5 text-xs text-amber-100/70">
                                Ventas hoy
                            </p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                            <p className="text-2xl font-bold">
                                {conPocoStock.length}
                            </p>
                            <p className="mt-0.5 text-xs text-amber-100/70">
                                Alertas de stock
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-amber-200/40 bg-gradient-to-br from-amber-50 to-amber-100/30 dark:border-amber-800/30 dark:from-amber-950/30 dark:to-stone-900/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-amber-600/10 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                    <Package className="size-5" />
                                </div>
                                <Badge
                                    variant="outline"
                                    className="border-amber-200/50 text-amber-700 dark:border-amber-700/50 dark:text-amber-400"
                                >
                                    {totalProductos}
                                </Badge>
                            </div>
                            <CardTitle className="mt-2 text-sm font-medium text-muted-foreground">
                                Productos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link href={producto()}>
                                <Button
                                    variant="ghost"
                                    className="group -ml-2 h-auto p-0 text-xs font-medium text-amber-700 hover:bg-transparent hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                                >
                                    Gestionar productos
                                    <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-sky-200/40 bg-gradient-to-br from-sky-50 to-sky-100/30 dark:border-sky-800/30 dark:from-sky-950/30 dark:to-stone-900/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-sky-600/10 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
                                    <Users className="size-5" />
                                </div>
                                <Badge
                                    variant="outline"
                                    className="border-sky-200/50 text-sky-700 dark:border-sky-700/50 dark:text-sky-400"
                                >
                                    —
                                </Badge>
                            </div>
                            <CardTitle className="mt-2 text-sm font-medium text-muted-foreground">
                                Usuarios
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link href={usuario()}>
                                <Button
                                    variant="ghost"
                                    className="group -ml-2 h-auto p-0 text-xs font-medium text-sky-700 hover:bg-transparent hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                                >
                                    Gestionar usuarios
                                    <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-200/40 bg-gradient-to-br from-emerald-50 to-emerald-100/30 dark:border-emerald-800/30 dark:from-emerald-950/30 dark:to-stone-900/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <TrendingUp className="size-5" />
                                </div>
                                <Badge
                                    variant="outline"
                                    className="border-emerald-200/50 text-emerald-700 dark:border-emerald-700/50 dark:text-emerald-400"
                                >
                                    —
                                </Badge>
                            </div>
                            <CardTitle className="mt-2 text-sm font-medium text-muted-foreground">
                                Ventas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="ghost"
                                className="group -ml-2 h-auto p-0 text-xs font-medium text-emerald-700 hover:bg-transparent hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                            >
                                Ver reportes
                                <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <ClipboardList className="size-4 text-muted-foreground" />
                                <CardTitle>Accesos rápidos</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <Link href={producto()}>
                                    <Button
                                        variant="outline"
                                        className="h-auto w-full justify-start gap-3 py-4"
                                    >
                                        <Package className="size-4 text-amber-600" />
                                        <span className="text-xs font-medium">
                                            Nuevo producto
                                        </span>
                                    </Button>
                                </Link>
                                <Link href={usuario()}>
                                    <Button
                                        variant="outline"
                                        className="h-auto w-full justify-start gap-3 py-4"
                                    >
                                        <Users className="size-4 text-sky-600" />
                                        <span className="text-xs font-medium">
                                            Nuevo usuario
                                        </span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="h-auto w-full justify-start gap-3 py-4"
                                    disabled
                                >
                                    <Coffee className="size-4 text-stone-500" />
                                    <span className="text-xs font-medium">
                                        Nueva venta
                                    </span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto w-full justify-start gap-3 py-4"
                                    disabled
                                >
                                    <Bell className="size-4 text-stone-500" />
                                    <span className="text-xs font-medium">
                                        Notificaciones
                                    </span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="size-4 text-muted-foreground" />
                                <CardTitle>Alertas de stock</CardTitle>
                                {conPocoStock.length > 0 && (
                                    <Badge variant="destructive" className="ml-auto">
                                        {conPocoStock.length}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {conPocoStock.length === 0 ? (
                                <div className="flex flex-col items-center gap-2 py-8 text-center">
                                    <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                        <CheckCircleIcon className="size-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Todos los productos tienen stock suficiente
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {conPocoStock.slice(0, 5).map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex items-center justify-between rounded-lg bg-amber-50 p-3 dark:bg-amber-950/20"
                                        >
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle className="size-4 shrink-0 text-amber-600" />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {p.descripcion}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Stock: {p.stock_actual} / mín.{' '}
                                                        {p.stock_minimo}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge
                                                variant="destructive"
                                                className="shrink-0"
                                            >
                                                {p.stock_actual}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function CheckCircleIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 5-5" />
        </svg>
    );
}
