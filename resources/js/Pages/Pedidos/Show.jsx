import React from 'react';
import { Head, Link } from '@inertiajs/react';

const MedidaDisplay = ({ label, valor }) => (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <span className="block text-[9px] font-black uppercase text-gray-400 mb-1">{label}</span>
        <p className="text-sm font-black text-gray-700">{valor ? `${valor} cm` : 'N/A'}</p>
    </div>
);

export default function Show({ pedido }) {
    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Head title="Detalhes do Pedido" />
            <div className="max-w-5xl mx-auto">
                <Link href={route('pedidos.index')} className="text-indigo-600 font-bold text-xs mb-4 block uppercase tracking-widest">← Voltar</Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b flex justify-between items-center">
                        <h1 className="text-2xl font-black">{pedido.cliente.nome_completo}</h1>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-black text-[10px] uppercase">#{pedido.id}</span>
                    </div>

                    <div className="p-8">
                        {pedido.itens.map(item => (
                            <div key={item.id} className="border border-gray-50 rounded-2xl p-6 mb-6 bg-gray-50/30">
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div><span className="text-[10px] font-bold text-gray-300">PRODUTO</span><p className="font-bold">{item.produto.nome}</p></div>
                                    <div><span className="text-[10px] font-bold text-gray-300">TECIDO</span><p className="font-bold text-indigo-600">{item.tecido}</p></div>
                                    <div><span className="text-[10px] font-bold text-gray-300">AJUSTE</span><p className="font-bold">{item.tipo_ajuste}</p></div>
                                    <div><span className="text-[10px] font-bold text-gray-300">TAMANHO</span><p className="font-bold">{item.tamanho_padrao || 'Sob Medida'}</p></div>
                                </div>

                                {item.tipo_ajuste === 'Sob Medida' && (
                                    <div className="grid grid-cols-5 gap-3">
                                        <MedidaDisplay label="Pescoço" valor={item.medida_pescoco} />
                                        <MedidaDisplay label="Ombro" valor={item.medida_ombro_ombro} />
                                        <MedidaDisplay label="Punho" valor={item.medida_punho} />
                                        <MedidaDisplay label="Tórax" valor={item.medida_torax} />
                                        <MedidaDisplay label="Cintura" valor={item.medida_cintura} />
                                        <MedidaDisplay label="Quadril" valor={item.medida_quadril} />
                                        <MedidaDisplay label="Coxa" valor={item.medida_coxa} />
                                        <MedidaDisplay label="Joelho" valor={item.medida_joelho} />
                                        <MedidaDisplay label="Altura" valor={item.medida_comprimento_total} />
                                    </div>
                                )}

                                {/* Exibição das Observações[cite: 5] */}
                                {item.observacoes_item && (
                                    <div className="mt-6 p-4 bg-white rounded-xl border border-dashed border-gray-200">
                                        <span className="block text-[9px] font-black uppercase text-gray-400 mb-1">Observações do Item</span>
                                        <p className="text-xs text-gray-600 italic">"{item.observacoes_item}"</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
