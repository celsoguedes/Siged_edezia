import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ cliente }) {
    const { data, setData, put, processing, errors } = useForm({
        nome_completo: cliente.nome_completo || '',
        cpf: cliente.cpf || '',
        telefone: cliente.telefone || '',
        endereco_completo: cliente.endereco_completo || '',
        nucleo: cliente.nucleo || '',
        sexo: cliente.sexo || 'F',
        grau_hierarquico: cliente.grau_hierarquico || '',
        altura: cliente.altura || '',
        peso: cliente.peso || '',
        medida_pescoco: cliente.medida_pescoco || '',
        medida_torax: cliente.medida_torax || '',
        medida_cintura: cliente.medida_cintura || '',
        medida_ombro_ombro: cliente.medida_ombro_ombro || '',
        medida_cava: cliente.medida_cava || '',
        medida_biceps: cliente.medida_biceps || '',
        medida_comprimento_manga: cliente.medida_comprimento_manga || '',
        medida_punho: cliente.medida_punho || '',
        medida_quadril: cliente.medida_quadril || '',
        medida_comprimento_total: cliente.medida_comprimento_total || '',
        medida_altura_gancho: cliente.medida_altura_gancho || '',
        medida_coxa: cliente.medida_coxa || '',
        medida_joelho: cliente.medida_joelho || '',
        medida_barra: cliente.medida_barra || '',
        medida_altura_busto: cliente.medida_altura_busto || '',
        medida_distancia_bustos: cliente.medida_distancia_bustos || '',
        medida_comprimento_frente: cliente.medida_comprimento_frente || '',
        medida_comprimento_saia: cliente.medida_comprimento_saia || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('clientes.update', cliente.id));
    };

    // Estilos reutilizáveis para garantir alinhamento perfeito
    const labelStyle = "block text-[11px] font-black uppercase text-gray-400 mb-1.5 tracking-wider";
    const inputStyle = "w-full border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500 py-2.5 text-sm";

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-10 font-sans text-gray-800">
            <Head title={`Editar - ${cliente.nome_completo}`} />

            <div className="max-w-6xl mx-auto pb-24">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* CABEÇALHO PADRONIZADO */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-amber-500 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900">Editar Cadastro</h1>
                            <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mt-1">Sincronizando dados de: {cliente.nome_completo}</p>
                        </div>
                        <Link href={route('clientes.index')} className="text-gray-400 hover:text-gray-600 font-bold text-xs uppercase border-2 border-gray-100 px-4 py-2 rounded-xl transition">Voltar à lista</Link>
                    </div>

                    {/* SEÇÃO 01: IDENTIFICAÇÃO (GRID 12 COLUNAS) */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-xs font-black uppercase text-gray-400 mb-6 border-l-4 border-amber-500 pl-3">01. Dados Pessoais e Localização</h2>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-6">
                                <label className={labelStyle}>Nome Completo</label>
                                <input type="text" value={data.nome_completo} onChange={e => setData('nome_completo', e.target.value)} className={inputStyle} />
                            </div>
                            <div className="md:col-span-3">
                                <label className={labelStyle}>CPF</label>
                                <input type="text" value={data.cpf} onChange={e => setData('cpf', e.target.value)} className={inputStyle} />
                            </div>
                            <div className="md:col-span-3">
                                <label className={labelStyle}>Telefone</label>
                                <input type="text" value={data.telefone} onChange={e => setData('telefone', e.target.value)} className={inputStyle} />
                            </div>
                            <div className="md:col-span-8">
                                <label className={labelStyle}>Endereço Residencial</label>
                                <input type="text" value={data.endereco_completo} onChange={e => setData('endereco_completo', e.target.value)} className={inputStyle} />
                            </div>
                            <div className="md:col-span-4">
                                <label className={labelStyle}>Núcleo / Cidade</label>
                                <input type="text" value={data.nucleo} onChange={e => setData('nucleo', e.target.value)} className={inputStyle} />
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO 02: PERFIL (GRID EQUILIBRADO) */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-xs font-black uppercase text-gray-400 mb-6 border-l-4 border-indigo-500 pl-3">02. Perfil Físico e Profissional</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <label className={labelStyle}>Sexo</label>
                                <select value={data.sexo} onChange={e => setData('sexo', e.target.value)} className={inputStyle}>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle}>Altura (m)</label>
                                <input type="number" step="0.01" value={data.altura} onChange={e => setData('altura', e.target.value)} className={`${inputStyle} font-bold text-indigo-600`} />
                            </div>
                            <div>
                                <label className={labelStyle}>Peso (kg)</label>
                                <input type="number" step="0.1" value={data.peso} onChange={e => setData('peso', e.target.value)} className={`${inputStyle} font-bold text-indigo-600`} />
                            </div>
                            <div>
                                <label className={labelStyle}>Grau / Cargo</label>
                                <input type="text" value={data.grau_hierarquico} onChange={e => setData('grau_hierarquico', e.target.value)} className={inputStyle} />
                            </div>
                        </div>
                    </div>

                    {/* GRID DE MEDIDAS (COLUNAS LADO A LADO) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* TRONCO */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-[10px] font-black uppercase text-blue-500 mb-6 text-center tracking-[0.2em] border-b pb-2">03. Tronco e Superiores</h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                                {[
                                    ['Pescoço', 'medida_pescoco'], ['Tórax', 'medida_torax'],
                                    ['Cintura', 'medida_cintura'], ['Ombro/Ombro', 'medida_ombro_ombro'],
                                    ['Cava', 'medida_cava'], ['Bíceps', 'medida_biceps'],
                                    ['Manga', 'medida_comprimento_manga'], ['Punho', 'medida_punho']
                                ].map(([label, field]) => (
                                    <div key={field}>
                                        <label className={labelStyle}>{label}</label>
                                        <input type="number" step="0.01" value={data[field]} onChange={e => setData(field, e.target.value)} className={`${inputStyle} bg-gray-50/50 focus:bg-white`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PERNAS */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-[10px] font-black uppercase text-emerald-500 mb-6 text-center tracking-[0.2em] border-b pb-2">04. Pernas e Inferiores</h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                                {[
                                    ['Quadril', 'medida_quadril'], ['Comp. Total', 'medida_comprimento_total'],
                                    ['Alt. Gancho', 'medida_altura_gancho'], ['Coxa', 'medida_coxa'],
                                    ['Joelho', 'medida_joelho'], ['Barra', 'medida_barra']
                                ].map(([label, field]) => (
                                    <div key={field}>
                                        <label className={labelStyle}>{label}</label>
                                        <input type="number" step="0.01" value={data[field]} onChange={e => setData(field, e.target.value)} className={`${inputStyle} bg-gray-50/50 focus:bg-white`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FEMININO (ALINHADO AO CENTRO) */}
                    {data.sexo === 'F' && (
                        <div className="bg-pink-50/30 p-8 rounded-2xl border-2 border-pink-100">
                            <h3 className="text-[10px] font-black uppercase text-pink-500 mb-6 text-center tracking-[0.2em]">05. Específicos Femininos</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    ['Alt. Busto', 'medida_altura_busto'], ['Dist. Bustos', 'medida_distancia_bustos'],
                                    ['Comp. Frente', 'medida_comprimento_frente'], ['Comp. Saia', 'medida_comprimento_saia']
                                ].map(([label, field]) => (
                                    <div key={field}>
                                        <label className={`${labelStyle} text-pink-400`}>{label}</label>
                                        <input type="number" step="0.01" value={data[field]} onChange={e => setData(field, e.target.value)} className={`${inputStyle} border-pink-200 focus:border-pink-500 focus:ring-pink-500`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BARRA DE AÇÕES FIXA NO RODAPÉ */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50">
                        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-10">
                            <Link href={route('clientes.index')} className="text-gray-400 hover:text-red-600 font-bold uppercase text-[10px] transition underline decoration-2 underline-offset-4">Descartar Mudanças</Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-amber-500 text-white px-12 py-3.5 rounded-xl font-black uppercase text-sm hover:bg-amber-600 transition shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                            >
                                {processing ? 'Sincronizando...' : 'Confirmar e Atualizar'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
