<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::all();
        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes
        ]);
    }

    public function create()
    {
        return Inertia::render('Clientes/Create');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'nome_completo'      => 'required|string|max:255',
        'cpf'                => 'required|string|unique:clientes,cpf',
        'telefone'           => 'required|string',
        'endereco_completo'  => 'required|string',
        'sexo'               => 'required|string|max:1',
        'nucleo'             => 'nullable|string',
        'grau_hierarquico'   => 'nullable|string',
        'altura'             => 'nullable|numeric',
        'peso'               => 'nullable|numeric',

        // Validação das medidas (agora com prefixo medida_)
        'medida_pescoco'              => 'nullable|numeric',
        'medida_ombro_ombro'          => 'nullable|numeric',
        'medida_torax'                => 'nullable|numeric',
        'medida_cintura'              => 'nullable|numeric',
        'medida_largura_costas'       => 'nullable|numeric',
        'medida_cava'                 => 'nullable|numeric',
        'medida_comprimento_superior' => 'nullable|numeric',
        'medida_comprimento_manga'    => 'nullable|numeric',
        'medida_biceps'               => 'nullable|numeric',
        'medida_punho'                => 'nullable|numeric',
        'medida_quadril'              => 'nullable|numeric',
        'medida_altura_quadril'       => 'nullable|numeric',
        'medida_comprimento_total'    => 'nullable|numeric',
        'medida_entrepernas'          => 'nullable|numeric',
        'medida_altura_gancho'        => 'nullable|numeric',
        'medida_coxa'                 => 'nullable|numeric',
        'medida_joelho'               => 'nullable|numeric',
        'medida_barra'                => 'nullable|numeric',
        'medida_altura_busto'         => 'nullable|numeric',
        'medida_distancia_bustos'     => 'nullable|numeric',
        'medida_comprimento_frente'   => 'nullable|numeric',
        'medida_comprimento_costas'   => 'nullable|numeric',
        'medida_circunferencia_barra' => 'nullable|numeric',
        'medida_comprimento_saia'    => 'nullable|numeric',
        'medida_comprimento_vestido' => 'nullable|numeric',
    ]);

    Cliente::create($validated);
    return redirect()->route('clientes.index')->with('success', 'Cliente cadastrado!');
}
}
