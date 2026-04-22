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
        Schema::create('pedido_itens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pedido_id')->constrained('pedidos')->onDelete('cascade');
            $table->foreignId('produto_id')->constrained('produtos');
            $table->foreignId('variacao_id')->constrained('produto_variacoes'); // Tecido/Tamanho [cite: 70]

            $table->integer('quantidade')->default(1);
            $table->decimal('preco_unitario', 10, 2); // Preço da variação no momento da venda
            $table->decimal('subtotal', 10, 2); // (Quantidade * Preco) + Bordados

            // Para camisas de manga curta ou comprida [cite: 8, 70]
            $table->enum('tipo_manga', ['Curta', 'Comprida', 'N/A'])->default('N/A');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedido_itens');
    }
};
