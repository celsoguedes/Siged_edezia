<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\PedidoItem;
use App\Models\Cliente;
use App\Models\Produto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index()
    {
        return Inertia::render('Pedidos/Index', [
            'pedidos' => Pedido::with('cliente')->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Pedidos/Create', [
            'clientes' => Cliente::all([
                'id', 'nome_completo', 'medida_pescoco', 'medida_ombro_ombro',
                'medida_punho', 'medida_torax', 'medida_cintura', 'medida_quadril',
                'medida_coxa', 'medida_joelho', 'medida_comprimento_total'
            ]),
            'produtos' => Produto::all(['id', 'nome', 'preco_base']),
            'opcoes_tecidos' => ['Brim', 'Linho Panamá', 'Elanca', 'Gabardine Focus', 'Gabardine Faveiro'],
            'opcoes_tamanhos' => ['P', 'M', 'G', 'GG', 'XG'] // Garante o envio dos tamanhos[cite: 1]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'produto_id' => 'required|exists:produtos,id',
            'tecido' => 'required|string',
            'tipo_ajuste' => 'required|in:Sob Medida,Padrão',
            'tamanho_padrao' => 'nullable|required_if:tipo_ajuste,Padrão|string',
            'quantidade' => 'required|integer|min:1',
            'observacoes_item' => 'nullable|string',
            'medida_pescoco' => 'nullable',
            'medida_ombro_ombro' => 'nullable',
            'medida_punho' => 'nullable',
            'medida_torax' => 'nullable',
            'medida_cintura' => 'nullable',
            'medida_quadril' => 'nullable',
            'medida_coxa' => 'nullable',
            'medida_joelho' => 'nullable',
            'medida_comprimento_total' => 'nullable',
        ]);

        $produto = Produto::findOrFail($validated['produto_id']);

        $pedido = Pedido::create([
            'cliente_id' => $validated['cliente_id'],
            'data_pedido' => now(),
            'previsao_entrega' => now()->addDays(15),
            'valor_total' => $produto->preco_base * $validated['quantidade'],
            'status' => 'Pendente',
        ]);

        $dadosItem = [
            'pedido_id' => $pedido->id,
            'produto_id' => $validated['produto_id'],
            'quantidade' => $validated['quantidade'],
            'preco_unitario' => $produto->preco_base,
            'tipo_ajuste' => $validated['tipo_ajuste'],
            'tamanho_padrao' => $request->tamanho_padrao,
            'tecido' => $validated['tecido'],
            'observacoes_item' => $validated['observacoes_item'], // Salva as observações[cite: 1]
            'medida_pescoco' => $request->medida_pescoco,
            'medida_ombro_ombro' => $request->medida_ombro_ombro,
            'medida_punho' => $request->medida_punho,
            'medida_torax' => $request->medida_torax,
            'medida_cintura' => $request->medida_cintura,
            'medida_quadril' => $request->medida_quadril,
            'medida_coxa' => $request->medida_coxa,
            'medida_joelho' => $request->medida_joelho,
            'medida_comprimento_total' => $request->medida_comprimento_total,
        ];

        PedidoItem::create($dadosItem);

        return redirect()->route('pedidos.index')->with('success', 'Pedido gerado!');
    }

    public function show(Pedido $pedido)
    {
        $pedido->load(['cliente', 'itens.produto']);
        return Inertia::render('Pedidos/Show', ['pedido' => $pedido]);
    }
}
