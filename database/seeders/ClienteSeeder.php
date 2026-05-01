<?php

namespace Database\Seeders;

use App\Models\Cliente;
use Illuminate\Database\Seeder;

class ClienteSeeder extends Seeder
{
    public function run(): void
    {
        Cliente::create([
            'nome_completo' => 'João Silva (Exemplo)', // Nome corrigido conforme migration
            'cpf' => '000.000.000-01',
            'sexo' => 'M',
            'telefone' => '69999998888',
            'endereco_completo' => 'Rua das Flores, 123, Porto Velho - RO', // Campo obrigatório adicionado
            'medida_torax' => 102.0,
            'medida_cintura' => 88.0,
            'medida_quadril' => 95.0,
        ]);
    }
}
