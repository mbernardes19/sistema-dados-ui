import { FunctionComponent, ChangeEvent } from "react";
import { SimpleCard } from "./simple-card";
import { Dropdown } from "./dropdown";
import Enterprise from "../model/enterprise";


type OrderFilterProps = {
    enterprises?: Enterprise[]
    selected?: Enterprise
    onChange?: (event: React.ChangeEvent<{value: Enterprise}>) => void
}

export const OrderFilter: FunctionComponent<OrderFilterProps> = ({ selected, onChange, enterprises }) => {
    return (
        <SimpleCard
            width={18}
            height={18}
            style={{minWidth: '22rem', maxWidth: '22rem'}}
            contentAlign='left'
            contentFlow='row'
        >
            <Dropdown value={selected} onChange={onChange} getDataLabel={(data) => data.name} data={enterprises} label='Empresa' />
        </SimpleCard>
    )
}