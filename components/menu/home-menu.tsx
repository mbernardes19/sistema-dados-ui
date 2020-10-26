import { FunctionComponent, useEffect, useContext, useState } from "react";
import { MenuItem } from "./menu-item";
import { Search, Update, PersonAdd } from '@material-ui/icons'
import ApiService from "../../services/api";

type MenuProps = {

}

export const HomeMenu: FunctionComponent<MenuProps> = ({ children }) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        async function getMenu() {
            try {
                const response = await ApiService.getMenu(sessionStorage.getItem('user_token'))
                setMenu(response.data);
            } catch (err) {
                
            }
        }
        getMenu();
    }, [])

    const selectIcon = (icon) => {
        switch(icon) {
            case 'SEARCH':
                return <Search style={{fontSize: 100, color: '#66667B'}} />
            case 'PERSON_ADD':
                return <PersonAdd style={{fontSize: 100, color: '#66667B' }} />
            case 'UPDATE':
                return <Update style={{fontSize: 100, color: '#66667B' }} />
        }
    }

    return (
        <div style={{ margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexFlow: 'row wrap'}}>
            {
                menu.map(men => (
                    <MenuItem
                        icon={selectIcon(men.id)}
                        text={men.text}
                        href={men.href}
                    />
                ))
            }
        </div>
    )
}