import { ChangeEvent, useId } from "react";
import './style.css';

type Props = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    label: string,
    placeholder?: string,
    type: 'text' | 'password' | 'date' | 'email',
    lang?: 'pt-BR' | 'en-US'
    error: boolean,
    errorMessage?: string
}

function TextInput({value, onChange, label, placeholder, errorMessage, error = false, type = 'text', lang = 'pt-BR'}: Props){
    const referenceId = useId();    
    return (
        <div className="container-input">
            <label htmlFor={referenceId}>{label}</label>
            <input
                lang={lang}
                id={referenceId}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={error ? { borderColor: '#E53E3E' } : {}}
            />
            {error && errorMessage && <p className="error-message" style={{ color: '#E53E3E' }}>{errorMessage}</p>}
        </div>
    );
}

export default TextInput;
