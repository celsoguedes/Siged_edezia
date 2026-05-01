import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ produtos }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        nome: '',
        categoria: '',
        preco_base: '',
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // O Inertia lida automaticamente com o envio de arquivos (Multipart/Form-Data)
        post(route('produtos.store'), {
            onSuccess: () => reset(),
            forceFormData: true, // Garante o envio correto do arquivo
        });
    };

    // Estilos padronizados (Edézia Design System)
    const labelStyle = "block text-[10px] font-black uppercase text-gray-400 mb-1.5 tracking-wider";
    const inputStyle = "w-full border-gray-200 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 text-sm";

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-10 font-sans text-gray-800">
            <Head title="Produtos - Edézia Design" />

            <div className="max-w-6xl mx-auto space-y-8">

                {/* FORMULÁRIO DE CADASTRO RÁPIDO */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-indigo-600 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tighter text-gray-700">Novo Produto / Peça</h2>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                        {/* Nome do Produto */}
                        <div className="md:col-span-4">
                            <label className={labelStyle}>Nome da Peça</label>
                            <input type="text" value={data.nome} onChange={e => setData('nome', e.target.value)} className={inputStyle} placeholder="Ex: Gandola Masculina UDV" />
                            {errors.nome && <div className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.nome}</div>}
                        </div>

                        {/* Categoria */}
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Categoria</label>
                            <input type="text" value={data.categoria} onChange={e => setData('categoria', e.target.value)} className={inputStyle} placeholder="Fardamento" />
                        </div>

                        {/* Preço Base */}
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Preço Base (R$)</label>
                            <input type="number" step="0.01" value={data.preco_base} onChange={e => setData('preco_base', e.target.value)} className={inputStyle} placeholder="0,00" />
                            {errors.preco_base && <div className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.preco_base}</div>}
                        </div>

                        {/* Upload de Imagem */}
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Foto da Peça</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={e => setData('imagem', e.target.files[0])}
                                    accept="image/*"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition text-xs font-bold text-gray-500">
                                    {data.imagem ? "Arquivo Sel." : "Escolher Foto"}
                                </label>
                            </div>
                        </div>

                        {/* Botão Salvar */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-black uppercase text-xs hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                            >
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
                                <th className="p-5 w-24">Foto</th>
                                <th className="p-5">Nome da Peça</th>
                                <th className="p-5">Categoria</th>
                                <th className="p-5 text-center">Preço Base</th>
                                <th className="p-5 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {produtos.length > 0 ? (
                                produtos.map(produto => (
                                    <tr key={produto.id} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="p-5">
                                            {produto.imagem ? (
                                                <img
                                                    src={`/storage/${produto.imagem}`}
                                                    className="w-14 h-14 object-cover rounded-xl shadow-sm border border-white"
                                                    alt={produto.nome}
                                                />
                                            ) : (
                                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-[8px] font-bold text-gray-300 border-2 border-dashed border-gray-200">
                                                    SEM FOTO
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-5">
                                            <div className="font-black text-gray-800 uppercase text-sm tracking-tighter">{produto.nome}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">ID: {produto.id.toString().padStart(3, '0')}</div>
                                        </td>
                                        <td className="p-5">
                                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                {produto.categoria || 'NÃO DEFINIDA'}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className="font-mono font-bold text-gray-700">
                                                R$ {parseFloat(produto.preco_base).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button className="text-gray-300 hover:text-red-500 transition-colors p-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">
                                        Nenhum produto cadastrado na base da Edézia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
