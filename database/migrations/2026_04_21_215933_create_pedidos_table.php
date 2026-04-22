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
        $table->date('data_pedido');
        $table->date('previsao_entrega'); // Base para o alerta de 2 dias

        // Fluxo de Status: Aceito, Em Produção, Fabricado, Entregue [cite: 58]
        $table->enum('status', ['Aceito', 'Em Produção', 'Fabricado', 'Entregue'])->default('Aceito');

        // Financeiro do Pedido [cite: 60, 61, 62, 63]
        $table->decimal('valor_total', 10, 2)->default(0);
        $table->decimal('valor_frete', 8, 2)->default(0);
        $table->string('forma_pagamento'); // À Vista, 50/50, Parcelado...

        $table->text('observacoes')->nullable();
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
