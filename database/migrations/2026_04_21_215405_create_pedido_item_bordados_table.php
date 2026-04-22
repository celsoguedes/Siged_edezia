<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedido_item_bordados', function (Blueprint $table) {
            $table->id();
            // ID do item do pedido (ex: a camisa específica que o cliente comprou)
            $table->unsignedBigInteger('pedido_item_id');
            $table->foreignId('bordado_id')->constrained('bordados');
            $table->decimal('preco_aplicado', 8, 2); // Salva o preço do momento da venda
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedido_item_bordados');
    }
};
