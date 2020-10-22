import { FunctionComponent } from "react";
import { SimpleCard } from "./simple-card";

type MenuItemProps = {
    icon?: any,
    text?: string
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({ icon, text }) => {
    return (
        <SimpleCard 
            width={16}
            height={12}
        >
            <div>
                { icon }
            </div>
            <p style={{marginBottom: 0, color: '#66667B', fontSize: 20}}>{ text }</p>
        </SimpleCard>
    )
}