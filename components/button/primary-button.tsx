import { FunctionComponent } from "react"
import { SimpleButton, ButtonProps } from "./simple-button";

export const PrimaryButton: FunctionComponent<ButtonProps> = ({ children, onClick, style }) => (
    <SimpleButton
        textColor='white'
        color='#2D2D2D'
        primary
        onClick={onClick}
        style={style}
    >
        { children }
    </SimpleButton>
)