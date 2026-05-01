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
            'clientes' => Cliente::all(['id', 'nome_completo']), // Para o select de clientes
            'produtos' => Produto::all(['id', 'nome', 'preco_base']), // Para o select de produtos
            // Enviamos as opções de tecidos para o React montar a lista
            'opcoes_tecidos' => [
                'Brim', 'Linho Panamá', 'Elanca', 'Gabardine Focus', 'Gabardine Faveiro'
            ],
            'opcoes_tamanhos' => ['P', 'M', 'G', 'GG', 'XG']
        ]);
    }

    public function store(Request $request)
{
    // 1. Validação dos dados que vêm do formulário
    $validated = $request->validate([
        'cliente_id' => 'required|exists:clientes,id',
        'produto_id' => 'required|exists:produtos,id',
        'tecido' => 'required|string',
        'tipo_ajuste' => 'required|in:Sob Medida,Padrão',
        'tamanho_padrao' => 'nullable|required_if:tipo_ajuste,Padrão|string',
        'quantidade' => 'required|integer|min:1',
        'observacoes_item' => 'nullable|string',
    ]);

    // 2. Buscar o produto para saber o preço base atual
    $produto = \App\Models\Produto::find($validated['produto_id']);
    $valorTotal = $produto->preco_base * $validated['quantidade'];

    // 3. Criar o Pedido (Cabeçalho)
    $pedido = \App\Models\Pedido::create([
        'cliente_id' => $validated['cliente_id'],
        'data_pedido' => now(),
        'valor_total' => $valorTotal,
        'status' => 'Pendente',
    ]);

    // 4. Se for 'Sob Medida', vamos buscar as medidas atuais do cliente
    $dadosItem = [
        'pedido_id' => $pedido->id,
        'produto_id' => $validated['produto_id'],
        'quantidade' => $validated['quantidade'],
        'preco_unitario' => $produto->preco_base,
        'tipo_ajuste' => $validated['tipo_ajuste'],
        'tamanho_padrao' => $validated['tamanho_padrao'],
        'tecido' => $validated['tecido'],
        'observacoes_item' => $validated['observacoes_item'],
    ];

    if ($validated['tipo_ajuste'] === 'Sob Medida') {
        $cliente = \App\Models\Cliente::find($validated['cliente_id']);
        // Salvamos um "snapshot" das medidas do cliente no item do pedido
        $dadosItem['medida_torax'] = $cliente->medida_torax;
        $dadosItem['medida_cintura'] = $cliente->medida_cintura;
        $dadosItem['medida_quadril'] = $cliente->medida_quadril;
        // Adicione aqui as outras medidas que você quer "congelar" no pedido
    }

    // 5. Salvar o item do pedido
    \App\Models\PedidoItem::create($dadosItem);

    // 6. Redirecionar para a listagem com mensagem de sucesso
    return redirect()->route('pedidos.index')->with('success', 'Pedido gerado com sucesso!');
}
}
