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
    Schema::create('pedidos', function (Blueprint $table) {
        $table->id();
        $table->foreignId('cliente_id')->constrained('clientes');
        $table->dateTime('data_pedido');

        // Adicione ->nullable() nestes campos:
        $table->date('previsao_entrega')->nullable();
        $table->string('forma_pagamento')->nullable();
        $table->decimal('valor_pago', 10, 2)->default(0)->nullable();
        $table->text('observacoes_gerais')->nullable();

        $table->decimal('valor_total', 10, 2);
        $table->enum('status', ['Pendente', 'Em Produção', 'Finalizado', 'Cancelado'])->default('Pendente');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
