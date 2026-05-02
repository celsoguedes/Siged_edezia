<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Venda extends Model
{
    use HasFactory;

    protected $table = 'sales'; // Nome da tabela que criamos na migration

    protected $fillable = [
        'total_amount',
        'sale_date',
    ];

    // Relacionamento: Uma venda tem muitos itens
    public function itens()
    {
        return $this->hasMany(ItemVenda::class, 'sale_id');
    }
}
