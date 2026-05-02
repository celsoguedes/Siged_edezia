<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ItemVenda extends Model
{
    use HasFactory;

    protected $table = 'sale_items'; // Nome da tabela que criamos na migration

    protected $fillable = [
        'sale_id',
        'produto_id',
        'quantity',
        'unit_price',
    ];

    // Relacionamento: Um item pertence a um produto
    public function produto()
    {
        return $this->belongsTo(Produto::class, 'produto_id');
    }
}
