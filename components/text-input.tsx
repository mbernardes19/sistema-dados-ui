import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import { FunctionComponent } from 'react';
import { makeStyles } from "@material-ui/core/styles";

type TextInputProps = {
    inputRef?: (instance: HTMLDivElement) => void
    label: string,
    name?: string,
    error?: boolean,
    helperText?: string,
    type?: string
}

const useStyles = makeStyles({
    root: {
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2D2D2D"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2D2D2D"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#2D2D2D"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#2D2D2D"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "#2D2D2D"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#2D2D2D"
      }
    }
  });

export const TextInput: FunctionComponent<TextInputProps> = ({ inputRef, name, label, type, helperText, error=false }) => {
    const classes = useStyles();

    return (
        <TextField
        className={classes.root}
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
    )
}

TextInput.defaultProps = {
    type: 'text'
}