<?php

namespace App\Http\Controllers;

use App\Events\MesaActualizada;
use App\Http\Requests\StoreVentaRequest;
use App\Models\MetodoPago;
use App\Models\Pedido;
use App\Models\Venta;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class VentaController extends Controller
{
    public function store(StoreVentaRequest $request): RedirectResponse
    {
        $pedido = Pedido::with('productos')->findOrFail($request->pedido_id);

        if ($pedido->estado !== 'pendiente') {
            throw ValidationException::withMessages([
                'pedido_id' => 'El pedido ya fue completado.',
            ]);
        }

        $metodoPago = MetodoPago::findOrFail($request->metodo_pago_id);
        $totalOriginal = (float) $pedido->total;
        $descuento = (float) $metodoPago->descuento;
        $totalFinal = $totalOriginal - ($totalOriginal * $descuento / 100);

        $venta = Venta::create([
            'pedido_id' => $pedido->id,
            'metodo_pago_id' => $metodoPago->id,
            'total_original' => $totalOriginal,
            'total_final' => $totalFinal,
            'descuento_aplicado' => $descuento,
        ]);

        $pedido->update(['estado' => 'completado']);

        $mesa = $pedido->mesa;
        if ($mesa) {
            $mesa->liberar();
            $mesa->save();
            MesaActualizada::dispatch($mesa);
        }

        return redirect()->route('inicio')->with('venta_id', $venta->id);
    }

    public function index(): Response
    {
        return Inertia::render('venta/vista-ventas', [
            'ventas' => Venta::with('pedido.productos', 'metodoPago')
                ->latest()
                ->paginate(20),
        ]);
    }

    public function ticket(Venta $venta): Response
    {
        $venta->load('pedido.productos', 'metodoPago');

        return Inertia::render('venta/ticket', [
            'venta' => $venta,
            'print' => true,
        ]);
    }

    public function downloadPdf(Venta $venta): SymfonyResponse
    {
        $venta->load('pedido.productos', 'metodoPago');

        $pdf = Pdf::loadView('pdf.ticket', ['venta' => $venta]);

        return $pdf->download("ticket-venta-{$venta->id}.pdf");
    }
}
