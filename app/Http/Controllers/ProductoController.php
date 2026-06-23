<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyProductoRequest;
use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use App\Models\CategoriaProducto;
use App\Models\Producto;
use Inertia\Inertia;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::all();
        $categorias = CategoriaProducto::all();

        return Inertia::render('producto/vista-producto', [
            'productos' => $productos,
            'categorias' => $categorias,
        ]);

    }

    /**Show the form for creating a new resource.*/

    public function create()
    {
        //
    }

    /* Store a newly created resource in storage. */

    public function store(StoreProductoRequest $request)
    {
        Producto::create([
            ...$request->validated(),
            'producto_esta_vigente' => true,
            'motivo_baja' => null,
        ]);

        return redirect()->back()->with('success', 'Producto creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        return Inertia::render('producto/dialog-form-producto', [
            'producto' => $producto,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductoRequest $request, Producto $producto)
    {
        //
        $producto->update($request->validated());

        return redirect()->route('producto')->with('success', 'Producto actualizado exitosamente.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyProductoRequest $request, Producto $producto)
    {
        $producto->update([
            ...$request->validated(),
            'producto_esta_vigente' => false,
        ]);

        return redirect()->route('producto')->with('success', 'Producto eliminado exitosamente.');
    }
}
