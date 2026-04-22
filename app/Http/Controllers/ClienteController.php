<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index()
    {
        // Usando apenas Cliente::all() já que ele foi importado na linha 5
        $clientes = Cliente::all();

        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes
        ]);
    }
    public function create()
    {
        // Por enquanto, apenas para não dar erro
        return Inertia::render('Clientes/Create');
    }
}
