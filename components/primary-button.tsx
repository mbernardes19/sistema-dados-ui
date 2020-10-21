import { FunctionComponent } from "react"
import { SimpleButton } from "./simple-button";

type ButtonProps = {
    color?: string,
    textColor?: string
}

export const PrimaryButton: FunctionComponent<ButtonProps> = ({ children }) => (
    <SimpleButton
        textColor='white'
        color='#2D2D2D'
        primary
    >
        { children }
    </SimpleButton>
)