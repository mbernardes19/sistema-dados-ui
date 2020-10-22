import { FunctionComponent } from "react";
import { MenuItem } from "./menu-item";
import { Search, Update } from '@material-ui/icons'

type MenuProps = {

}

export const HomeMenu: FunctionComponent<MenuProps> = ({ children }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <MenuItem icon={<Search style={{fontSize: 100}} />} text="Consultar pedidos" />
            <br />
            <MenuItem icon={<Update style={{fontSize: 100}} />} text="Atualizar dados" />
        </div>
    )
}