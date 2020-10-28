import { FunctionComponent, Component, ChangeEvent } from "react";
import { Select, InputLabel, TextField, makeStyles } from "@material-ui/core";
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { TextInput } from './text-input'

interface AutoCompleteProps {
    options: any[];
    label: string;
    getOptionLabel: (option) => string;
    renderOption?: (option) => any;
    style?: any;
    value?: any;
    name?: string;
    inputRef?: any;
    onChange?: (event: ChangeEvent, newValue: any) => void
    filterOptions?: (options: any[], params: any) => any[]
}

const useStylesInput = makeStyles({
    root: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2D2D2D"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#2D2D2D"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#2D2D2D"
      },
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "#F44336"
      },
      "& .MuiInputLabel-outlined.Mui-error": {
        color: "#F44336"
      },
      "& .MuiOutlinedInput-input": {
        backgroundColor: '#F2F2F2'
      },
      "& .MuiAutocomplete-root": {
        backgroundColor: '#F2F2F2'
      }
    }
  });

  const useStylesAutocomplete = makeStyles({
    root: {
      "& .MuiAutocomplete-root": {
        backgroundColor: '#F2F2F2'
      },
      "& .MuiAutocomplete-root.MuiAutocomplete-hasClearIcon.MuiAutocomplete-hasPopupIcon": {
        backgroundColor: '#F2F2F2'
      },
      "& .MuiAutocomplete-root.MuiAutocomplete-hasClearIcon .MuiAutocomplete-hasPopupIcon": {
        backgroundColor: '#F2F2F2'
      }
    }
  });

export const AutoComplete: FunctionComponent<AutoCompleteProps> = ({options, renderOption, label, value, onChange, name, inputRef, filterOptions, getOptionLabel, style}) => {
    const classesInput = useStylesInput();
    const classesAutocomplete = useStylesAutocomplete();

    return (
        <Autocomplete
            className={classesAutocomplete.root}
            id='autocomplete'
            value={value}
            onChange={onChange}
            filterOptions={filterOptions}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            renderOption={renderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => <TextField className={classesInput.root} {...params} name={name} inputRef={inputRef} label={label} variant='outlined' />}
            style={style}
        />
    )
}