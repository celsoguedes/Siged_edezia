<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('produtos', function (Blueprint $table) {
        $table->id();
        $table->string('nome');
        $table->string('categoria')->nullable();
        $table->string('imagem')->nullable();
        $table->decimal('preco_venda', 10, 2)->default(0); // Ajustado para refletir o preço fixo de venda
        $table->integer('quantidade_estoque')->default(0); // Campo essencial para o controle de estoque
        $table->text('descricao')->nullable();
        $table->timestamps();
    });
}
};
