import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

// O nome dentro das chaves deve ser igual ao que você enviou no Controller
export default function Index({ clientes }) {
    console.log("Chegou no React:", clientes);

    return (
        <div className="p-8">
            <h1>Lista de Clientes</h1>
            {clientes && clientes.length > 0 ? (
                clientes.map(c => <p key={c.id}>{c.nome_completo}</p>)
            ) : (
                <p>O React ainda não recebeu os dados.</p>
            )}
        </div>
    );
}
