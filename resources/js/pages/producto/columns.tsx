'use client';

import { usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';

import type { CategoriaProducto, Producto } from '@/types/models';
import DialogFormBajaProducto from './dialog-form-baja-producto';
import DialogFormProducto from './dialog-form-producto';

export const columns: ColumnDef<Producto>[] = [
    {
        accessorKey: 'descripcion',
        header: 'Descripcion',
    },
    {
        accessorKey: 'categoria_id',
        header: 'Categoria',
        cell: ({ row }) => {
            const { categorias } = usePage().props as {
                categorias: CategoriaProducto[];
            };
            const cat = categorias.find(
                (c) => c.id === row.original.categoria_id,
            );

            return cat?.nombre_categoria_producto ?? row.original.categoria_id;
        },
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

            if (producto.puede_eliminar && auth.rol === 'admin') {
                return <DialogFormBajaProducto producto={producto} />;
            }
        },
    },
];
