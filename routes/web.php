<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\PedidoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rota inicial - Redireciona para o Dashboard ou Boas-vindas
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Rota do Dashboard (Protegida por Autenticação)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// GRUPO DE ROTAS PROTEGIDAS
Route::middleware('auth')->group(function () {

    // --- ROTAS DO PERFIL DO USUÁRIO ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- ROTAS DO SISTEMA DE CLIENTES ---
    Route::resource('clientes', ClienteController::class);

    // --- NOVA ROTA: SISTEMA DE PRODUTOS ---
    // ADICIONE ESTA LINHA ABAIXO:
    Route::resource('produtos', ProdutoController::class);
    Route::resource('pedidos', PedidoController::class);
    Route::patch('/pedidos/{pedido}/status', [PedidoController::class, 'updateStatus'])->name('pedidos.updateStatus');
});

require __DIR__ . '/auth.php';
