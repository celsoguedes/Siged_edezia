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

            // 1. Tipo de Tamanho
            $table->enum('tipo_ajuste', ['Sob Medida', 'Padrão'])->default('Sob Medida');

            // 2. Tamanho Padrão
            $table->enum('tamanho_padrao', ['P', 'M', 'G', 'GG', 'XG'])->nullable();

            // 3. Tipo de Tecido
            $table->enum('tecido', [
                'Brim',
                'Linho Panamá',
                'Elanca',
                'Gabardine Focus',
                'Gabardine Faveiro'
            ])->nullable();

            // --- MEDIDAS DO CLIENTE (SNAPSHOT) ---

            // Medidas Superiores
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

            // Medidas Inferiores
            $table->float('medida_quadril')->nullable();
            $table->float('medida_altura_quadril')->nullable();
            $table->float('medida_comprimento_total')->nullable();
            $table->float('medida_entrepernas')->nullable();
            $table->float('medida_altura_gancho')->nullable();
            $table->float('medida_coxa')->nullable();
            $table->float('medida_joelho')->nullable();
            $table->float('medida_barra')->nullable();

            // Específicos Femininos e Extras
            $table->float('medida_altura_busto')->nullable();
            $table->float('medida_distancia_bustos')->nullable();
            $table->float('medida_comprimento_frente')->nullable();
            $table->float('medida_comprimento_costas')->nullable();
            $table->float('medida_circunferencia_barra')->nullable();
            $table->float('medida_comprimento_saia')->nullable();
            $table->float('medida_comprimento_vestido')->nullable();

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
