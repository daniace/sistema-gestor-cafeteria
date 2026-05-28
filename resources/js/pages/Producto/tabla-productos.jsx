import { MoreHorizontalIcon, Table } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function TableActions({productos}:{productos: Producto[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    #<TableHead>CódigoProducto</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Fecha Modificación</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Stock Mínimo</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Vigente</TableHead>
                    <TableHead>MotivoBaja</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {usuarios.map((producto) => (
                    <TableRow key={producto.id}>
                        <TableCell className="font-medium">{producto.descripcion}</TableCell>
                        <TableCell>{producto.}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger as Child>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">
                                            Abrir menú
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicar</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">Eliminar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
