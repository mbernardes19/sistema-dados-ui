import { FunctionComponent, MouseEvent, CSSProperties } from "react"
import Button from '@material-ui/core/Button';

export interface ButtonProps {
    color?: string,
    textColor?: string
    primary?: boolean
    onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
    style?: CSSProperties
}

export const SimpleButton: FunctionComponent<ButtonProps> = ({ children, color, textColor, primary, onClick, style }) => (
    <Button
        style={{backgroundColor: color, color: textColor, ...style}}
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