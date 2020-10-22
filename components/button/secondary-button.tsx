import { FunctionComponent } from "react"
import { SimpleButton } from "./simple-button";

type ButtonProps = {
    color?: string,
    textColor?: string
}

export const SecondaryButton: FunctionComponent<ButtonProps> = ({ children }) => (
    <SimpleButton
        textColor='#9F9FB0'
        color='white'
    >
        { children }
    </SimpleButton>
)