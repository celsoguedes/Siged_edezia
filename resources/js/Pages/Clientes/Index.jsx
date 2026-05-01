import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ clientes }) {
    // Estados para controlar o Modal de Visualização
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const abrirMedidas = (cliente) => {
        setClienteSelecionado(cliente);
        setModalAberto(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans">
            <Head title="Clientes - Edézia Design" />
            
            <div className="max-w-6xl mx-auto space-y-6">
                {/* CABEÇALHO DA LISTA */}
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Clientes</h1>
                        <p className="text-gray-500 text-xs font-bold uppercase">Gestão de Medidas e Cadastros</p>
                    </div>
                    <Link 
                        href={route('clientes.create')} 
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold uppercase text-sm hover:bg-indigo-700 transition shadow-md"
                    >
                        Novo Cadastro
                    </Link>
                </div>

                {/* TABELA DE CLIENTES */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-600 font-black">
                                <th className="p-4">Nome do Cliente</th>
                                <th className="p-4">Núcleo / Cidade</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {clientes.map(cliente => (
                                <tr key={cliente.id} className="hover:bg-indigo-50/30 transition">
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800">{cliente.nome_completo}</div>
                                        <div className="text-xs text-gray-400">{cliente.cpf}</div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 font-medium">
                                        {cliente.nucleo || 'Não informado'}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            {/* BOTÃO VISUALIZAR MEDIDAS */}
                                            <button 
                                                onClick={() => abrirMedidas(cliente)}
                                                className="bg-emerald-500 text-white px-4 py-2 rounded-md text-xs font-black uppercase hover:bg-emerald-600 shadow-sm"
                                            >
                                                Medidas
                                            </button>

                                            {/* BOTÃO EDITAR (Ativado agora) */}
                                            <Link 
                                                href={route('clientes.edit', cliente.id)}
                                                className="bg-amber-500 text-white px-4 py-2 rounded-md text-xs font-black uppercase hover:bg-amber-600 shadow-sm"
                                            >
                                                Editar
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {clientes.length === 0 && (
                        <div className="p-12 text-center text-gray-400 uppercase font-bold text-sm">
                            Nenhum cliente cadastrado no sistema.
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL DE VISUALIZAÇÃO DE MEDIDAS */}
            {modalAberto && clienteSelecionado && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Header do Modal */}
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 uppercase italic">Ficha de Medidas</h2>
                                <p className="text-indigo-600 font-bold uppercase text-xs">
                                    Cliente: {clienteSelecionado.nome_completo}
                                </p>
                            </div>
                            <button 
                                onClick={() => setModalAberto(false)} 
                                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-full font-black hover:bg-red-500 hover:text-white transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Conteúdo das Medidas */}
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Perfil Físico */}
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-black text-gray-400 uppercase text-[10px] mb-4 tracking-widest">01. Perfil Físico</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm">Altura: <span className="font-bold text-gray-700">{clienteSelecionado.altura} m</span></p>
                                        <p className="text-sm">Peso: <span className="font-bold text-gray-700">{clienteSelecionado.peso} kg</span></p>
                                        <p className="text-sm">Grau: <span className="font-bold text-gray-700">{clienteSelecionado.grau_hierarquico}</span></p>
                                    </div>
                                </div>

                                {/* Superior */}
                                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                                    <h3 className="font-black text-blue-400 uppercase text-[10px] mb-4 tracking-widest">02. Tronco / Superior</h3>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        <p>Pescoço: <span className="font-bold">{clienteSelecionado.medida_pescoco}</span></p>
                                        <p>Tórax: <span className="font-bold">{clienteSelecionado.medida_torax}</span></p>
                                        <p>Cintura: <span className="font-bold">{clienteSelecionado.medida_cintura}</span></p>
                                        <p>Ombro: <span className="font-bold">{clienteSelecionado.medida_ombro_ombro}</span></p>
                                    </div>
                                </div>

                                {/* Inferior */}
                                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                                    <h3 className="font-black text-emerald-400 uppercase text-[10px] mb-4 tracking-widest">03. Pernas / Inferior</h3>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        <p>Quadril: <span className="font-bold">{clienteSelecionado.medida_quadril}</span></p>
                                        <p>Total: <span className="font-bold">{clienteSelecionado.medida_comprimento_total}</span></p>
                                        <p>Gancho: <span className="font-bold">{clienteSelecionado.medida_altura_gancho}</span></p>
                                        <p>Coxa: <span className="font-bold">{clienteSelecionado.medida_coxa}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Específicos Femininos */}
                            {clienteSelecionado.sexo === 'F' && (
                                <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 shadow-inner">
                                    <h3 className="font-black text-pink-400 uppercase text-[10px] mb-4 tracking-widest text-center">04. Detalhes Femininos</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                                        <div><p className="text-gray-500">Altura Busto</p><p className="font-bold text-pink-700">{clienteSelecionado.medida_altura_busto}</p></div>
                                        <div><p className="text-gray-500">Dist. Bustos</p><p className="font-bold text-pink-700">{clienteSelecionado.medida_distancia_bustos}</p></div>
                                        <div><p className="text-gray-500">Comp. Frente</p><p className="font-bold text-pink-700">{clienteSelecionado.medida_comprimento_frente}</p></div>
                                        <div><p className="text-gray-500">Comp. Saia</p><p className="font-bold text-pink-700">{clienteSelecionado.medida_comprimento_saia}</p></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer do Modal */}
                        <div className="p-6 border-t bg-gray-50 flex justify-end">
                            <button 
                                onClick={() => setModalAberto(false)}
                                className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs hover:bg-black transition shadow-lg"
                            >
                                Fechar Janela
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}