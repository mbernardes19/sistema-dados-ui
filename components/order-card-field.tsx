import { FunctionComponent } from "react";
import styled from "styled-components";
import { format } from 'date-fns';

type OrderCardFieldProps = {
    label: string;
    content: string | Date;
    emphasis?: boolean
}

export const OrderCardField: FunctionComponent<OrderCardFieldProps> = ({label, content, emphasis=false}) => {
    const formatContent = (content) => {
        let formattedContent = ''
        if (content instanceof Date) {
            formattedContent = format(content, 'dd/MM/yyyy')
        } else {
            formattedContent = content
        }
        let color = ''
        switch(content) {
            case 'Pendente':
                color = '#CED04B'
                break;
            case 'Faturado':
                color = '#27C200'
                break;
        }
        if (emphasis) {
            return (<EmphasisContent style={{color}}>{formattedContent.toUpperCase()}</EmphasisContent>)
        } else {
            return (<Content>{formattedContent}</Content>)
        }
    }
    return (
        <Container>
            <Label>{label}</Label>
            { formatContent(content) }            
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: .8rem;
`

const Label = styled.span`
    color: #9F9FB0;
    font-size: .9rem;
`

const Content = styled.span`
    font-size: 1.3rem;
`

const EmphasisContent = styled.span`
    font-size: 2rem;
`

