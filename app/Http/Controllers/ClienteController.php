<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index()
{
    // Criamos um cliente manual para testar a ponte Laravel -> React
    $clientes = [
        [
            'id' => 1,
            'nome_completo' => 'Teste Manual de Conexão',
            'telefone' => '69 9999-9999',
            'nucleo' => 'Núcleo de Teste'
        ]
    ];

    return Inertia::render('Clientes/Index', [
        'clientes' => $clientes
    ]);
}
}
