<?php

namespace App\Http\Controllers;

use App\Models\MetodoPago;
use App\Models\Producto;
use App\Models\Venta;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $startDate = $request->input('start_date', Carbon::now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', Carbon::now()->format('Y-m-d'));

        $period = $request->input('period', 'day');

        $ventas = Venta::with('metodoPago')
            ->whereBetween('created_at', [$startDate, Carbon::parse($endDate)->endOfDay()])
            ->get();

        $salesData = match ($period) {
            'week' => $ventas->groupBy(fn ($v) => Carbon::parse($v->created_at)->format('Y-W')),
            'month' => $ventas->groupBy(fn ($v) => Carbon::parse($v->created_at)->format('Y-m')),
            default => $ventas->groupBy(fn ($v) => Carbon::parse($v->created_at)->format('Y-m-d')),
        };

        $salesChart = $salesData->map(function ($group, $key) {
            $date = Carbon::parse($group->first()->created_at);

            return [
                'period' => $key,
                'label' => match (true) {
                    $key && preg_match('/^\d{4}-\d{2}$/', $key) => $date->isoFormat('MMM YYYY'),
                    $key && preg_match('/^\d{4}-\d{2}$/', $key) === 0 && str_contains($key, '-W') => 'Sem '.substr($key, 5),
                    default => $date->isoFormat('DD MMM'),
                },
                'total' => round((float) $group->sum('total_final'), 2),
                'cantidad' => $group->count(),
            ];
        })->values();

        $productStats = Producto::withCount(['pedidos' => function ($q) use ($startDate, $endDate) {
            $q->whereHas('venta', fn ($v) => $v->whereBetween('created_at', [$startDate, Carbon::parse($endDate)->endOfDay()]));
        }])->where('producto_esta_vigente', true)
            ->get()
            ->filter(fn ($p) => $p->pedidos_count > 0)
            ->sortByDesc('pedidos_count')
            ->take(10)
            ->map(fn ($p) => [
                'descripcion' => $p->descripcion,
                'cantidad' => $p->pedidos_count,
            ])
            ->values();

        $paymentMethodStats = MetodoPago::withCount(['ventas' => fn ($q) => $q->whereBetween('created_at', [$startDate, Carbon::parse($endDate)->endOfDay()])])
            ->get()
            ->map(fn ($m) => [
                'metodo' => $m->descripcion,
                'cantidad' => $m->ventas_count,
                'total' => round((float) $m->ventas()->whereBetween('created_at', [$startDate, Carbon::parse($endDate)->endOfDay()])->sum('total_final'), 2),
            ]);

        $summary = [
            'total_ventas' => $ventas->count(),
            'ingresos_totales' => round((float) $ventas->sum('total_final'), 2),
            'total_descuentos' => round((float) $ventas->sum('descuento_aplicado'), 2),
            'promedio_venta' => $ventas->count() > 0 ? round((float) $ventas->avg('total_final'), 2) : 0,
        ];

        return Inertia::render('reporte/vista-reporte', [
            'salesChart' => $salesChart,
            'productStats' => $productStats,
            'paymentMethodStats' => $paymentMethodStats,
            'summary' => $summary,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'period' => $period,
            ],
        ]);
    }
}
