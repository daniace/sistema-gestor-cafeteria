import { Head, router } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { Coffee } from 'lucide-react';
import { useState } from 'react';
import MesaCard from '@/components/mesa/mesa-card';
import AppLayout from '@/layouts/app-layout';
import DialogPedidoMesa from '@/pages/inicio/dialog-pedido-mesa';
import { inicio } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { Mesa, MetodoPago, Producto } from '@/types/models';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: inicio(),
    },
];

export default function Inicio({
    productos,
    mesas,
    metodoPagos,
}: {
    productos: Producto[];
    mesas: Mesa[];
    metodoPagos: MetodoPago[];
}) {
    useEchoPublic('mesas', '.mesa.actualizada', () => {
        router.reload({ only: ['mesas'] });
    });

    useEchoPublic('stock', '.stock.actualizado', () => {
        router.reload({ only: ['productos'] });
    });

    const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    function handleMesaClick(mesa: Mesa) {
        setMesaSeleccionada(mesa);
        setDialogOpen(true);
    }

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
                        <MesaCard
                            key={mesa.id}
                            {...mesa}
                            onClick={() => handleMesaClick(mesa)}
                        />
                    ))}
                </div>
            </div>

            <DialogPedidoMesa
                mesa={mesaSeleccionada}
                productos={productos}
                metodoPagos={metodoPagos}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </AppLayout>
    );
}
