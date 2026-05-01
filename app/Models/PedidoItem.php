<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoItem extends Model
{
    use HasFactory;

    // Como o nome da tabela tem underline, é bom garantir que o Laravel encontre
    protected $table = 'pedido_itens';

    protected $fillable = [
        'pedido_id',
        'produto_id',
        'quantidade',
        'preco_unitario',
        'tipo_ajuste',
        'tamanho_padrao',
        'tecido',
        'medida_torax',
        'medida_cintura',
        'medida_quadril',
        'observacoes_item'
    ];

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }
}
