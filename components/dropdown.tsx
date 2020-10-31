import { FunctionComponent, ChangeEvent } from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import Enterprise from "../model/enterprise";

type DropdownProps = {
    label: string
    data: any[]
    value?: any
    onChange?: (event: React.ChangeEvent<{value: Enterprise}>) => void 
    getDataLabel?: (data: any) => string[]
}

export const Dropdown: FunctionComponent<DropdownProps> = ({ label, value, onChange, data, getDataLabel, children }) => {
    let dataLabels = []
    if (getDataLabel) {
        dataLabels = data.map(d => getDataLabel(d))
    } else {
        dataLabels = data
    }
    
    return (
        <FormControl fullWidth variant='outlined'>
            <InputLabel id="input-label">{label}</InputLabel>
            <Select
                labelId="input-label"
                id="filled-select"
                value={value}
                onChange={onChange}
                fullWidth
            >
                <MenuItem value="Todas as empresas">Todas as empresas</MenuItem>
                {console.log(data)}
                {
                  dataLabels.map(dataLabel => (<MenuItem value={dataLabel}>{dataLabel}</MenuItem>))
                }
            </Select>
        </FormControl>
    )
}