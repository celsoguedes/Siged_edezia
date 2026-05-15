<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProdutoController extends Controller
{
    public function index()
    {
        return Inertia::render('Produtos/Index', [
            'produtos' => Produto::all(),
            'clientes' => Cliente::all(),
            'totalVendas' => 0, // Ajuste conforme sua lógica de vendas
            'totalEstoque' => Produto::sum('quantidade_estoque'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Produtos/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'categoria' => 'required|string|max:255',
            'preco_venda' => 'required|numeric|min:0',
            'quantidade_estoque' => 'required|integer|min:0',
            'imagem' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('imagem')) {
            $validated['imagem'] = $request->file('imagem')->store('produtos', 'public');
        }

        Produto::create($validated);

        return redirect()->route('produtos.index')->with('success', 'Peça cadastrada com sucesso!');
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

        if ($request->hasFile('imagem')) {
            if ($produto->imagem) {
                Storage::disk('public')->delete($produto->imagem);
            }
            $validated['imagem'] = $request->file('imagem')->store('produtos', 'public');
        }

        $produto->update($validated);

        return redirect()->route('produtos.index')->with('success', 'Produto atualizado!');
    }
}
