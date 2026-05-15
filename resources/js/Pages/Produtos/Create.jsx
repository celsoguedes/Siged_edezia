import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    // Inicialização do formulário com o hook useForm do Inertia
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        categoria: '',
        preco_venda: '',
        quantidade_estoque: '',
        imagem: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // O Inertia lida automaticamente com o envio de arquivos (multipart/form-data)
        post(route('produtos.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastrar Novo Produto</h2>}
        >
            <Head title="Novo Produto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Nome do Produto */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Nome da Peça</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={data.nome}
                                    onChange={e => setData('nome', e.target.value)}
                                    required
                                />
                                {errors.nome && <div className="text-red-500 text-xs mt-1">{errors.nome}</div>}
                            </div>

                            {/* Categoria */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Categoria (ex: Vestido, Calça)</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={data.categoria}
                                    onChange={e => setData('categoria', e.target.value)}
                                    required
                                />
                                {errors.categoria && <div className="text-red-500 text-xs mt-1">{errors.categoria}</div>}
                            </div>

                            {/* Preço e Estoque */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Preço de Venda (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.preco_venda}
                                        onChange={e => setData('preco_venda', e.target.value)}
                                        required
                                    />
                                    {errors.preco_venda && <div className="text-red-500 text-xs mt-1">{errors.preco_venda}</div>}
                                </div>

                                <div>
                                    <label className="block font-medium text-sm text-gray-700">Quantidade em Estoque</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.quantidade_estoque}
                                        onChange={e => setData('quantidade_estoque', e.target.value)}
                                        required
                                    />
                                    {errors.quantidade_estoque && <div className="text-red-500 text-xs mt-1">{errors.quantidade_estoque}</div>}
                                </div>
                            </div>

                            {/* Upload de Imagem */}
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Foto do Produto</label>
                                <input
                                    type="file"
                                    className="mt-1 block w-full text-sm text-gray-500
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-md file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-blue-50 file:text-blue-700
                                               hover:file:bg-blue-100"
                                    onChange={e => setData('imagem', e.target.files[0])}
                                />
                                <p className="text-xs text-gray-500 mt-1">Formatos aceitos: JPG, PNG. Máximo 2MB.</p>
                                {errors.imagem && <div className="text-red-500 text-xs mt-1">{errors.imagem}</div>}
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex items-center justify-end mt-4 border-t pt-4">
                                <Link
                                    href={route('produtos.index')}
                                    className="mr-4 text-sm text-gray-600 hover:underline"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Salvando...' : 'Cadastrar Produto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
