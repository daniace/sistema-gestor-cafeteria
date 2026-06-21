'use client';

import { usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
//import { ArrowUpDown } from 'lucide-react';

import type { Producto } from '@/types/models';
import DialogFormBajaProducto from './dialog-form-baja-producto';
import DialogFormProducto from './dialog-form-producto';

export const columns: ColumnDef<Producto>[] = [
    {
        accessorKey: 'descripcion',
        header: 'Descripcion',
    },
    {
        accessorKey: 'categoria',
        header: 'Categoria',
    },
    {
        accessorKey: 'updated_at',
        header: 'Fecha',
        cell: ({ getValue }) => {
            const d = new Date(getValue() as string);

            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        },
    },
    {
        accessorKey: 'stock_actual',
        header: 'Stock-Actual',
        /* header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }, */
    },
    {
        accessorKey: 'stock_minimo',
        header: 'Stock-Minimo',
    },
    {
        accessorKey: 'precio',
        header: 'Precio',
    },
    {
        accessorKey: 'producto_esta_vigente',
        header: 'Vigente',
        cell: ({ getValue }) => (getValue() ? 'Vigente' : 'No vigente'),
    },
    {
        accessorKey: 'motivo_baja',
        header: 'Motivo-Baja',
    },
    {
        id: 'editar',
        header: 'Acciones',
        cell: ({ row }) => {
            const producto = row.original;

            return <DialogFormProducto producto={producto} />;
        },
    },
    {
        id: 'eliminar',
        header: '',

        cell: ({ row }) => {
            const producto = row.original;
            const { auth } = usePage().props;

            if (producto.puede_eliminar && auth.role === 'admin') {
                return <DialogFormBajaProducto producto={producto} />;
            }
        },
    },
];
