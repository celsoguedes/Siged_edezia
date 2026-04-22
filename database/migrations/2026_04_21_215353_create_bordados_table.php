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
    Schema::create('bordados', function (Blueprint $table) {
        $table->id();
        $table->string('nome'); // Ex: Bordado Mestre, Bordado Conselheiro [cite: 7]
        $table->decimal('preco', 8, 2); // Valor a ser acrescido
        $table->string('imagem_referencia')->nullable(); // Foto do desenho do bordado
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bordados');
    }
};
