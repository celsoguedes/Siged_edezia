<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('sales', function (Blueprint $table) {
        // Cria a coluna cliente_id que aponta para a sua tabela de clientes existente
        $table->foreignId('cliente_id')->nullable()->constrained('clientes')->onDelete('set null');
    });
}

    /**
     * Reverse the migrations.
     */
public function down(): void
{
    Schema::table('sales', function (Blueprint $table) {
        // Primeiro removemos a chave estrangeira, depois a coluna
        $table->dropForeign(['cliente_id']);
        $table->dropColumn('cliente_id');
    });
}

};
