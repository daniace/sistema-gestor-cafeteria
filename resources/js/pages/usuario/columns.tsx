'use client';

import type { ColumnDef } from '@tanstack/react-table';
//import { UserController } from '@/app/Http/Controllers/UserController';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { User } from '@/types/auth';
import DialogFormBajaUsuario from './dialog-form-baja-usuario';
import DialogFormUsuario from './dialog-form-usuario';

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
        accessorKey: 'nombre_rol',
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

            return <DialogFormUsuario usuario={user} />;
        },
    },
    {
        id: 'eliminar',
        header: '',
        cell: ({ row }) => {
            const user = row.original;

            if (user.puede_eliminar) {
                return <DialogFormBajaUsuario usuario={user} />;
            }
        },
    },
];
