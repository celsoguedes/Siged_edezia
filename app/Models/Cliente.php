<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    // Definimos quais campos o Laravel pode gravar no banco
    protected $fillable = [
        'nome_completo',
        'cpf',
        'sexo',
        'telefone',
        'endereco_completo',
        'grau_hierarquico',
        'nucleo',
        'medida_pescoco',
        'medida_busto'
        // Adicione os outros campos de medidas aqui depois...
    ];
}
