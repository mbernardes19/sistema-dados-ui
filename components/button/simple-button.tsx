import { FunctionComponent } from "react"
import Button from '@material-ui/core/Button';

export interface ButtonProps {
    color?: string,
    textColor?: string
    primary?: boolean
    onClick?: (arg?: any) => void
}

export const SimpleButton: FunctionComponent<ButtonProps> = ({ children, color, textColor, primary, onClick }) => (
    <Button
        style={{backgroundColor: color, color: textColor}}
        variant={primary ? 'contained' : 'text'}
        fullWidth
        onClick={onClick}
    >
        <span style={{fontWeight: 400}}>{ children }</span>
    </Button>
)

SimpleButton.defaultProps = {
    textColor: 'black',
    color: 'white'
}