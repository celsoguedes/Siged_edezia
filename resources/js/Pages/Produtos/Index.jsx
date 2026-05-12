import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
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

    const confirmarVenda = () => {
        if (carrinho.length === 0) return;

        const totalVenda = carrinho.reduce((acc, item) => acc + (item.preco_venda * item.qtd), 0);

        // Corrigido: Enviando o objeto explicitamente
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
            {/* ... Restante do seu código do PDV ... */}
            <div className="p-6 flex gap-6">
                {/* Listagem de produtos e carrinho aqui */}
            </div>
        </AuthenticatedLayout>
    );
}
