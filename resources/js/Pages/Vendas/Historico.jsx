import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Historico({ auth, vendas, estatisticas, filtros }) {
    // Estados locais para os campos de busca
    const [params, setParams] = useState({
        nome: filtros.nome || '',
        data_inicio: filtros.data_inicio || '',
        data_fim: filtros.data_fim || '',
    });

    const handleFiltrar = (e) => {
        e.preventDefault();
        router.get(route('vendas.historico'), params, { 
            preserveState: true,
            replace: true 
        });
    };

    const limparFiltros = () => {
        setParams({ nome: '', data_inicio: '', data_fim: '' });
        router.get(route('vendas.historico'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Filtros de Vendas" />

            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 p-6">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Barra de Filtros Glassmorphism */}
                    <form onSubmit={handleFiltrar} className="mb-8 p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2 ml-1">Buscar Produto</label>
                            <input 
                                type="text"
                                value={params.nome}
                                onChange={e => setParams({...params, nome: e.target.value})}
                                placeholder="Ex: Camisa Gandola..."
                                className="w-full bg-white/50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2 ml-1">De:</label>
                            <input 
                                type="date"
                                value={params.data_inicio}
                                onChange={e => setParams({...params, data_inicio: e.target.value})}
                                className="bg-white/50 border-none rounded-xl text-xs font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2 ml-1">Até:</label>
                            <input 
                                type="date"
                                value={params.data_fim}
                                onChange={e => setParams({...params, data_fim: e.target.value})}
                                className="bg-white/50 border-none rounded-xl text-xs font-bold"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black uppercase text-[10px] hover:bg-indigo-700 transition">
                                Filtrar
                            </button>
                            <button type="button" onClick={limparFiltros} className="bg-white/60 text-gray-500 px-4 py-2.5 rounded-xl font-black uppercase text-[10px] hover:bg-red-50 hover:text-red-600 transition">
                                ✕
                            </button>
                        </div>
                    </form>

                    {/* Resumo do Período */}
                    <div className="mb-6 flex justify-between items-end px-2">
                        <div>
                            <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tighter">Resultados</h2>
                            <p className="text-gray-500 text-[10px] font-bold uppercase">{estatisticas.quantidade} vendas encontradas</p>
                        </div>
                        <div className="text-right">
                            <p className="text-indigo-400 text-[10px] font-black uppercase">Total no Período</p>
                            <p className="text-3xl font-black text-indigo-600">R$ {estatisticas.totalFiltrado}</p>
                        </div>
                    </div>

                    {/* ... (Aqui continua o mapeamento das vendas que já fizemos no tópico anterior) */}
                    <div className="space-y-4">
                        {vendas.map(venda => (
                            <div key={venda.id} className="bg-white/60 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-sm">
                                {/* Conteúdo da venda... */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}