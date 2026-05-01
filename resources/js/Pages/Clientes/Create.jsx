import { useForm, Head, Link } from '@inertiajs/react';

export default function Create() {
    // 1. Estado inicial com todos os campos mapeados para a Migration[cite: 1, 3]
    const { data, setData, post, processing, errors } = useForm({
        nome_completo: '',
        cpf: '',
        telefone: '',
        endereco_completo: '',
        sexo: 'F',
        nucleo: '',
        grau_hierarquico: '',
        altura: '',
        peso: '',
        // Medidas Superiores[cite: 1]
        medida_pescoco: '',
        medida_ombro_ombro: '',
        medida_torax: '',
        medida_cintura: '',
        medida_largura_costas: '',
        medida_cava: '',
        medida_comprimento_superior: '',
        medida_comprimento_manga: '',
        medida_biceps: '',
        medida_punho: '',
        // Medidas Inferiores[cite: 1]
        medida_quadril: '',
        medida_altura_quadril: '',
        medida_comprimento_total: '',
        medida_entrepernas: '',
        medida_altura_gancho: '',
        medida_coxa: '',
        medida_joelho: '',
        medida_barra: '',
        // Específicos e Extras[cite: 1]
        medida_altura_busto: '',
        medida_distancia_bustos: '',
        medida_comprimento_frente: '',
        medida_comprimento_costas: '',
        medida_circunferencia_barra: '',
        medida_comprimento_saia: '',
        medida_comprimento_vestido: ''
    });

    // Função utilitária para inputs numéricos de medidas
    const renderMedidaInput = (label, field) => (
        <div key={field}>
            <label className="block text-xs font-bold text-gray-600 uppercase">{label}</label>
            <input
                type="number" step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                value={data[field]}
                onChange={e => setData(field, e.target.value)}
                placeholder="0.00"
            />
            {errors[field] && <span className="text-red-500 text-xs">{errors[field]}</span>}
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('clientes.store'));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans">
            <Head title="Novo Cadastro - Edézia Design" />

            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
                {/* CABEÇALHO */}
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
                    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Novo Cadastro</h1>
                    <Link href={route('clientes.index')} className="text-sm font-bold text-gray-500 hover:text-indigo-600 uppercase">Voltar para Lista</Link>
                </div>

                {/* EXIBIÇÃO DE ERROS DE VALIDAÇÃO[cite: 3] */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <p className="text-red-700 font-bold">Por favor, corrija os seguintes erros:</p>
                        <ul className="list-disc ml-5 text-sm text-red-600">
                            {Object.keys(errors).map((key) => <li key={key}>{errors[key]}</li>)}
                        </ul>
                    </div>
                )}

                {/* 01. IDENTIFICAÇÃO (Campos Adicionados para evitar NULL[cite: 1]) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-indigo-600 mb-6 uppercase tracking-wider">01. Identificação do Cliente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700">Nome Completo</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.nome_completo} onChange={e => setData('nome_completo', e.target.value)} />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700">CPF</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.cpf} onChange={e => setData('cpf', e.target.value)} />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700">Telefone</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.telefone} onChange={e => setData('telefone', e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Sexo</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.sexo} onChange={e => setData('sexo', e.target.value)}>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Grau Hierárquico</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.grau_hierarquico} onChange={e => setData('grau_hierarquico', e.target.value)} placeholder="Ex: Mestre" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Núcleo (UDV)</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.nucleo} onChange={e => setData('nucleo', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Altura (m)</label>
                                <input type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.altura} onChange={e => setData('altura', e.target.value)} placeholder="1.70" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Peso (kg)</label>
                                <input type="number" step="0.1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.peso} onChange={e => setData('peso', e.target.value)} placeholder="70" />
                            </div>
                        </div>

                        <div className="md:col-span-4">
                            <label className="block text-sm font-semibold text-gray-700">Endereço Completo</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value={data.endereco_completo} onChange={e => setData('endereco_completo', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* 02. PARTE SUPERIOR */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-700 mb-6 uppercase tracking-wider">02. Parte Superior (Comuns)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {renderMedidaInput("Pescoço", "medida_pescoco")}
                        {renderMedidaInput("Ombro a Ombro", "medida_ombro_ombro")}
                        {renderMedidaInput("Tórax", "medida_torax")}
                        {renderMedidaInput("Cintura", "medida_cintura")}
                        {renderMedidaInput("Largura Costas", "medida_largura_costas")}
                        {renderMedidaInput("Cava", "medida_cava")}
                        {renderMedidaInput("Comp. Superior", "medida_comprimento_superior")}
                        {renderMedidaInput("Comp. Manga", "medida_comprimento_manga")}
                        {renderMedidaInput("Bíceps", "medida_biceps")}
                        {renderMedidaInput("Punho", "medida_punho")}
                    </div>
                </div>

                {/* 03. PARTE INFERIOR */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-700 mb-6 uppercase tracking-wider">03. Parte Inferior (Comuns)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {renderMedidaInput("Quadril", "medida_quadril")}
                        {renderMedidaInput("Altura Quadril", "medida_altura_quadril")}
                        {renderMedidaInput("Comp. Total", "medida_comprimento_total")}
                        {renderMedidaInput("Entrepernas", "medida_entrepernas")}
                        {renderMedidaInput("Altura Gancho", "medida_altura_gancho")}
                        {renderMedidaInput("Coxa", "medida_coxa")}
                        {renderMedidaInput("Joelho", "medida_joelho")}
                        {renderMedidaInput("Barra", "medida_barra")}
                    </div>
                </div>

                {/* 04. ESPECÍFICOS E EXTRAS */}
                <div className="bg-pink-50 p-6 rounded-xl shadow-sm border border-pink-100">
                    <h2 className="text-lg font-bold text-pink-700 mb-6 uppercase tracking-wider text-center">04. Específicos Femininos e Extras</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {renderMedidaInput("Altura Busto", "medida_altura_busto")}
                        {renderMedidaInput("Dist. Bustos", "medida_distancia_bustos")}
                        {renderMedidaInput("Comp. Frente", "medida_comprimento_frente")}
                        {renderMedidaInput("Comp. Costas", "medida_comprimento_costas")}
                        {renderMedidaInput("Circ. Barra", "medida_circunferencia_barra")}
                        {renderMedidaInput("Comp. Saia", "medida_comprimento_saia")}
                        {renderMedidaInput("Comp. Vestido", "medida_comprimento_vestido")}
                    </div>
                </div>

                {/* BOTÃO SALVAR */}
                <div className="pb-12">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                    >
                        {processing ? 'Gravando no Banco de Dados...' : 'Finalizar e Salvar Cadastro'}
                    </button>
                </div>
            </form>
        </div>
    );
}
