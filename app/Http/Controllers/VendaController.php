<?php

namespace App\Http\Controllers;

use App\Models\Venda;
use App\Models\ItemVenda;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VendaController extends Controller
{
    public function index(Request $request)
    {
        // 1. Captura todos os filtros da URL
        $nome = $request->input('nome');
        $dataInicio = $request->input('data_inicio');
        $dataFim = $request->input('data_fim');

        $query = Venda::with(['itens.produto', 'cliente']);

        // 2. Filtro por nome do produto
        if ($nome) {
            $query->whereHas('itens.produto', function ($q) use ($nome) {
                $q->where('nome', 'like', "%{$nome}%");
            });
        }

        // 3. Filtro por Período (A lógica que estava faltando)
        if ($dataInicio && $dataFim) {
            // Usamos whereBetween para pegar o intervalo exato
            $query->whereBetween('sale_date', [$dataInicio . ' 00:00:00', $dataFim . ' 23:59:59']);
        }

        $vendas = $query->orderBy('sale_date', 'desc')->get();

        $estatisticas = [
            'quantidade' => $vendas->count(),
            'totalFiltrado' => number_format($vendas->sum('total_amount'), 2, ',', '.')
        ];

        return Inertia::render('Vendas/Historico', [
            'vendas' => $vendas,
            // Enviamos os filtros de volta para manter os campos preenchidos na tela
            'filtros' => $request->only(['nome', 'data_inicio', 'data_fim']),
            'estatisticas' => $estatisticas
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'itens' => 'required|array',
            'total' => 'required|numeric',
            'cliente_id' => 'nullable|exists:clientes,id',
        ]);

        return DB::transaction(function () use ($request) {
            $venda = Venda::create([
                'total_amount' => $request->total,
                'sale_date'    => now(),
                'cliente_id'   => $request->cliente_id,
            ]);

            foreach ($request->itens as $item) {
                ItemVenda::create([
                    'sale_id'    => $venda->id,
                    'produto_id' => $item['id'],
                    'quantity'   => $item['qtd'],
                    'unit_price' => $item['preco_venda'],
                ]);

                Produto::where('id', $item['id'])->decrement('quantidade_estoque', $item['qtd']);
            }

            return redirect()->route('produtos.index')->with('success', 'Venda realizada!');
        });
    }
}
