<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Venda;
use App\Models\ItemVenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VendaController extends Controller
{
    public function store(Request $request)
    {
        // O $request deve conter um array de itens: [['id' => 1, 'qtd' => 2], ...]

        return DB::transaction(function () use ($request) {
            // 1. Criar o registro da Venda
            $venda = Venda::create([
                'total_amount' => 0, // Atualizaremos após somar os itens
                'sale_date' => now(),
            ]);

            $totalVenda = 0;

            foreach ($request->itens as $item) {
                $produto = Produto::findOrFail($item['id']);

                // 2. Verificar se há estoque suficiente
                if ($produto->quantidade_estoque < $item['qtd']) {
                    throw new \Exception("Estoque insuficiente para o produto: {$produto->nome}");
                }

                // 3. Registrar o item da venda (preservando o preço fixo atual)
                ItemVenda::create([
                    'sale_id' => $venda->id,
                    'produto_id' => $produto->id,
                    'quantity' => $item['qtd'],
                    'unit_price' => $produto->preco_venda, // Preço fixo definido no banco[cite: 1]
                ]);

                // 4. Baixa automática no estoque
                $produto->decrement('quantidade_estoque', $item['qtd']);

                $totalVenda += $produto->preco_venda * $item['qtd'];
            }

            // 5. Atualizar o valor total da venda
            $venda->update(['total_amount' => $totalVenda]);

            return response()->json(['message' => 'Venda realizada com sucesso!', 'venda_id' => $venda->id]);
        });
    }
}
