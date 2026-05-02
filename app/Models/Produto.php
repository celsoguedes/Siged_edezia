<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $table = 'produtos'; // Define explicitamente o nome da tabela

    protected $fillable = [
        'nome',
        'categoria',
        'preco_venda', // Atualizado
        'quantidade_estoque', // Adicionado
        'descricao',
        'imagem',
    ];
}
