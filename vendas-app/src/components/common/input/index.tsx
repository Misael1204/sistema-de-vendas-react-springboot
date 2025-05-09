import { InputHTMLAttributes, ChangeEvent } from 'react'
import { formatReal } from 'app/util/money'
import { formatCPF, formatPhone, formatDate, formatOnlyIntegers } from 'utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    columnClasses?: string;
    error?: string;
    formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
    label,
    columnClasses = '',
    id,
    error,
    formatter,
    onChange,
    ...inputProps
}: InputProps) => {

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        const formattedValue = (formatter && formatter(value)) || value;

        if (onChange) {
            onChange({
                ...event,
                target: {
                    ...event.target,
                    name,
                    value: formattedValue
                }
            } as unknown as ChangeEvent<HTMLInputElement>);
        }
    }

    return (
        <div className={`field column ${columnClasses}`}>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input
                    className="input"
                    onChange={onInputChange}
                    id={id}
                    {...inputProps}
                />
                {error && (
                    <p className="help is-danger">{error}</p>
                )}
            </div>
        </div>
    )
}


export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatReal} />
    )
}

export const InputCPF: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatCPF} />
    )
}

export const InputTelefone: React.FC<InputProps> = (props: InputProps) => {
    return (
        <Input {...props} formatter={formatPhone} />
    )
}

export const InputDate: React.FC<InputProps> = (props: InputProps) => {

    const formatData = (value: string) => {
        if (!value) {
            return '';
        }

        const data = formatOnlyIntegers(value);
        const size = data.length; // Corrigido para usar o tamanho da string só com dígitos

        if (size <= 2) {
            return data;
        }

        if (size <= 4) {
            return `${data.substring(0, 2)}/${data.substring(2)}`;
        }

        return `${data.substring(0, 2)}/${data.substring(2, 2 + 2)}/${data.substring(4, 4 + 4)}`;
    }

    return (
        <Input {...props} maxLength={10} formatter={formatData} />
    )
}