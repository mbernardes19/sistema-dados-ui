import { FunctionComponent } from "react"
import { SimpleButton } from "./simple-button";

type ButtonProps = {
    color?: string,
    textColor?: string,
    onClick?: (arg?: any) => void
}

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