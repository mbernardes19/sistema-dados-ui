import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FunctionComponent } from 'react';

type CardProps = {
    width?: number,
    height?: number
}

export const SimpleCard: FunctionComponent<CardProps> = ({ width, height, children }) =>
    (
        <Card style={{height: `${height}em`, width: `${width}em`}}>
            <CardContent>
                { children }
            </CardContent>
        </Card>
    );

SimpleCard.defaultProps = {
    height: 20,
    width: 20
}