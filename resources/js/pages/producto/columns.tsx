'use client';

import { router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
//import { ArrowUpDown } from 'lucide-react';

//import destroy from '@/actions/App/Http/Controllers/ProductoController';
import { Button } from '@/components/ui/button';
import type { Producto } from '@/types/models';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
            const d = new Date(getValue());

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

            return (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        router.get(`/productos/${producto.id}/edit`);
                    }}
                >
                    Editar
                </Button>
            );
        },
    },
    /*{
        id: 'eliminar',
        header: '',

        cell: ({ row }) => {
            //const producto = row.original;

            return (
                <Button
                    variant="destructive"
                    size="icon"
                    /*
                    onClick={() => {
                        router.delete(destroy(producto.id).url);
                    }}
                >
                    Eliminar
                </Button>
            );
        },
    },*/
];
