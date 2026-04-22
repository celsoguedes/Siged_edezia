import { Head, Link } from '@inertiajs/react';

export default function Index({ clientes }) {
    // Esse console ajudará a ver se os dados chegaram no navegador (aperte F12)
    console.log("Clientes recebidos:", clientes);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <Head title="Clientes - Edézia Design" />

            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Edézia Design</h1>
                        <p className="text-gray-600 text-sm">Gestão de Clientes e Medidas</p>
                    </div>
                    <Link
                        href={route('clientes.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 transition ease-in-out duration-150 shadow-md"
                    >
                        Novo Cliente
                    </Link>
                </div>

                {/* Tabela de Clientes */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nome do Cliente</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Telefone</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Núcleo (UDV)</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clientes && clientes.length > 0 ? (
                                    clientes.map((cliente) => (
                                        <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{cliente.nome_completo}</div>
                                                <div className="text-xs text-gray-500">{cliente.cpf}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {cliente.telefone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {cliente.nucleo || <span className="text-gray-400 italic">Não informado</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-indigo-600 hover:text-indigo-900 font-bold">
                                                    Medidas
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                            <p className="text-lg">Nenhum cliente cadastrado.</p>
                                            <p className="text-sm">Clique em 'Novo Cliente' para começar ou use o Tinker.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
