import { router } from '@inertiajs/react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { broadcastMesaUpdate } from '@/hooks/use-cross-tab-sync';
import { store } from '@/routes/venta';
import type { MetodoPago, Pedido } from '@/types/models';

export default function DialogCobrar({
    pedido,
    metodoPagos,
    open,
    onOpenChange,
    onSuccess,
}: {
    pedido: Pedido | null;
    metodoPagos: MetodoPago[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (ventaId: number) => void;
}) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);

    if (!pedido) {
        return null;
    }

    const selectedMetodo = metodoPagos.find((m) => m.id === selectedId);
    const descuento = selectedMetodo?.descuento ?? 0;
    const totalFinal = pedido.total - (pedido.total * descuento) / 100;

    function handleSubmit() {
        if (!selectedId) {
            return;
        }

        setSubmitting(true);
        router.post(
            store().url,
            {
                pedido_id: pedido.id,
                metodo_pago_id: selectedId,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    broadcastMesaUpdate();
                    const id = (page.props as Record<string, unknown>)
                        .venta_id as number;
                    setSubmitting(false);
                    onOpenChange(false);
                    onSuccess(id);
                },
                onError: () => {
                    setSubmitting(false);
                },
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Cobrar Pedido #{pedido.id}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Mesa {String(pedido.numero_mesa).padStart(2, '0')} —
                        Cliente: {pedido.cliente}
                    </p>

                    <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                            Método de pago
                        </p>
                        {metodoPagos.map((mp) => (
                            <button
                                key={mp.id}
                                type="button"
                                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                                    selectedId === mp.id
                                        ? 'border-ring bg-ring/10 ring-1 ring-ring'
                                        : 'border-border hover:bg-muted/50'
                                }`}
                                onClick={() => setSelectedId(mp.id)}
                            >
                                <span className="font-medium">
                                    {mp.descripcion}
                                </span>
                                {mp.descuento > 0 ? (
                                    <span className="text-xs text-green-600 dark:text-green-400">
                                        -{mp.descuento}%
                                    </span>
                                ) : (
                                    <span className="text-xs text-muted-foreground">
                                        Sin descuento
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="rounded-xl bg-muted/50 p-3 text-sm">
                        <div className="flex justify-between">
                            <span>Total original</span>
                            <span>${pedido.total.toFixed(2)}</span>
                        </div>
                        {descuento > 0 && (
                            <div className="flex justify-between text-green-600 dark:text-green-400">
                                <span>Descuento ({descuento}%)</span>
                                <span>
                                    -$
                                    {((pedido.total * descuento) / 100).toFixed(
                                        2,
                                    )}
                                </span>
                            </div>
                        )}
                        <div className="mt-1 flex justify-between border-t border-border pt-1 text-base font-bold">
                            <span>Total a cobrar</span>
                            <span>${totalFinal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={!selectedId || submitting}
                        onClick={handleSubmit}
                    >
                        {submitting ? 'Procesando...' : 'Confirmar Pago'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
