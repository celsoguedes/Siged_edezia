import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ clientes, produtos, opcoes_tecidos, opcoes_tamanhos }) {
    const { data, setData, post, processing, errors } = useForm({
        cliente_id: '',
        produto_id: '',
        tipo_ajuste: 'Sob Medida', // Estado inicial
        tamanho_padrao: '',
        tecido: '',
        quantidade: 1,
        observacoes_item: '',
        // Medidas individuais consistentes com PedidoController e Banco de Dados[cite: 1, 3]
        medida_pescoco: '',
        medida_ombro_ombro: '',
        medida_punho: '',
        medida_torax: '',
        medida_cintura: '',
        medida_quadril: '',
        medida_coxa: '',
        medida_joelho: '',
        medida_comprimento_total: '',
    });

    const handleClienteChange = (e) => {
        const id = e.target.value;
        const cliente = clientes.find(c => c.id == id);

        if (cliente) {
            setData(prev => ({
                ...prev,
                cliente_id: id,
                medida_pescoco: cliente.medida_pescoco || '',
                medida_ombro_ombro: cliente.medida_ombro_ombro || '',
                medida_punho: cliente.medida_punho || '',
                medida_torax: cliente.medida_torax || '',
                medida_cintura: cliente.medida_cintura || '',
                medida_quadril: cliente.medida_quadril || '',
                medida_coxa: cliente.medida_coxa || '',
                medida_joelho: cliente.medida_joelho || '',
                medida_comprimento_total: cliente.medida_comprimento_total || '',
            }));
        } else {
            setData('cliente_id', id);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('pedidos.store'));
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8 font-sans">
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
                                onChange={handleClienteChange}
                                className="w-full border-gray-200 rounded-lg text-sm"
                            >
                                <option value="">Selecione o Cliente...</option>
                                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome_completo}</option>)}
                            </select>
                            {errors.cliente_id && <div className="text-red-500 text-xs mt-1">{errors.cliente_id}</div>}
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Peça / Produto</label>
                            <select
                                value={data.produto_id}
                                onChange={e => setData('produto_id', e.target.value)}
                                className="w-full border-gray-200 rounded-lg text-sm"
                            >
                                <option value="">Selecione o Produto...</option>
                                {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                            </select>
                            {errors.produto_id && <div className="text-red-500 text-xs mt-1">{errors.produto_id}</div>}
                        </div>
                    </div>

                    {/* SELEÇÃO DE TECIDO */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Escolha o Tecido</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {opcoes_tecidos.map(tecido => (
                                <button
                                    key={tecido}
                                    type="button"
                                    onClick={() => setData('tecido', tecido)}
                                    className={`p-3 rounded-xl text-center font-bold uppercase text-[10px] transition-all border-2 ${
                                        data.tecido === tecido
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-50 bg-white text-gray-400'
                                    }`}
                                >
                                    {tecido}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TIPO DE AJUSTE E TAMANHO PADRÃO */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Ajuste e Tamanho</label>

                        <div className="flex gap-4 mb-6">
                            <button
                                type="button"
                                onClick={() => setData('tipo_ajuste', 'Sob Medida')}
                                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                                    data.tipo_ajuste === 'Sob Medida'
                                    ? 'bg-gray-800 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                            >
                                Sob Medida
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('tipo_ajuste', 'Padrão')}
                                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                                    data.tipo_ajuste === 'Padrão'
                                    ? 'bg-gray-800 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                            >
                                Tamanho Padrão
                            </button>
                        </div>

                        {/* BLOCO CONDICIONAL PARA TAMANHO PADRÃO */}
                        {data.tipo_ajuste === 'Padrão' && (
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mt-4">
                                <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">Selecione o Tamanho (P ao XG)</label>
                                <select
                                    value={data.tamanho_padrao}
                                    onChange={e => setData('tamanho_padrao', e.target.value)}
                                    className="w-full border-gray-200 rounded-lg text-sm"
                                >
                                    <option value="">Selecione o Tamanho...</option>
                                    {opcoes_tamanhos && opcoes_tamanhos.map(tam => (
                                        <option key={tam} value={tam}>{tam}</option>
                                    ))}
                                </select>
                                {errors.tamanho_padrao && <div className="text-red-500 text-xs mt-1">{errors.tamanho_padrao}</div>}
                            </div>
                        )}

                        {data.tipo_ajuste === 'Sob Medida' && (
                            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-700 text-xs font-medium italic">
                                ✨ O sistema utilizará as medidas individuais do cliente selecionado.
                            </div>
                        )}
                    </div>

                    {/* QUANTIDADE E OBSERVAÇÕES */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Quantidade</label>
                            <input
                                type="number"
                                value={data.quantidade}
                                onChange={e => setData('quantidade', e.target.value)}
                                className="w-full border-gray-200 rounded-lg text-sm"
                                min="1"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Observações do Item</label>
                            <textarea
                                value={data.observacoes_item}
                                onChange={e => setData('observacoes_item', e.target.value)}
                                className="w-full border-gray-200 rounded-lg text-sm"
                                rows="2"
                                placeholder="Algum detalhe específico para esta peça?"
                            />
                        </div>
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
