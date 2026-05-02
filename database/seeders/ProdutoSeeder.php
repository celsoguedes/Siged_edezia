<?php

namespace Database\Seeders;

use App\Models\Produto;
use Illuminate\Database\Seeder;

class ProdutoSeeder extends Seeder
{
    public function run(): void
{
    Produto::create([
        'nome' => 'Camisa Gandola UDV',
        'categoria' => 'Fardamento',
        'preco_venda' => 180.00, // Alterado de preco_base
        'quantidade_estoque' => 50, // Adicionado para o controle de estoque
        'descricao' => 'Fardamento oficial padrão.'
    ]);

    Produto::create([
        'nome' => 'Calça Social Masculina',
        'categoria' => 'Social',
        'preco_venda' => 150.00, // Alterado de preco_base
        'quantidade_estoque' => 30, // Adicionado para o controle de estoque
        'descricao' => 'Calça social com corte clássico.'
    ]);
}
}
