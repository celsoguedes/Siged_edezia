<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
    'nome_completo', 'cpf', 'telefone', 'endereco_completo', 'sexo', 'nucleo', 'grau_hierarquico', 'altura', 'peso',
    'medida_pescoco', 'medida_ombro_ombro', 'medida_torax', 'medida_cintura', 'medida_largura_costas',
    'medida_cava', 'medida_comprimento_superior', 'medida_comprimento_manga', 'medida_biceps', 'medida_punho',
    'medida_quadril', 'medida_altura_quadril', 'medida_comprimento_total', 'medida_entrepernas',
    'medida_altura_gancho', 'medida_coxa', 'medida_joelho', 'medida_barra',
    'medida_altura_busto', 'medida_distancia_bustos', 'medida_comprimento_frente',
    'medida_comprimento_costas', 'medida_circunferencia_barra', 'medida_comprimento_saia', 'medida_comprimento_vestido'
];
}
