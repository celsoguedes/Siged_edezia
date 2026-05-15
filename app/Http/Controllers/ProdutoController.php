<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Venda;
use App\Models\Cliente; // Importante: certifique-se que o Model Cliente existe
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
    public function create()
{
    return Inertia::render('Produtos/Create');
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

    public function edit(Produto $produto)
{
    return Inertia::render('Produtos/Edit', [
        'produto' => $produto
    ]);
}

public function update(Request $request, Produto $produto)
{
    $validated = $request->validate([
        'nome' => 'required|string|max:255',
        'categoria' => 'required|string|max:255',
        'preco_venda' => 'required|numeric|min:0',
        'quantidade_estoque' => 'required|integer|min:0',
        'imagem' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    // Lógica para substituição de imagem
    if ($request->hasFile('imagem')) {
        // Deleta a imagem antiga se ela existir
        if ($produto->imagem) {
            Storage::disk('public')->delete($produto->imagem);
        }
        // Salva a nova
        $validated['imagem'] = $request->file('imagem')->store('produtos', 'public');
    }

    $produto->update($validated);

    return redirect()->route('produtos.index')->with('success', 'Produto atualizado com sucesso!');
}
}

