<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Venda;
use App\Models\Cliente; // Importante: certifique-se que o Model Cliente existe
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutoController extends Controller
{
    public function index()
    {
        $produtos = Produto::all();
        $totalVendas = Venda::sum('total_amount');
        $totalEstoque = Produto::sum('quantidade_estoque');

        return Inertia::render('Produtos/Index', [
            'produtos' => $produtos,
            // CORREÇÃO: Usando 'nome_completo' conforme sua tabela de clientes
            'clientes' => Cliente::select('id', 'nome_completo', 'nucleo')->orderBy('nome_completo')->get(),
            'totalVendas' => number_format($totalVendas, 2, ',', '.'),
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
