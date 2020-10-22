import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FunctionComponent } from 'react';

type CardProps = {
    width?: number,
    height?: number,
    contentAlign?: 'center' | 'left' | 'right',
    contentFlow?: 'row' | 'column'
}

export const SimpleCard: FunctionComponent<CardProps> = ({ width, height, contentFlow, contentAlign, children }) =>
    (
        <Card style={{height: `${height}rem`, width: `${width}rem`, marginLeft: '2rem', marginRight: '2rem', padding: '1rem' }}>
            <CardContent style={{display: 'flex', justifyContent: contentAlign, flexDirection: contentFlow, textAlign: contentAlign}}>
                { children }
            </CardContent>
        </Card>
    );

SimpleCard.defaultProps = {
    height: 24,
    width: 24,
    contentAlign: 'center',
    contentFlow: 'column'
}