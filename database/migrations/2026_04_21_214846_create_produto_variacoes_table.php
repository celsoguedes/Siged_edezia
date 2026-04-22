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
        Schema::create('produto_variacoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produto_id')->constrained('produtos')->onDelete('cascade');
            $table->string('tamanho'); // P, M, G, GG, XG ou Sob Medida [cite: 8, 11, 25]
            $table->string('tecido'); // Gabardine, Brim, Elanca, etc. [cite: 8, 10, 14]
            $table->decimal('preco', 10, 2); // O preço específico desta combinação
            $table->integer('estoque_atual')->default(0); //
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto_variacoes');
    }
};
