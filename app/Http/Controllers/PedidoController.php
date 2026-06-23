<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancelPedidoRequest;
use App\Http\Requests\StorePedidoRequest;
use App\Http\Requests\UpdatePedidoRequest;
use App\Models\Mesa;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PedidoController extends Controller
{
    public function store(StorePedidoRequest $request): RedirectResponse
    {
        $pedido = Pedido::create([
            'numero_mesa' => $request->numero_mesa,
            'cliente' => $request->cliente,
            'estado' => 'pendiente',
            'user_id' => $request->user()->id,
        ]);

        $total = 0;
        $productos = [];

        foreach ($request->productos as $item) {
            $subtotal = $item['cantidad'] * $item['precio_unitario'];
            $total += $subtotal;
            $productos[$item['id']] = [
                'cantidad' => $item['cantidad'],
                'precio_unitario' => $item['precio_unitario'],
            ];
        }

        $pedido->productos()->attach($productos);
        $pedido->update(['total' => $total]);

        $mesa = Mesa::where('numero', $request->numero_mesa)->first();
        if ($mesa) {
            $mesa->ocupar();
            $mesa->save();
        }

        foreach ($request->productos as $item) {
            Producto::where('id', $item['id'])
                ->decrement('stock_actual', $item['cantidad']);
        }

        return redirect()->route('inicio')->with('pedido_id', $pedido->id);
    }

    public function update(UpdatePedidoRequest $request, Pedido $pedido): RedirectResponse
    {
        $currentProducts = $pedido->productos()->get()->keyBy('id');
        $newProductIds = collect($request->productos)->pluck('id')->toArray();

        // 1. Restore stock for removed products
        foreach ($currentProducts as $producto) {
            if (! in_array($producto->id, $newProductIds)) {
                Producto::where('id', $producto->id)
                    ->increment('stock_actual', $producto->pivot->cantidad);
            }
        }

        // 2. Adjust stock for updated products (difference)
        foreach ($request->productos as $item) {
            $currentCantidad = $currentProducts->get($item['id'])?->pivot->cantidad ?? 0;
            $diferencia = $item['cantidad'] - $currentCantidad;

            if ($diferencia > 0) {
                Producto::where('id', $item['id'])
                    ->decrement('stock_actual', $diferencia);
            } elseif ($diferencia < 0) {
                Producto::where('id', $item['id'])
                    ->increment('stock_actual', abs($diferencia));
            }
        }

        // 3. Sync pivot table
        $syncData = [];
        $total = 0;

        foreach ($request->productos as $item) {
            $subtotal = $item['cantidad'] * $item['precio_unitario'];
            $total += $subtotal;
            $syncData[$item['id']] = [
                'cantidad' => $item['cantidad'],
                'precio_unitario' => $item['precio_unitario'],
            ];
        }

        $pedido->productos()->sync($syncData);
        $pedido->update(['total' => $total]);

        return redirect()->route('inicio')->with('pedido_id', $pedido->id);
    }

    public function show(Pedido $pedido): Response
    {
        $pedido->load('productos');

        return Inertia::render('pedido/ticket', [
            'pedido' => $pedido,
        ]);
    }

    public function cancel(CancelPedidoRequest $request, Pedido $pedido): RedirectResponse
    {
        $productos = $pedido->productos()->get();

        foreach ($productos as $producto) {
            Producto::where('id', $producto->id)
                ->increment('stock_actual', $producto->pivot->cantidad);
        }

        $mesa = Mesa::where('numero', $pedido->numero_mesa)->first();
        if ($mesa) {
            $mesa->liberar();
            $mesa->save();
        }

        $pedido->productos()->detach();
        $pedido->update(['estado' => 'cancelado']);

        return redirect()->route('inicio')->with('pedido_cancelado', $pedido->id);
    }

    public function ticket(Pedido $pedido): Response
    {
        $pedido->load('productos');

        return Inertia::render('pedido/ticket', [
            'pedido' => $pedido,
            'print' => true,
        ]);
    }
}
