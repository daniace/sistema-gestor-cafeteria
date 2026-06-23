import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { index as ventaIndex } from '@/routes/venta';
import type { BreadcrumbItem } from '@/types';
import type { Venta } from '@/types/models';

import { columns } from './columns';
import { DataTable } from './data-tabla-ventas';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ventas',
        href: ventaIndex(),
    },
];

export default function VistaVentas({ ventas }: { ventas: { data: Venta[] } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ventas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Gestion Ventas</h1>
                <p>Administra las ventas realizadas</p>
                <DataTable columns={columns} data={ventas.data} />
            </div>
        </AppLayout>
    );
}
