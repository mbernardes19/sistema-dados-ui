import { FunctionComponent } from "react";
import { MenuItem } from "./menu-item";

type MenuProps = {

}

export const HomeMenu: FunctionComponent<MenuProps> = ({ children }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <MenuItem icon='search' text="Consultar pedidos" />
            <br />
            <MenuItem icon='update' text="Atualizar dados" />
        </div>
    )
}