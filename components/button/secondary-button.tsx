import { FunctionComponent } from "react"
import { SimpleButton } from "./simple-button";

type ButtonProps = {
    color?: string,
    textColor?: string,
    onClick?: (arg?: any) => void
}

export const SecondaryButton: FunctionComponent<ButtonProps> = ({ children, onClick }) => (
    <SimpleButton
        textColor='#9F9FB0'
        color='white'
        onClick={onClick}
    >
        { children }
    </SimpleButton>
)