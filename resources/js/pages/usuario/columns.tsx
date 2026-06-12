'use client';

import { router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { destroy } from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/auth';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'nombre',
        header: 'Nombre',
    },
    {
        accessorKey: 'apellido',
        header: 'Apellido',
    },
    {
        accessorKey: 'dni',
        header: 'DNI',
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
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
        },
    },
    {
        accessorKey: 'rol',
        header: 'Rol',
    },
    {
        accessorKey: 'estado_cuenta_usuario',
        header: 'Estado',
        cell: ({ getValue }) => (getValue() ? 'Activo' : 'Inactivo'),
    },
    {
        id: 'editar',
        header: 'Acciones',
        cell: ({ row }) => {
            const user = row.original;

            return (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        router.get(`/usuarios/${user.id}/edit`);
                    }}
                >
                    Editar
                </Button>
            );
        },
    },
    {
        id: 'eliminar',
        header: '',
        cell: ({ row }) => {
            const user = row.original;

            return (
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                        router.delete(destroy(user.id).url);
                    }}
                >
                    Eliminar
                </Button>
            );
        },
    },
];
