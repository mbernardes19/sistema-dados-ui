import { FunctionComponent } from "react"
import { SimpleButton, ButtonProps } from "./simple-button";


export const SecondaryButton: FunctionComponent<ButtonProps> = ({ children, onClick, style }) => (
    <SimpleButton
        style={style}
        textColor='#9F9FB0'
        color='white'
        onClick={onClick}
    >
        { children }
    </SimpleButton>
)