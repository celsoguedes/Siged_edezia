import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ clientes, produtos, opcoes_tecidos, opcoes_tamanhos }) {
    const { data, setData, post, processing, errors } = useForm({
        cliente_id: '',
        produto_id: '',
        tipo_ajuste: 'Sob Medida',
        tamanho_padrao: '',
        tecido: '',
        quantidade: 1,
        observacoes_item: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pedidos.store'));
    };

    // Estilos para os botões de seleção (Cards)
    const cardBase = "flex-1 p-4 border-2 rounded-xl text-center transition-all cursor-pointer font-bold uppercase text-xs";
    const cardActive = "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md";
    const cardInactive = "border-gray-100 bg-white text-gray-400 hover:border-gray-200";

    return (
        <div className="bg-gray-50 min-h-screen p-6 md:p-12 font-sans">
            <Head title="Novo Pedido - Edézia Design" />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-tighter">Gerar Novo Pedido</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* SELEÇÃO DE CLIENTE E PRODUTO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Cliente</label>
                            <select
                                value={data.cliente_id}
                                onChange={e => setData('cliente_id', e.target.value)}
                                className="w-full border-gray-200 rounded-lg text-sm"
                            >
                                <option value="">Selecione o Cliente...</option>
                                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome_completo}</option>)}
                            </select>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Peça / Produto</label>
                            <select
                                value={data.produto_id}
                                onChange={e => setData('produto_id', e.target.value)}
                                className="w-full border-gray-200 rounded-lg text-sm"
                            >
                                <option value="">Selecione o Produto...</option>
                                {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco_base}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* SELEÇÃO DE TECIDO (LISTA COM CLIQUE) */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-4 tracking-[0.1em]">Escolha o Tecido</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {opcoes_tecidos.map(tecido => (
                                <div
                                    key={tecido}
                                    onClick={() => setData('tecido', tecido)}
                                    className={`${cardBase} ${data.tecido === tecido ? cardActive : cardInactive}`}
                                >
                                    {tecido}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TIPO DE AJUSTE E TAMANHO */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-4 tracking-[0.1em]">Ajuste e Tamanho</label>

                        <div className="flex gap-4 mb-6">
                            <button
                                type="button"
                                onClick={() => setData('tipo_ajuste', 'Sob Medida')}
                                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${data.tipo_ajuste === 'Sob Medida' ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
                            >
                                Sob Medida
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('tipo_ajuste', 'Padrão')}
                                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${data.tipo_ajuste === 'Padrão' ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
                            >
                                Tamanho Padrão
                            </button>
                        </div>

                        {data.tipo_ajuste === 'Padrão' && (
                            <div className="flex justify-between gap-2 animate-in fade-in duration-300">
                                {opcoes_tamanhos.map(tam => (
                                    <div
                                        key={tam}
                                        onClick={() => setData('tamanho_padrao', tam)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-black cursor-pointer transition-all ${data.tamanho_padrao === tam ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-100 text-gray-300 hover:border-gray-200'}`}
                                    >
                                        {tam}
                                    </div>
                                ))}
                            </div>
                        )}

                        {data.tipo_ajuste === 'Sob Medida' && (
                            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-700 text-xs font-medium italic">
                                ✨ O sistema utilizará as medidas cadastradas no perfil do cliente selecionado.
                            </div>
                        )}
                    </div>

                    {/* OBSERVAÇÕES E BOTÃO FINAL */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Observações do Item</label>
                        <textarea
                            rows="3"
                            value={data.observacoes_item}
                            onChange={e => setData('observacoes_item', e.target.value)}
                            className="w-full border-gray-200 rounded-lg text-sm"
                            placeholder="Ex: Bordar nome no peito esquerdo..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-xl shadow-indigo-100"
                    >
                        {processing ? 'Processando...' : 'Finalizar e Gerar Pedido'}
                    </button>
                </form>
            </div>
        </div>
    );
}
