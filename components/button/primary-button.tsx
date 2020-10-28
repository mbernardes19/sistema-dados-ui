import { FunctionComponent } from "react"
import { SimpleButton, ButtonProps } from "./simple-button";

export const PrimaryButton: FunctionComponent<ButtonProps> = ({ children, onClick }) => (
    <SimpleButton
        textColor='white'
        color='#2D2D2D'
        primary
        onClick={onClick}
    >
        { children }
    </SimpleButton>
)