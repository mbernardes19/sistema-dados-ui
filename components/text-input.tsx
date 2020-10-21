import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import { FunctionComponent } from 'react';

type TextInputProps = {
    inputRef?: (instance: HTMLDivElement) => void
    label: string,
    name?: string,
    error?: boolean,
    helperText?: string,
    type?: string
}

export const TextInput: FunctionComponent<TextInputProps> = ({ inputRef, name, label, type, helperText, error=false }) =>
    (
        <TextField
            name={name}
            inputRef={inputRef}
            error={error}
            helperText={helperText}
            label={label}
            type={type}
            fullWidth
            variant='outlined'
            style={{backgroundColor: '#F2F2F2', color: '#9F9FB0'}}
        />
    );

TextInput.defaultProps = {
    type: 'text'
}