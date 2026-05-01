<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'data_pedido',
        'previsao_entrega',
        'valor_total',
        'valor_pago',
        'status',
        'observacoes_gerais'
    ];

    // Relacionamento: Um pedido pertence a um cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    // Relacionamento: Um pedido tem muitos itens (peças)
    public function itens()
    {
        return $this->hasMany(PedidoItem::class);
    }
}
