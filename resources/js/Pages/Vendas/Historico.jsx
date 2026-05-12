import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Historico({ auth, vendas, estatisticas, filtros }) {
    const [params, setParams] = useState({
        nome: filtros.nome || '',
        data_inicio: filtros.data_inicio || '',
        data_fim: filtros.data_fim || '',
    });

    const handleFiltrar = (e) => {
        e.preventDefault();
        router.get(route('vendas.historico'), params, { preserveState: true });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Histórico de Vendas" />
            <div className="min-h-screen bg-gray-100 p-6 text-indigo-900">
                <div className="max-w-6xl mx-auto">

                    {/* Filtros */}
                    <form onSubmit={handleFiltrar} className="mb-8 p-6 bg-white/40 backdrop-blur-xl rounded-3xl border border-white flex flex-wrap gap-4 items-end">
                        <input
                            type="text"
                            value={params.nome}
                            onChange={e => setParams({...params, nome: e.target.value})}
                            className="flex-1 rounded-xl border-none shadow-sm"
                            placeholder="Buscar produto..."
                        />
                        <input
                            type="date"
                            value={params.data_inicio}
                            onChange={e => setParams({...params, data_inicio: e.target.value})}
                            className="rounded-xl border-none shadow-sm"
                        />
                        <input
                            type="date"
                            value={params.data_fim}
                            onChange={e => setParams({...params, data_fim: e.target.value})}
                            className="rounded-xl border-none shadow-sm"
                        />
                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold">Filtrar</button>
                    </form>

                    {/* Resultados */}
                    <div className="grid gap-4">
                        {vendas.length > 0 ? (
                            vendas.map(venda => (
                                <div key={venda.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between">
                                        <h3 className="font-black uppercase">{venda.cliente?.nome_completo || "Consumidor Final"}</h3>
                                        <p className="font-bold">R$ {parseFloat(venda.total_amount).toFixed(2)}</p>
                                    </div>
                                    {/* ... itens da venda ... */}
                                </div>
                            ))
                        ) : (
                            <div className="bg-white/50 border-2 border-dashed border-gray-300 rounded-[40px] p-20 text-center">
                                <div className="text-6xl mb-4 text-gray-300 italic">🔍</div>
                                <h3 className="text-lg font-black uppercase italic">Nenhuma venda encontrada</h3>
                                <p className="text-gray-400 text-xs font-bold uppercase mt-2">Tente ajustar os filtros ou datas.</p>
                                <Link href={route('vendas.historico')} className="mt-6 inline-block bg-indigo-100 text-indigo-600 px-8 py-2 rounded-xl text-[10px] font-black uppercase">
                                    Limpar Filtros
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
