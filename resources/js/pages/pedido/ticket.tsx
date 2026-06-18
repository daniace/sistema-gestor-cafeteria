import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { inicio } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { Pedido } from '@/types/models';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: inicio() },
    { title: 'Ticket', href: '#' },
];

function TicketContent({ pedido }: { pedido: Pedido }) {
    return (
        <div className="ticket mx-auto max-w-sm">
            <div className="mb-4 text-center">
                <h1 className="text-lg font-bold tracking-tight">
                    Café Central
                </h1>
                <p className="text-xs text-muted-foreground">
                    Ticket de pedido
                </p>
            </div>

            <div className="mb-4 space-y-1 text-xs text-muted-foreground">
                <p>
                    Pedido #<span className="font-medium text-foreground">{pedido.id}</span>
                </p>
                <p>
                    Mesa{' '}
                    <span className="font-medium text-foreground">
                        {String(pedido.numero_mesa).padStart(2, '0')}
                    </span>
                </p>
                <p>
                    Cliente:{' '}
                    <span className="font-medium text-foreground">
                        {pedido.cliente}
                    </span>
                </p>
                <p>
                    Fecha:{' '}
                    <span className="font-medium text-foreground">
                        {new Date(pedido.created_at).toLocaleString('es-AR')}
                    </span>
                </p>
            </div>

            <div className="mb-4 border-y border-border py-2">
                <div className="mb-1 flex justify-between text-xs font-semibold text-muted-foreground">
                    <span>Producto</span>
                    <span>Subtotal</span>
                </div>
                {pedido.productos?.map((producto) => (
                    <div
                        key={producto.id}
                        className="flex justify-between py-1 text-sm"
                    >
                        <span>
                            {producto.descripcion}{' '}
                            <span className="text-xs text-muted-foreground">
                                x{producto.pivot.cantidad} @ ${Number(producto.pivot.precio_unitario).toFixed(2)}
                            </span>
                        </span>
                        <span className="font-medium tabular-nums">
                            ${(producto.pivot.cantidad * Number(producto.pivot.precio_unitario)).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>${Number(pedido.total).toFixed(2)}</span>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
                ¡Gracias por su visita!
            </p>
        </div>
    );
}

export default function Ticket({
    pedido,
    print: autoPrint,
}: {
    pedido: Pedido;
    print?: boolean;
}) {
    useEffect(() => {
        if (autoPrint) {
            window.print();
        }
    }, [autoPrint]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Ticket #${pedido.id}`} />

            <div className="mx-auto flex h-full flex-1 flex-col gap-4 p-4 print:gap-0 print:p-0">
                <div className="flex justify-end gap-2 print:hidden">
                    <Button
                        variant="outline"
                        onClick={() => router.visit(inicio())}
                    >
                        Volver
                    </Button>
                    <Button onClick={() => window.print()}>
                        Imprimir
                    </Button>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm print:rounded-none print:border-none print:shadow-none">
                        <TicketContent pedido={pedido} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
