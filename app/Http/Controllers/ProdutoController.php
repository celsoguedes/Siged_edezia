<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutoController extends Controller
{
    /**
     * Exibe a lista de produtos.
     */
    public function index()
    {
        return Inertia::render('Produtos/Index', [
            'produtos' => Produto::all()
        ]);
    }

    /**
     * Salva um novo produto no banco.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'categoria' => 'nullable|string',
            'preco_base' => 'required|numeric',
            'imagem' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Validação da imagem
        ]);

        if ($request->hasFile('imagem')) {
            // Salva a imagem na pasta storage/app/public/produtos
            $path = $request->file('imagem')->store('produtos', 'public');
            $validated['imagem'] = $path;
        }

        Produto::create($validated);
        return redirect()->route('produtos.index');
    }

    // Os outros métodos (create, edit, update, destroy) podem ficar vazios por enquanto
}
