import { Head } from '@inertiajs/react';
import { Coffee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { inicio } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: inicio(),
    },
];

const mesas = [
    { id: 1, capacidad: 4, estado: 'ocupada', hace: '25 min', icono: 'restaurant_menu' },
    { id: 2, capacidad: 4, estado: 'libre' },
    { id: 3, capacidad: 2, estado: 'libre' },
    { id: 4, capacidad: 4, estado: 'ocupada', hace: '10 min', icono: 'local_cafe' },
    { id: 5, capacidad: 4, estado: 'libre' },
    { id: 6, capacidad: 6, estado: 'libre' },
    { id: 7, capacidad: 2, estado: 'ocupada', hace: '45 min', icono: 'restaurant_menu' },
    { id: 8, capacidad: 2, estado: 'libre' },
    { id: 9, capacidad: 4, estado: 'ocupada', hace: '5 min', icono: 'local_cafe' },
    { id: 10, capacidad: 4, estado: 'libre' },
];

export default function Inicio() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                        <Coffee className="size-5 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">
                            Mesas del Café
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Estado en tiempo real del salón
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {mesas.map((mesa) => (
                        <MesaCard key={mesa.id} {...mesa} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

function MesaCard({
    id,
    capacidad,
    estado,
    hace,
    icono,
}: {
    id: number;
    capacidad: number;
    estado: 'libre' | 'ocupada';
    hace?: string;
    icono?: string;
}) {
    const ocupada = estado === 'ocupada';

    return (
        <Card
            className={
                ocupada
                    ? 'border-red-200 shadow-sm dark:border-red-800/40'
                    : 'border-border shadow-sm dark:border-zinc-700/50'
            }
        >
            <CardHeader
                className={
                    ocupada
                        ? 'flex flex-row items-center justify-between border-b border-red-100 px-4 py-3 dark:border-red-900/30'
                        : 'flex flex-row items-center justify-between border-b border-border px-4 py-3'
                }
            >
                <CardTitle className="text-sm font-semibold">
                    Mesa {String(id).padStart(2, '0')}
                </CardTitle>
                {ocupada ? (
                    <Badge
                        variant="destructive"
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    >
                        OCUPADA
                    </Badge>
                ) : (
                    <Badge
                        variant="outline"
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
                    >
                        LIBRE
                    </Badge>
                )}
            </CardHeader>
            <CardContent className="flex min-h-[100px] flex-col items-center justify-center gap-2 px-4 py-5">
                {ocupada ? (
                    <>
                        <span className="text-3xl">☕</span>
                        <span className="text-xs text-muted-foreground">
                            Hace {hace}
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-3xl">🪑</span>
                        <span className="text-xs font-medium text-muted-foreground">
                            Capacidad: {capacidad}
                        </span>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
