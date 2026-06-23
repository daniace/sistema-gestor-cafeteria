import type { Venta } from '@/types/models';

export default function TicketContent({ venta }: { venta: Venta }) {
    return (
        <div className="ticket mx-auto max-w-sm">
            <div className="mb-4 text-center">
                <h1 className="text-lg font-bold tracking-tight">
                    Viera's Coffee
                </h1>
                <p className="text-xs text-muted-foreground">Ticket de venta</p>
            </div>

            <div className="mb-4 space-y-1 text-xs text-muted-foreground">
                <p>
                    Venta #
                    <span className="font-medium text-foreground">
                        {venta.id}
                    </span>
                </p>
                <p>
                    Mesa{' '}
                    <span className="font-medium text-foreground">
                        {String(venta.pedido?.numero_mesa ?? '').padStart(
                            2,
                            '0',
                        )}
                    </span>
                </p>
                <p>
                    Cliente:{' '}
                    <span className="font-medium text-foreground">
                        {venta.pedido?.cliente}
                    </span>
                </p>
                {venta.metodo_pago && (
                    <p>
                        Método de pago:{' '}
                        <span className="font-medium text-foreground">
                            {venta.metodo_pago.descripcion}
                        </span>
                    </p>
                )}
                <p>
                    Fecha:{' '}
                    <span className="font-medium text-foreground">
                        {new Date(venta.created_at).toLocaleString('es-AR')}
                    </span>
                </p>
            </div>

            <div className="mb-4 border-y border-border py-2">
                <div className="mb-1 flex justify-between text-xs font-semibold text-muted-foreground">
                    <span>Producto</span>
                    <span>Subtotal</span>
                </div>
                {venta.pedido?.productos?.map((producto) => (
                    <div
                        key={producto.id}
                        className="flex justify-between py-1 text-sm"
                    >
                        <span>
                            {producto.descripcion}{' '}
                            <span className="text-xs text-muted-foreground">
                                x{producto.pivot.cantidad} @ $
                                {Number(producto.pivot.precio_unitario).toFixed(
                                    2,
                                )}
                            </span>
                        </span>
                        <span className="font-medium tabular-nums">
                            $
                            {(
                                producto.pivot.cantidad *
                                Number(producto.pivot.precio_unitario)
                            ).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${Number(venta.total_original).toFixed(2)}</span>
                </div>
                {venta.descuento_aplicado > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Descuento ({venta.descuento_aplicado}%)</span>
                        <span>
                            -$
                            {(venta.total_original - venta.total_final).toFixed(
                                2,
                            )}
                        </span>
                    </div>
                )}
                <div className="flex justify-between border-t border-border pt-1 text-base font-bold">
                    <span>Total</span>
                    <span>${Number(venta.total_final).toFixed(2)}</span>
                </div>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
                ¡Gracias por su visita!
            </p>
        </div>
    );
}
