import { router } from '@inertiajs/react';
import { Minus, Plus, Receipt } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { store } from '@/routes/pedido';
import type { Mesa, Producto } from '@/types/models';

type ProductoSeleccionado = {
    id: number;
    descripcion: string;
    precio: number;
    cantidad: number;
};

const inputCls = 'w-full rounded-xl border border-border bg-input/30 px-3 py-2 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50';

export default function DialogPedidoMesa({
    mesa,
    productos,
    open,
    onOpenChange,
}: {
    mesa: Mesa | null;
    productos: Producto[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [cliente, setCliente] = useState('');
    const [seleccion, setSeleccion] = useState<Record<number, number>>({});
    const [submitting, setSubmitting] = useState(false);
    const [pedidoId, setPedidoId] = useState<number | null>(null);

    const productosList: ProductoSeleccionado[] = productos
        .filter((p) => (seleccion[p.id] ?? 0) > 0)
        .map((p) => ({
            id: p.id,
            descripcion: p.descripcion,
            precio: p.precio,
            cantidad: seleccion[p.id],
        }));

    const total = productosList.reduce((sum, p) => sum + p.cantidad * p.precio, 0);

    function incrementar(productoId: number) {
        setSeleccion((prev) => ({
            ...prev,
            [productoId]: (prev[productoId] ?? 0) + 1,
        }));
    }

    function decrementar(productoId: number) {
        setSeleccion((prev) => {
            const actual = prev[productoId] ?? 0;

            if (actual <= 1) {
                const { [productoId]: _, ...rest } = prev;

                return rest;
            }

            return { ...prev, [productoId]: actual - 1 };
        });
    }

    function reset() {
        setCliente('');
        setSeleccion({});
        setPedidoId(null);
        setSubmitting(false);
    }

    function handleClose(open: boolean) {
        if (!open) {
            reset();
        }

        onOpenChange(open);
    }

    function handleSubmit() {
        if (!mesa || productosList.length === 0) {
return;
}

        setSubmitting(true);
        router.post(
            store().url,
            {
                numero_mesa: mesa.id,
                cliente: cliente || `Mesa ${String(mesa.id).padStart(2, '0')}`,
                productos: productosList.map((p) => ({
                    id: p.id,
                    cantidad: p.cantidad,
                    precio_unitario: p.precio,
                })),
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const id = (page.props as Record<string, unknown>).pedido_id as number;
                    setPedidoId(id);
                    setSubmitting(false);
                },
                onError: () => {
                    setSubmitting(false);
                },
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className="flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-lg"
                showCloseButton={pedidoId === null}
            >
                {pedidoId !== null ? (
                    /* ── Estado 2: Pedido creado ── */
                    <>
                        <DialogHeader className="px-6 pt-6">
                            <DialogTitle>Pedido confirmado</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4 px-6 py-6 text-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                <Receipt className="size-8 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-lg font-semibold">
                                Pedido #{pedidoId} — Mesa{' '}
                                {String(mesa!.id).padStart(2, '0')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Cliente: {cliente || `Mesa ${String(mesa!.id).padStart(2, '0')}`}
                            </p>
                            <div className="w-full space-y-2 rounded-xl bg-muted/50 p-4">
                                {productosList.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {p.descripcion}{' '}
                                            <span className="text-muted-foreground">
                                                x{p.cantidad}
                                            </span>
                                        </span>
                                        <span className="font-medium">
                                            ${(p.cantidad * p.precio).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="border-t border-border pt-2 text-base font-bold">
                                    <div className="flex justify-between">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="gap-2 px-6 pb-6">
                            <Button
                                variant="outline"
                                onClick={() => handleClose(false)}
                            >
                                Cerrar
                            </Button>
                            <Button
                                onClick={() =>
                                    window.open(
                                        `/pedidos/${pedidoId}/ticket`,
                                        '_blank',
                                    )
                                }
                            >
                                <Receipt className="size-4" />
                                Imprimir Ticket
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    /* ── Estado 1: Selección de productos ── */
                    <>
                        <DialogHeader className="px-6 pt-6">
                            <DialogTitle>
                                Mesa {String(mesa?.id ?? '').padStart(2, '0')}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <div className="mb-4">
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                                    Cliente
                                </label>
                                <input
                                    className={inputCls}
                                    placeholder={`Mesa ${String(mesa?.id ?? '').padStart(2, '0')}`}
                                    value={cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                {productos.map((producto) => {
                                    const cantidad =
                                        seleccion[producto.id] ?? 0;

                                    return (
                                        <div
                                            key={producto.id}
                                            className="flex items-center justify-between rounded-xl border border-border bg-input/20 px-3 py-2.5"
                                        >
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">
                                                    {producto.descripcion}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    ${producto.precio.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon-xs"
                                                    onClick={() =>
                                                        decrementar(
                                                            producto.id,
                                                        )
                                                    }
                                                >
                                                    <Minus className="size-3" />
                                                </Button>
                                                <span className="flex w-6 justify-center text-sm font-semibold tabular-nums">
                                                    {cantidad}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon-xs"
                                                    onClick={() =>
                                                        incrementar(
                                                            producto.id,
                                                        )
                                                    }
                                                >
                                                    <Plus className="size-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {productosList.length > 0 && (
                                <div className="mt-4 rounded-xl bg-muted/50 p-3 text-sm font-semibold">
                                    <div className="flex justify-between">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="gap-2 border-t border-border px-6 py-4">
                            <Button
                                variant="outline"
                                onClick={() => handleClose(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                disabled={productosList.length === 0 || submitting}
                                onClick={handleSubmit}
                            >
                                {submitting ? 'Creando...' : 'Confirmar Pedido'}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
