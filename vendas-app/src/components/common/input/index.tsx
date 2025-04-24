import { InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
    id: string,
    onChange?: (value: string) => void;
    label: string;
    columnClasses?: string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
    id,
    ... inputProps
}: InputProps) => {
    return (
        <div className={`field column ${columnClasses}`}>
            <label className='label' htmlFor={id}>{label}</label>
                <div className='control'>
                    <input className="input" 
                        id={id} {...inputProps} 
                        onChange={ e => {
                            if(onChange){
                                onChange(e.target.value)
                            }
                        }}
                    />
                </div>
        </div>

    )
}