import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, produtos, totalVendas, totalEstoque }) {
    // 1. Estados e Hooks (Sempre no topo)
    const [carrinho, setCarrinho] = useState([]);
    const { data, setData, post, reset } = useForm({
        nome: '',
        preco_venda: '',
        quantidade_estoque: '',
    });

    // 2. Funções de Lógica
    const adicionarAoCarrinho = (produto) => {
        const itemExiste = carrinho.find(item => item.id === produto.id);
        if (itemExiste) {
            setCarrinho(carrinho.map(item =>
                item.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
            ));
        } else {
            setCarrinho([...carrinho, { ...produto, qtd: 1 }]);
        }
    };

    const removerDoCarrinho = (id) => {
        setCarrinho(carrinho.filter(item => item.id !== id));
    };

    const confirmarVenda = () => {
    if (carrinho.length === 0) return;

    const totalVenda = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);

    // USAR router.post em vez de post do useForm
    router.post(route('vendas.store'), {
        itens: carrinho,
        total: totalVenda
    }, {
        onBefore: () => confirm('Deseja confirmar a venda e atualizar o estoque?'),
        onSuccess: () => {
            setCarrinho([]);
            alert('Venda realizada com sucesso!');
        },
        onError: (errors) => {
            console.error(errors);
            alert('Erro ao processar venda.');
        }
    });
};

    const labelStyle = "block text-[10px] font-black uppercase text-gray-400 mb-1.5 tracking-wider";
    const inputStyle = "w-full border-gray-200 rounded-lg shadow-sm focus:border-indigo-500 py-2.5 text-sm";

    // 3. Interface (JSX) - Apenas um único return principal
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Produtos - Edézia Design" />

            <div className="bg-gray-100 min-h-screen p-10 font-sans text-gray-800">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* CARDS DE RESUMO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 bg-indigo-600 shadow-xl">
                            <h2 className="text-white/80 text-[10px] font-black uppercase tracking-widest">Total em Vendas</h2>
                            <p className="text-white text-3xl font-black mt-1">R$ {totalVendas || '0,00'}</p>
                        </div>
                        <div className="glass-card p-6 bg-white shadow-sm border border-gray-200">
                            <h2 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Itens em Estoque</h2>
                            <p className="text-gray-800 text-3xl font-black mt-1">{totalEstoque || '0'} <span className="text-sm font-bold text-gray-400">un.</span></p>
                        </div>
                    </div>

                    {/* CARRINHO DE VENDAS */}
                    {carrinho.length > 0 && (
                        <div className="glass-card p-6 bg-white border-2 border-indigo-500 rounded-2xl">
                            <h2 className="text-indigo-600 text-xs font-black uppercase mb-4 flex items-center gap-2">
                                🛒 Carrinho de Venda Ativo
                            </h2>
                            <div className="space-y-3">
                                {carrinho.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border">
                                        <div>
                                            <span className="font-black text-xs uppercase text-gray-700">{item.nome}</span>
                                            <span className="ml-2 text-[10px] font-bold text-indigo-500 text-xs">x{item.qtd}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono text-xs font-bold text-gray-600">R$ {(item.preco_venda * item.qtd).toFixed(2)}</span>
                                            <button onClick={() => removerDoCarrinho(item.id)} className="text-red-400 hover:text-red-600">✕</button>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 mt-2 border-t border-indigo-100 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Total da Venda</span>
                                    <span className="text-xl font-black text-indigo-600 font-mono">
                                        R$ {carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <button
                                    onClick={confirmarVenda}
                                    className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition shadow-lg"
                                >
                                    Confirmar Venda e Baixar Estoque
                                </button>
                            </div>
                        </div>
                    )}

                    {/* LISTA DE PRODUTOS */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <tr>
                                    <th className="p-5">Peça</th>
                                    <th className="p-5 text-center">Preço</th>
                                    <th className="p-5 text-center">Estoque</th>
                                    <th className="p-5 text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {produtos.map(produto => (
                                    <tr key={produto.id} className="hover:bg-indigo-50/30 transition-colors">
                                        <td className="p-5 font-black text-gray-800 uppercase text-sm">{produto.nome}</td>
                                        <td className="p-5 text-center font-mono font-bold text-gray-700">R$ {parseFloat(produto.preco_venda).toFixed(2)}</td>
                                        <td className="p-5 text-center">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-100 text-green-600">
                                                {produto.quantidade_estoque} un.
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button
                                                onClick={() => adicionarAoCarrinho(produto)}
                                                className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition shadow-sm"
                                            >
                                                + Vender
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
