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
    Schema::create('clientes', function (Blueprint $table) {
        $table->id();
        $table->string('nome_completo');
        $table->string('cpf')->unique();
        $table->enum('sexo', ['M', 'F']);
        $table->decimal('altura', 5, 2)->nullable();
        $table->decimal('peso', 5, 2)->nullable();
        $table->string('telefone');
        $table->text('endereco_completo');
        $table->string('grau_hierarquico')->nullable(); // Para UDV [cite: 25]
        $table->string('nucleo')->nullable(); // Para UDV [cite: 25]

        // Medidas Parte Superior (Aceitando NULL conforme solicitado [cite: 47])
        $table->float('medida_pescoco')->nullable();
        $table->float('medida_ombro_ombro')->nullable();
        $table->float('medida_torax')->nullable();
        $table->float('medida_cintura')->nullable();
        $table->float('medida_largura_costas')->nullable();
        $table->float('medida_cava')->nullable();
        $table->float('medida_comprimento_superior')->nullable();
        $table->float('medida_comprimento_manga')->nullable();
        $table->float('medida_biceps')->nullable();
        $table->float('medida_punho')->nullable();

        // Medidas Parte Inferior e Femininas
        $table->float('medida_quadril')->nullable();
        $table->float('medida_altura_quadril')->nullable();
        $table->float('medida_comprimento_total')->nullable();
        $table->float('medida_entrepernas')->nullable();
        $table->float('medida_altura_gancho')->nullable();
        $table->float('medida_coxa')->nullable();
        $table->float('medida_joelho')->nullable();
        $table->float('medida_barra')->nullable();
        $table->float('medida_busto')->nullable(); // Específico feminino [cite: 48]

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
