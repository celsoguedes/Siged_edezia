<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Venda; // Importante para calcular o total de vendas
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProdutoController extends Controller
{
    public function index()
    {
        // 1. Busca todos os produtos para a listagem
        $produtos = Produto::all();

        // 2. Calcula o total acumulado de todas as vendas realizadas
        $totalVendas = Venda::sum('total_amount');

        // 3. Calcula o total de itens físicos em estoque
        $totalEstoque = Produto::sum('quantidade_estoque');

        // 4. Retorna para a página Index.jsx com todos os dados
        return Inertia::render('Produtos/Index', [
            'produtos' => $produtos,
            'totalVendas' => number_format($totalVendas, 2, ',', '.'), // Formata para Real R$
            'totalEstoque' => $totalEstoque,
        ]);
    }

    public function store(Request $request)
    {
        // Validação seguindo os novos campos do banco de dados
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'categoria' => 'nullable|string|max:255',
            'preco_venda' => 'required|numeric|min:0', // Novo campo[cite: 1]
            'quantidade_estoque' => 'required|integer|min:0', // Novo campo[cite: 1]
            'imagem' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('imagem')) {
            $validated['imagem'] = $request->file('imagem')->store('produtos', 'public');
        }

        Produto::create($validated);

        return redirect()->back()->with('success', 'Peça cadastrada com sucesso!');
    }
}
