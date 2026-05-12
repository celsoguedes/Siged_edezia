import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react'; // Importação única

export default function AuthenticatedLayout({ user, header, children }) {
    const { flash } = usePage().props;
    const [notificacao, setNotificacao] = useState(null);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setNotificacao({
                msg: flash.success || flash.error,
                tipo: flash.success ? 'success' : 'error'
            });

            const timer = setTimeout(() => setNotificacao(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sistema de Toast (Mensagens flutuantes) */}
            {notificacao && (
                <div className="fixed top-5 right-5 z-[100] animate-bounce">
                    <div className={`${
                        notificacao.tipo === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                    } text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20`}>
                        <div className="bg-white/20 p-1 rounded-lg">
                            {notificacao.tipo === 'success' ? '✅' : '❌'}
                        </div>
                        <span className="text-xs font-black uppercase italic">{notificacao.msg}</span>
                    </div>
                </div>
            )}

            <nav className="border-b border-gray-100 bg-white">
                {/* ... Restante do código original do seu menu/navbar ... */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        {/* Seu código de navegação aqui */}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
