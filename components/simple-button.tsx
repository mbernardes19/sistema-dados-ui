import { FunctionComponent } from "react"
import Button from '@material-ui/core/Button';

type ButtonProps = {
    color?: string,
    textColor?: string
    primary?: boolean
}

export const SimpleButton: FunctionComponent<ButtonProps> = ({ children, color, textColor, primary }) => (
    <Button
        style={{backgroundColor: color, color: textColor}}
        variant= {primary ? 'contained' : 'text'}
        fullWidth
    >
        <span style={{fontWeight: 400}}>{ children }</span>
    </Button>
)

SimpleButton.defaultProps = {
    textColor: 'black',
    color: 'white'
}