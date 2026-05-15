import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react'; // Importação única
import { useState, useEffect } from 'react'; // Importação única

export default function AuthenticatedLayout({ user, header, children }) {
    // Pegamos o flash de dentro de props
    const { props } = usePage();
    const flash = props.flash || {};

    const [notificacao, setNotificacao] = useState(null);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Monitora mensagens de sucesso ou erro do Laravel
    useEffect(() => {
        if (flash.success || flash.error) {
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
                <div className="fixed top-5 right-5 z-[100] animate-pulse">
                    <div className={`${
                        notificacao.tipo === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                    } text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20`}>
                        <span className="text-xs font-black uppercase italic">{notificacao.msg}</span>
                    </div>
                </div>
            )}

            {/* O restante do seu HTML (nav, menu, etc) continua igual abaixo... */}
            <nav className="border-b border-gray-100 bg-white">
                {/* ... código do menu ... */}
            </nav>

            <main>{children}</main>
        </div>
    );
}
