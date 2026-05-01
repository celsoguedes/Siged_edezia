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

        $table->integer('quantidade')->default(1);
        $table->decimal('preco_unitario', 10, 2);

        // 1. Tipo de Tamanho: 'Sob Medida' ou 'Padrão'
        $table->enum('tipo_ajuste', ['Sob Medida', 'Padrão'])->default('Sob Medida');

        // 2. Tamanho Padrão (só preenchido se tipo_ajuste for 'Padrão')
        $table->enum('tamanho_padrao', ['P', 'M', 'G', 'GG', 'XG'])->nullable();

        // 3. Tipo de Tecido (Lista pré-definida)
        $table->enum('tecido', [
            'Brim',
            'Linho Panamá',
            'Elanca',
            'Gabardine Focus',
            'Gabardine Faveiro'
        ])->nullable();

        $table->text('observacoes_item')->nullable();
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
