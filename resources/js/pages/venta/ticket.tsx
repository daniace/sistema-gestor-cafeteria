import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { inicio } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { Venta } from '@/types/models';
import TicketContent from './ticket-content';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: inicio() },
    { title: 'Ticket', href: '#' },
];

export default function Ticket({
    venta,
    print: autoPrint,
}: {
    venta: Venta;
    print?: boolean;
}) {
    useEffect(() => {
        if (autoPrint) {
            window.print();
        }
    }, [autoPrint]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Ticket #${venta.id}`} />

            <div className="mx-auto flex h-full flex-1 flex-col gap-4 p-4 print:gap-0 print:p-0">
                <div className="flex justify-end gap-2 print:hidden">
                    <Button
                        variant="outline"
                        onClick={() => router.visit(inicio())}
                    >
                        Volver
                    </Button>
                    <Button onClick={() => window.print()}>Imprimir</Button>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm print:rounded-none print:border-none print:shadow-none">
                        <TicketContent venta={venta} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
