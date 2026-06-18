<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePedidoRequest;
use App\Models\Pedido;
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

        return redirect()->route('inicio')->with('pedido_id', $pedido->id);
    }

    public function show(Pedido $pedido): Response
    {
        $pedido->load('productos');

        return Inertia::render('pedido/ticket', [
            'pedido' => $pedido,
        ]);
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
