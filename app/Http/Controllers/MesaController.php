<?php

namespace App\Http\Controllers;

use App\Models\Mesa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MesaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('mesa/vista-mesa', [
            'mesas' => Mesa::orderBy('numero')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'numero' => ['required', 'integer', 'min:1', 'unique:mesas,numero'],
            'capacidad' => ['required', 'integer', 'min:1'],
        ]);

        Mesa::create($validated);

        return redirect()->route('mesa.index');
    }

    public function edit(Mesa $mesa): Response
    {
        return Inertia::render('mesa/vista-mesa', [
            'mesas' => Mesa::orderBy('numero')->get(),
            'editMesa' => $mesa,
        ]);
    }

    public function update(Request $request, Mesa $mesa): RedirectResponse
    {
        $validated = $request->validate([
            'numero' => ['required', 'integer', 'min:1', 'unique:mesas,numero,'.$mesa->id],
            'capacidad' => ['required', 'integer', 'min:1'],
        ]);

        $mesa->update($validated);

        return redirect()->route('mesa.index');
    }

    public function destroy(Mesa $mesa): RedirectResponse
    {
        $mesa->delete();

        return redirect()->route('mesa.index');
    }
}
