import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, produtos, clientes }) {
    const [carrinho, setCarrinho] = useState([]);
    const [clienteId, setClienteId] = useState('');
    // Estado para controlar a imagem ampliada (Lupa)
    const [imagemZoom, setImagemZoom] = useState(null);

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
        router.post(route('vendas.store'), {
            itens: carrinho,
            total: carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0),
            cliente_id: clienteId
        }, {
            onSuccess: () => { setCarrinho([]); setClienteId(''); }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="PDV Edézia" />

            <div className="flex h-[calc(100vh-64px)] bg-gray-100 p-4 gap-4">
                {/* Esquerda: Produtos */}
                <div className="flex-1 bg-white p-6 rounded-[32px] shadow-sm border border-gray-200 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black uppercase italic text-indigo-900">Produtos</h2>
                        <Link href={route('produtos.create')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase italic hover:bg-indigo-700 transition">
                            + Novo Produto
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {produtos.map(p => (
                            <div key={p.id} className="relative group bg-gray-50 rounded-[24px] border border-transparent hover:border-indigo-500 transition p-4">

                                <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* BOTÃO LUPA (Zoom) */}
                                    <button
                                        onClick={() => setImagemZoom(p.imagem ? `/storage/${p.imagem}` : null)}
                                        className="bg-white/90 p-2 rounded-full shadow-sm text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                                        title="Ver em tamanho maior"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </button>

                                    {/* BOTÃO EDITAR */}
                                    <Link
                                        href={route('produtos.edit', p.id)}
                                        className="bg-white/90 p-2 rounded-full shadow-sm text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </Link>
                                </div>

                                <button onClick={() => adicionarAoCarrinho(p)} className="w-full flex flex-col items-center">
                                    <div className="w-full h-32 bg-gray-200 rounded-xl mb-3 overflow-hidden border border-gray-100 flex items-center justify-center">
                                        {p.imagem ? (
                                            <img
                                                src={`/storage/${p.imagem}`}
                                                alt={p.nome}
                                                /* MUDANÇA: Usamos object-contain para a imagem caber inteira sem cortes */
                                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition duration-300"
                                            />
                                        ) : (
                                            <span className="text-[10px] font-black uppercase text-gray-400 italic">Sem Foto</span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase text-gray-800 truncate w-full">{p.nome}</p>
                                        <p className="text-indigo-600 font-bold text-sm">R$ {parseFloat(p.preco_venda).toFixed(2)}</p>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Direita: Carrinho */}
                <div className="w-96 bg-indigo-900 rounded-[32px] p-6 text-white flex flex-col shadow-xl">
                    <h2 className="text-xl font-black uppercase italic mb-6">Carrinho</h2>
                    <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} className="w-full bg-indigo-800 border-none rounded-xl text-xs font-bold mb-4">
                        <option value="">Consumidor Final</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.nome_completo}</option>)}
                    </select>

                    <div className="flex-1 overflow-y-auto space-y-3">
                        {carrinho.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-indigo-800/50 p-3 rounded-2xl">
                                <div className="text-[10px] font-bold">
                                    <p className="uppercase">{item.nome}</p>
                                    <p className="text-indigo-300">{item.qtd}x R$ {item.preco_venda}</p>
                                </div>
                                <button onClick={() => removerDoCarrinho(item.id)} className="text-red-400 px-2">✕</button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-6 mt-4">
                        <div className="flex justify-between items-end mb-6">
                            <span className="text-[10px] font-black uppercase text-indigo-300">Total</span>
                            <span className="text-3xl font-black italic">R$ {carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0).toFixed(2)}</span>
                        </div>
                        <button onClick={confirmarVenda} disabled={carrinho.length === 0} className="w-full py-4 rounded-2xl font-black uppercase text-xs bg-white text-indigo-900 hover:bg-indigo-50 transition">
                            Finalizar Venda
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL DA LUPA (Visualização Ampliada) */}
            {imagemZoom && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setImagemZoom(null)}>
                    <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden p-2 shadow-2xl">
                        <button
                            className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition"
                            onClick={() => setImagemZoom(null)}
                        >
                            ✕
                        </button>
                        <img
                            src={imagemZoom}
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                            alt="Visualização ampliada"
                        />
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
