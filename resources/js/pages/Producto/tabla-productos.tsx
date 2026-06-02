import { MoreHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from '@/components/ui/table';
import type { Producto } from '@/types/models';

export function TableActions({ productos }: { productos: Producto[] }) {
    const formatDate = (date: string) => {
        const d = new Date(date);

        return d.toLocaleDateString();
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {/*<TableHead>CódigoProducto</TableHead>*/}
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
                {productos.map((producto) => (
                    <TableRow key={producto.id}>
                        <TableCell className="font-medium">
                            {producto.descripcion}
                        </TableCell>
                        <TableCell>{producto.categoria}</TableCell>
                        <TableCell>{formatDate(producto.updated_at)}</TableCell>
                        <TableCell>{producto.stock_actual}</TableCell>
                        <TableCell>{producto.stock_minimo}</TableCell>
                        <TableCell>{producto.precio}</TableCell>
                        <TableCell>
                            {producto.producto_esta_vigente
                                ? 'Vigente'
                                : 'No vigente'}
                        </TableCell>

                        <TableCell>
                            {/* cambiar a and despues && */}
                            {producto.motivo_baja == null ||
                            producto.producto_esta_vigente
                                ? '-'
                                : producto.motivo_baja}
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
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
                                    <DropdownMenuItem variant="destructive">
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
