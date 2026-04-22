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
    Schema::create('produtos', function (Blueprint $table) {
        $table->id();
        $table->string('nome'); // Ex: Camisa Sócio, Calça Masculina [cite: 7, 10]
        $table->string('categoria'); // Ex: UDV, Moda Geral [cite: 1, 65]
        $table->text('descricao')->nullable();
        $table->string('imagem')->nullable(); // Caminho da imagem para o catálogo [cite: 65, 75]
        $table->boolean('eh_fabricacao_propria')->default(true); //
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
