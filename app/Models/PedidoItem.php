<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoItem extends Model
{
    use HasFactory;

    protected $table = 'pedido_itens';

    protected $fillable = [
        'pedido_id',
        'produto_id',
        'quantidade',
        'preco_unitario',
        'tipo_ajuste',
        'tamanho_padrao',
        'tecido',
        'observacoes_item',

        // Medidas Superiores
        'medida_pescoco',
        'medida_ombro_ombro',
        'medida_torax',
        'medida_cintura',
        'medida_largura_costas',
        'medida_cava',
        'medida_comprimento_superior',
        'medida_comprimento_manga',
        'medida_biceps',
        'medida_punho',

        // Medidas Inferiores
        'medida_quadril',
        'medida_altura_quadril',
        'medida_comprimento_total',
        'medida_entrepernas',
        'medida_altura_gancho',
        'medida_coxa',
        'medida_joelho',
        'medida_barra',

        // Específicos Femininos e Extras
        'medida_altura_busto',
        'medida_distancia_bustos',
        'medida_comprimento_frente',
        'medida_comprimento_costas',
        'medida_circunferencia_barra',
        'medida_comprimento_saia',
        'medida_comprimento_vestido',
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }
}
