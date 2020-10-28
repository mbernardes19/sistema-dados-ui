import { FunctionComponent } from "react"
import { SimpleButton, ButtonProps } from "./simple-button";


export const SecondaryButton: FunctionComponent<ButtonProps> = ({ children, onClick }) => (
    <SimpleButton
        textColor='#9F9FB0'
        color='white'
        onClick={onClick}
    >
        { children }
    </SimpleButton>
)