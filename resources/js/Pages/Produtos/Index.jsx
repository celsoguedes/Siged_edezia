import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, produtos, clientes }) {
    const [carrinho, setCarrinho] = useState([]);
    const [clienteId, setClienteId] = useState('');

    const adicionarAoCarrinho = (p) => {
        const item = carrinho.find(i => i.id === p.id);
        if (item) {
            setCarrinho(carrinho.map(i => i.id === p.id ? { ...i, qtd: i.qtd + 1 } : i));
        } else {
            setCarrinho([...carrinho, { ...p, qtd: 1 }]);
        }
    };

    const removerDoCarrinho = (id) => {
        setCarrinho(carrinho.filter(i => i.id !== id));
    };

    const confirmarVenda = () => {
        if (carrinho.length === 0) return;
        const totalVenda = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);

        router.post(route('vendas.store'), {
            itens: carrinho,
            total: totalVenda,
            cliente_id: clienteId
        }, {
            onSuccess: () => {
                setCarrinho([]);
                setClienteId('');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="PDV Edézia" />

            <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-6">

                {/* Lado Esquerdo: Produtos */}
                <div className="flex-1 bg-white p-6 rounded-[32px] shadow-sm border border-gray-200">
                    <h2 className="text-xl font-black uppercase italic text-indigo-900 mb-6">Produtos</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {produtos.map(p => (
                            <button
                                key={p.id}
                                onClick={() => adicionarAoCarrinho(p)}
                                className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-500 transition text-left group flex flex-col items-center"
                            >
                                <div className="w-full h-32 bg-gray-200 rounded-xl mb-3 overflow-hidden border border-gray-100 flex items-center justify-center">
                                    {p.imagem ? (
                                        <img
                                            src={`/storage/${p.imagem}`}
                                            alt={p.nome}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                            onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=Sem+Foto'; }}
                                        />
                                    ) : (
                                        <div className="text-[10px] font-black uppercase text-gray-400 italic">Sem Foto</div>
                                    )}
                                </div>

                                <div className="w-full text-center">
                                    <p className="text-[10px] font-black uppercase text-gray-800 truncate">{p.nome}</p>
                                    <p className="text-indigo-600 font-bold text-sm">R$ {parseFloat(p.preco_venda).toFixed(2)}</p>
                                    <p className="text-[8px] text-gray-400 mt-1 font-bold uppercase italic">Estoque: {p.quantidade_estoque}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lado Direito: Carrinho */}
                <div className="w-full lg:w-96 bg-indigo-900 p-8 rounded-[40px] shadow-2xl text-white flex flex-col h-fit lg:sticky lg:top-6">
                    <h2 className="font-black uppercase mb-6 italic text-2xl">Carrinho</h2>

                    <div className="mb-6">
                        <label className="text-[10px] font-black uppercase text-indigo-300 block mb-2">Cliente</label>
                        <select
                            value={clienteId}
                            onChange={e => setClienteId(e.target.value)}
                            className="w-full rounded-xl bg-indigo-800 border-none text-white text-xs font-bold"
                        >
                            <option value="">Consumidor Final</option>
                            {clientes.map(c => (
                                <option key={c.id} value={c.id}>{c.nome_completo}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 space-y-3 mb-8 max-h-64 overflow-y-auto pr-2">
                        {carrinho.length === 0 ? (
                            <p className="text-indigo-300 text-[10px] font-bold uppercase italic text-center">Vazio</p>
                        ) : (
                            carrinho.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/5">
                                    <div className="text-[10px] font-bold">
                                        <p className="uppercase">{item.nome}</p>
                                        <p className="text-indigo-300">{item.qtd}x R$ {item.preco_venda}</p>
                                    </div>
                                    <button onClick={() => removerDoCarrinho(item.id)} className="text-red-400 px-2">✕</button>
                                    
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <div className="flex justify-between items-end mb-6">
                            <span className="text-[10px] font-black uppercase text-indigo-300">Total</span>
                            <span className="text-3xl font-black italic">
                                R$ {carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0).toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={confirmarVenda}
                            disabled={carrinho.length === 0}
                            className="w-full py-4 rounded-2xl font-black uppercase text-xs bg-white text-indigo-900 hover:bg-indigo-50 transition"
                        >
                            Finalizar Venda
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
