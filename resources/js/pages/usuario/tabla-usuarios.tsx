import { router } from '@inertiajs/react';
import { MoreHorizontalIcon } from 'lucide-react';
import { destroy } from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { User } from '@/types/auth';

export function TableActions({ usuarios }: { usuarios: User[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>DNI</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                        <TableCell className="font-medium">
                            {usuario.dni}
                        </TableCell>
                        <TableCell>{usuario.nombre}</TableCell>
                        <TableCell>{usuario.apellido}</TableCell>
                        <TableCell>{usuario.nombre_rol}</TableCell>
                        <TableCell>
                            {usuario.estado_cuenta_usuario
                                ? 'Activo'
                                : 'Inactivo'}
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-8"
                                    >
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">
                                            Abrir menú
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Duplicar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        variant="destructive"
                                        onSelect={() =>
                                            router.delete(
                                                destroy(usuario.id).url,
                                            )
                                        }
                                    >
                                        Eliminar
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
