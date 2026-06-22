import { router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { edit } from '@/routes/mesa';
import type { Mesa } from '@/types/models';

export const columns: ColumnDef<Mesa>[] = [
    {
        accessorKey: 'numero',
        header: 'N° Mesa',
    },
    {
        accessorKey: 'capacidad',
        header: 'Capacidad',
    },
    {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ getValue }) => {
            const estado = getValue() as string;
            return estado === 'ocupada' ? 'Ocupada' : 'Libre';
        },
    },
    {
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => {
            const mesa = row.original;
            return (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            router.get(edit({ mesa: mesa.id }).url)
                        }
                    >
                        Editar
                    </Button>
                </div>
            );
        },
    },
];
