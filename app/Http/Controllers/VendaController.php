<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Venda;
use App\Models\ItemVenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VendaController extends Controller
{
    /**
     * Tela de Histórico de Vendas (Tópico 3)
     */
    public function index(Request $request)
{
    // Captura os filtros da URL
    $buscaNome = $request->input('nome');
    $dataInicio = $request->input('data_inicio');
    $dataFim = $request->input('data_fim');

    // Query base com os relacionamentos
    $query = Venda::with('itens.produto');

    // Filtro por Nome do Produto (dentro da relação de itens)
    if ($buscaNome) {
        $query->whereHas('itens.produto', function($q) use ($buscaNome) {
            $q->where('nome', 'like', '%' . $buscaNome . '%');
        });
    }

    // Filtro por Intervalo de Datas
    if ($dataInicio && $dataFim) {
        $query->whereBetween('sale_date', [$dataInicio, $dataFim]);
    }

    $vendas = $query->orderBy('sale_date', 'desc')->get();

    // Estatísticas baseadas no resultado filtrado
    $totalFiltrado = $vendas->sum('total_amount');

    return Inertia::render('Vendas/Historico', [
        'vendas' => $vendas,
        'filtros' => $request->only(['nome', 'data_inicio', 'data_fim']),
        'estatisticas' => [
            'totalFiltrado' => number_format($totalFiltrado, 2, ',', '.'),
            'quantidade' => $vendas->count()
        ]
    ]);
}

    /**
     * Finalizar Venda (Tópico 2 - Já funcionando)
     */
    public function store(Request $request)
    {
        $request->validate([
            'itens' => 'required|array',
            'total' => 'required|numeric'
        ]);

        return DB::transaction(function () use ($request) {
            $venda = Venda::create([
                'total_amount' => $request->total,
                'sale_date'    => now(),
            ]);

            foreach ($request->itens as $item) {
                $produto = Produto::findOrFail($item['id']);

                ItemVenda::create([
                    'sale_id'    => $venda->id,
                    'produto_id' => $produto->id,
                    'quantity'   => $item['qtd'],
                    'unit_price' => $item['preco_venda'],
                ]);

                $produto->decrement('quantidade_estoque', $item['qtd']);
            }

            return redirect()->back()->with('success', 'Venda realizada!');
        });
    }
}
