import { FunctionComponent } from "react";
import { SimpleCard } from "./simple-card";
import Icon from '@material-ui/core/Icon'

type MenuItemProps = {
    icon?: string,
    text?: string
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({ icon, text }) => {
    return (
        <SimpleCard 
            width={16}
            height={12}
        >
            <div>
                <Icon style={{color: '#66667B', fontSize: 100}} fontSize='inherit'>{ icon }</Icon>
            </div>
            <p style={{marginBottom: 0, color: '#66667B', fontSize: 20}}>{ text }</p>
        </SimpleCard>
    )
}