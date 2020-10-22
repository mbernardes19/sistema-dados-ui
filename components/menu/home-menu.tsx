import { FunctionComponent } from "react";
import { MenuItem } from "./menu-item";
import { Search, Update } from '@material-ui/icons'

type MenuProps = {

}

export const HomeMenu: FunctionComponent<MenuProps> = ({ children }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <MenuItem
                icon={<Search style={{fontSize: 100, color: '#66667B'}} />}
                text="Consultar pedidos"
                onClick={() => console.log('click consulta')}
            />
            <br />
            <MenuItem
                icon={<Update style={{fontSize: 100, color: '#66667B' }} />}
                text="Atualizar dados"
                onClick={() => console.log('click atualiza')}
            />
        </div>
    )
}