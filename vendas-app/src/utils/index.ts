export const formatCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
};

export const formatPhone = (telefone: string) => {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length <= 10) {
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const formatDate = (date: string) => {
    date = date.replace(/\D/g, '');
    if (date.length <= 2) return date;
    if (date.length <= 4) return date.replace(/(\d{2})(\d{2})/, '$1/$2');
    return date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
};

export const formatOnlyIntegers = (value: string) => {
    return value.replace(/\D/g, '');
}