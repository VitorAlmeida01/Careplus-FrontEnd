

export async function byRole(role) {
    if (role === 'ROLE_ADMIN') {
        return '/funcionarios'
    } else if (role === 'ROLE_USER' || role === 'ROLE_MANAGER') {
        return '/consultas'
    } else if (role === 'ROLE_SCHEDULER') {
        return '/agendamento-consulta'
    }
}