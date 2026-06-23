'use client';

import { DownloadSimpleIcon } from '@phosphor-icons/react';
import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { pdf as ventaPdf } from '@/routes/venta';
import type { Venta } from '@/types/models';

import DialogTicketVenta from './dialog-ticket-venta';

export const columns: ColumnDef<Venta>[] = [
    {
        accessorKey: 'id',
        header: '# Venta',
    },
    {
        accessorKey: 'pedido.cliente',
        header: 'Cliente',
        cell: ({ row }) => row.original.pedido?.cliente ?? '-',
    },
    {
        accessorKey: 'pedido.numero_mesa',
        header: 'Mesa',
        cell: ({ row }) => {
            const mesa = row.original.pedido?.numero_mesa;

            return mesa != null ? String(mesa).padStart(2, '0') : '-';
        },
    },
    {
        header: 'Método de pago',
        cell: ({ row }) => row.original.metodo_pago?.descripcion ?? '-',
    },
    {
        accessorKey: 'total_original',
        header: 'Total Original',
        cell: ({ getValue }) => `$${Number(getValue()).toFixed(2)}`,
    },
    {
        accessorKey: 'descuento_aplicado',
        header: 'Descuento',
        cell: ({ getValue }) => {
            const desc = Number(getValue());

            return desc > 0 ? `${desc}%` : '-';
        },
    },
    {
        accessorKey: 'total_final',
        header: 'Total Final',
        cell: ({ getValue }) => `$${Number(getValue()).toFixed(2)}`,
    },
    {
        accessorKey: 'created_at',
        header: 'Fecha',
        cell: ({ getValue }) => {
            const d = new Date(getValue() as string);

            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        },
    },
    {
        id: 'ver_detalle',
        header: 'Acción',
        cell: ({ row }) => <DialogTicketVenta venta={row.original} />,
    },
    {
        id: 'descargar_pdf',
        header: '',
        cell: ({ row }) => {
            const ventaId = row.original.id;

            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        window.open(ventaPdf({ venta: ventaId }).url, '_blank')
                    }
                >
                    <DownloadSimpleIcon className="mr-1 h-4 w-4" />
                    Descargar Comprobante
                </Button>
            );
        },
    },
];
