import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, produto }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        nome: produto.nome || '',
        categoria: produto.categoria || '',
        preco_venda: produto.preco_venda || '',
        quantidade_estoque: produto.quantidade_estoque || '',
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('produtos.update', produto.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Produto</h2>}>
            <Head title="Editar Produto" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Nome da Peça</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.nome} onChange={e => setData('nome', e.target.value)} required />
                                {errors.nome && <div className="text-red-500 text-xs mt-1">{errors.nome}</div>}
                            </div>
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Categoria</label>
                                <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.categoria} onChange={e => setData('categoria', e.target.value)} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Preço (R$)</label>
                                    <input type="number" step="0.01" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.preco_venda} onChange={e => setData('preco_venda', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Estoque</label>
                                    <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value={data.quantidade_estoque} onChange={e => setData('quantidade_estoque', e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Trocar Foto (Opcional)</label>
                                {produto.imagem && <img src={`/storage/${produto.imagem}`} alt="Atual" className="h-20 w-20 object-cover rounded mb-2" />}
                                <input type="file" className="mt-1 block w-full text-sm text-gray-500" onChange={e => setData('imagem', e.target.files[0])} />
                            </div>
                            <div className="flex items-center justify-end mt-4 border-t pt-4">
                                <Link href={route('produtos.index')} className="mr-4 text-sm text-gray-600 hover:underline">Cancelar</Link>
                                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50" disabled={processing}>
                                    {processing ? 'Salvando...' : 'Atualizar Produto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
