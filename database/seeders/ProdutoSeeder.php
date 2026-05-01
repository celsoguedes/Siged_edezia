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
            'preco_base' => 180.00
        ]);

        Produto::create([
            'nome' => 'Calça Social Masculina',
            'categoria' => 'Social',
            'preco_base' => 150.00
        ]);
    }
}
