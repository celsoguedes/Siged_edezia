import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';

const MedidaDisplay = ({ label, valor }) => (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <span className="block text-[9px] font-black uppercase text-gray-400 mb-1">{label}</span>
        <p className="text-sm font-black text-gray-700">{valor ? `${valor} cm` : 'N/A'}</p>
    </div>
);

// Mapeamento de estilos para os badges de status
const STATUS_STYLES = {
    'Pendente': 'bg-amber-50 text-amber-600 ring-amber-200',
    'Em Produção': 'bg-blue-50 text-blue-600 ring-blue-200',
    'Finalizado': 'bg-emerald-50 text-emerald-600 ring-emerald-200',
    'Cancelado': 'bg-rose-50 text-rose-600 ring-rose-200',
};

export default function Show({ pedido }) {
    const { data, setData, processing } = useForm({
        status: pedido.status,
    });

    const handleStatusChange = (e) => {
        const novoStatus = e.target.value;

        // Atualiza o estado local para refletir na UI imediatamente
        setData('status', novoStatus);

        // Envia para o servidor usando o router global para evitar atraso de estado
        router.patch(route('pedidos.updateStatus', pedido.id),
            { status: novoStatus },
            {
                preserveScroll: true,
                onSuccess: () => console.log("Status atualizado com sucesso no banco!")
            }
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Head title={`Pedido #${pedido.id}`} />

            <div className="max-w-5xl mx-auto">
                <Link href={route('pedidos.index')} className="text-indigo-600 font-bold text-xs mb-6 block uppercase tracking-widest">
                    ← Voltar para a Lista
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b flex justify-between items-center bg-white">
                        <div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Cliente</span>
                            <h1 className="text-3xl font-black text-gray-800 tracking-tighter">{pedido.cliente.nome_completo}</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <label className="text-[9px] font-black uppercase text-gray-400 mb-1 mr-1">Alterar Status</label>
                                <select
                                    value={data.status}
                                    onChange={handleStatusChange}
                                    disabled={processing || pedido.status === 'Cancelado'}
                                    className={`text-xs font-black uppercase tracking-wider rounded-xl border-none ring-1 ring-inset py-2 px-4 shadow-sm transition-all duration-200 ${STATUS_STYLES[data.status] || 'bg-gray-100 text-gray-500 ring-gray-200'}`}
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em Produção">Em Produção</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>

                            <span className="px-4 py-2 bg-gray-50 text-gray-400 rounded-xl font-black text-xs border border-gray-100">
                                #{pedido.id}
                            </span>
                        </div>
                    </div>

                    <div className="p-8">
                        {pedido.itens.map(item => (
                            <div key={item.id} className="border border-gray-50 rounded-3xl p-8 mb-8 bg-gray-50/30">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                                    <div><span className="text-[10px] font-black text-gray-300 uppercase">Produto</span><p className="font-bold text-gray-800">{item.produto.nome}</p></div>
                                    <div><span className="text-[10px] font-black text-gray-300 uppercase">Tecido</span><p className="font-bold text-indigo-600">{item.tecido}</p></div>
                                    <div><span className="text-[10px] font-black text-gray-300 uppercase">Ajuste</span><p className="font-bold text-gray-800">{item.tipo_ajuste}</p></div>
                                    <div><span className="text-[10px] font-black text-gray-300 uppercase">Tamanho</span><p className="font-bold text-gray-800">{item.tamanho_padrao || 'Sob Medida'}</p></div>
                                </div>

                                {item.tipo_ajuste === 'Sob Medida' && (
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
