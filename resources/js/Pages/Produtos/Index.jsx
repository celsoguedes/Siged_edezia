import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, produtos, totalVendas, totalEstoque }) {
    // Configuração do formulário com os novos campos do banco[cite: 1]
    const { data, setData, post, processing, reset, errors } = useForm({
        nome: '',
        categoria: '',
        preco_venda: '', // Atualizado[cite: 1]
        quantidade_estoque: '', // Adicionado[cite: 1]
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('produtos.store'), {
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };

    // Estilos padronizados (Edézia Design System)[cite: 3]
    const labelStyle = "block text-[10px] font-black uppercase text-gray-400 mb-1.5 tracking-wider";
    const inputStyle = "w-full border-gray-200 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 text-sm";

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Produtos - Edézia Design" />

            <div className="bg-gray-100 min-h-screen p-4 md:p-10 font-sans text-gray-800">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* CARDS DE RESUMO GLASSMORPHISM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 bg-indigo-600 shadow-xl shadow-indigo-200" role="region" aria-labelledby="vendas-titulo">
                            <h2 id="vendas-titulo" className="text-white/80 text-[10px] font-black uppercase tracking-widest">Total em Vendas</h2>
                            <p className="text-white text-3xl font-black mt-1">R$ {totalVendas || '0,00'}</p>
                        </div>

                        <div className="glass-card p-6 bg-white shadow-sm border border-gray-200" role="region" aria-labelledby="estoque-titulo">
                            <h2 id="estoque-titulo" className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Itens em Estoque</h2>
                            <p className="text-gray-800 text-3xl font-black mt-1">
                                {totalEstoque || '0'} <span className="text-sm font-bold text-gray-400">un.</span>
                            </p>
                        </div>
                    </div>

                    {/* FORMULÁRIO DE CADASTRO RÁPIDO */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-indigo-600 transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tighter text-gray-700">Novo Produto / Peça</h2>
                        </div>

                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                            <div className="md:col-span-3">
                                <label className={labelStyle}>Nome da Peça</label>
                                <input type="text" value={data.nome} onChange={e => setData('nome', e.target.value)} className={inputStyle} />
                                {errors.nome && <div className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.nome}</div>}
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelStyle}>Categoria</label>
                                <input type="text" value={data.categoria} onChange={e => setData('categoria', e.target.value)} className={inputStyle} />
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelStyle}>Preço Venda (R$)</label>
                                <input type="number" step="0.01" value={data.preco_venda} onChange={e => setData('preco_venda', e.target.value)} className={inputStyle} />
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelStyle}>Estoque Inicial</label>
                                <input type="number" value={data.quantidade_estoque} onChange={e => setData('quantidade_estoque', e.target.value)} className={inputStyle} />
                            </div>

                            <div className="md:col-span-3">
                                <button type="submit" disabled={processing} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-black uppercase text-xs hover:bg-indigo-700 transition shadow-lg disabled:opacity-50">
                                    {processing ? 'Salvando...' : 'Cadastrar'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* LISTAGEM DE PRODUTOS */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-[0.1em]">
                                    <th className="p-5">Foto</th>
                                    <th className="p-5">Peça</th>
                                    <th className="p-5 text-center">Preço</th>
                                    <th className="p-5 text-center">Estoque</th>
                                    <th className="p-5 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {produtos.map(produto => (
                                    <tr key={produto.id} className="hover:bg-indigo-50/30 transition-colors">
                                        <td className="p-5">
                                            {produto.imagem ? (
                                                <img src={`/storage/${produto.imagem}`} className="w-12 h-12 object-cover rounded-lg" alt={produto.nome} />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[8px] text-gray-400">SEM FOTO</div>
                                            )}
                                        </td>
                                        <td className="p-5">
                                            <div className="font-black text-gray-800 uppercase text-sm">{produto.nome}</div>
                                            <div className="text-[10px] text-gray-400 uppercase font-bold">{produto.categoria}</div>
                                        </td>
                                        <td className="p-5 text-center font-mono font-bold text-gray-700">
                                            R$ {parseFloat(produto.preco_venda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${produto.quantidade_estoque < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                {produto.quantidade_estoque} un.
                                            </span>
                                        </td>
                                        <td className="p-5 text-right text-gray-300">
                                            <button className="hover:text-red-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
