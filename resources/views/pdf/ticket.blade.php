<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ticket #{{ $venta->id }}</title>
    <style>
        @page { margin: 15px; }
        body { font-family: 'Courier New', monospace; font-size: 12px; color: #333; margin: 0; padding: 0; }
        .ticket { max-width: 320px; margin: 0 auto; padding: 20px; }
        .text-center { text-align: center; }
        h1 { font-size: 16px; font-weight: bold; margin: 0 0 4px; }
        .subtitle { font-size: 10px; color: #666; margin: 0 0 16px; }
        .info { font-size: 10px; color: #666; margin-bottom: 16px; }
        .info p { margin: 2px 0; }
        .info span { color: #333; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        thead th { border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 6px 4px; font-size: 10px; text-align: left; }
        thead th:last-child { text-align: right; }
        tbody td { padding: 4px; font-size: 11px; }
        tbody td:last-child { text-align: right; }
        .product-name { font-weight: bold; }
        .product-detail { font-size: 9px; color: #666; }
        .totals { font-size: 11px; }
        .totals .row { display: flex; justify-content: space-between; padding: 2px 0; }
        .totals .border-top { border-top: 1px solid #ccc; padding-top: 4px; font-weight: bold; font-size: 13px; }
        .discount { color: #16a34a; }
        .footer { text-align: center; font-size: 10px; color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="text-center">
            <h1>Viera's Coffee</h1>
            <p class="subtitle">Ticket de venta</p>
        </div>

        <div class="info">
            <p>Venta #<span>{{ $venta->id }}</span></p>
            <p>Mesa <span>{{ str_pad($venta->pedido->numero_mesa, 2, '0', STR_PAD_LEFT) }}</span></p>
            <p>Cliente: <span>{{ $venta->pedido->cliente }}</span></p>
            @if($venta->metodoPago)
                <p>Método de pago: <span>{{ $venta->metodoPago->descripcion }}</span></p>
            @endif
            <p>Fecha: <span>{{ $venta->created_at->format('d/m/Y H:i') }}</span></p>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($venta->pedido->productos as $producto)
                <tr>
                    <td>
                        <div class="product-name">{{ $producto->descripcion }}</div>
                        <div class="product-detail">x{{ $producto->pivot->cantidad }} @ ${{ number_format($producto->pivot->precio_unitario, 2) }}</div>
                    </td>
                    <td>${{ number_format($producto->pivot->cantidad * $producto->pivot->precio_unitario, 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="totals">
            <div class="row">
                <span>Subtotal</span>
                <span>${{ number_format($venta->total_original, 2) }}</span>
            </div>
            @if($venta->descuento_aplicado > 0)
                <div class="row discount">
                    <span>Descuento ({{ $venta->descuento_aplicado }}%)</span>
                    <span>-${{ number_format($venta->total_original - $venta->total_final, 2) }}</span>
                </div>
            @endif
            <div class="row border-top">
                <span>Total</span>
                <span>${{ number_format($venta->total_final, 2) }}</span>
            </div>
        </div>

        <div class="footer">
            ¡Gracias por su visita!
        </div>
    </div>
</body>
</html>
