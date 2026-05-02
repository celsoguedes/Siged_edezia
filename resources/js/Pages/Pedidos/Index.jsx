import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ pedidos }) {
    return (
        <div className="bg-gray-50 min-h-screen p-6 md:p-12 font-sans">
            <Head title="Pedidos - Edézia Design" />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">📦 Livro de Pedidos</h1>
                    <Link
                        href={route('pedidos.create')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition"
                    >
                        + Novo Pedido
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">ID</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Cliente</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Valor Total</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Data</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-400">#{pedido.id}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{pedido.cliente?.nome_completo}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-600">R$ {pedido.valor_total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                            pedido.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                            {pedido.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(pedido.created_at).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4">
                                    <Link
                                        href={route('pedidos.show', pedido.id)}
                                        className="text-indigo-600 font-bold text-xs hover:underline"
                                    >
        Detalhes
    </Link>
</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
