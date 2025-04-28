import React, { InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  onChange?: (value: string) => void;
  label: string;
  columnClasses?: string;
  currency?: boolean;
  value?: string;
  error?: string;
  
}

export const Input: React.FC<InputProps> = ({
  onChange,
  label,
  columnClasses = '',
  id,
  currency = false,
  value,
  error,
  ...inputProps
}) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (currency) {
      newValue = formatReal(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          {...inputProps}
          value={value}
          onChange={onInputChange}
        />
        {error && ( 
            <p className="help is-danger">{error}</p>
          )}
      </div>
    </div>
  );
};