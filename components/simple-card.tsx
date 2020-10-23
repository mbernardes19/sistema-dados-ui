import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FunctionComponent } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';

type CardProps = {
    width?: number,
    height?: number,
    contentAlign?: 'center' | 'left' | 'right',
    contentFlow?: 'row' | 'column',
    clickable?: boolean,
    href?: string,
    onClick?: (event?: any) => void
}


export const SimpleCard: FunctionComponent<CardProps> = ({ width, height, contentFlow, contentAlign, clickable, onClick, href, children }) => {
    
    const NonClickableCardContent = () => (
        <CardContent style={{display: 'flex', justifyContent: contentAlign, flexDirection: contentFlow, textAlign: contentAlign, padding: '2rem'}}>
            { children }
        </CardContent>
    );
    
    const ClickableCardContent = () => (
        <CardActionArea>
            <NonClickableCardContent />
        </CardActionArea>
    );

    return (
        <Card onClick={onClick} raised style={{height: `${height}rem`, width: `${width}rem`, marginLeft: '2rem', marginRight: '2rem', cursor: clickable ? 'pointer' : '' }}>
            {
                clickable ? <ClickableCardContent /> : <NonClickableCardContent />
            }
        </Card>
    );
}
SimpleCard.defaultProps = {
    height: 25,
    width: 20,
    contentAlign: 'center',
    contentFlow: 'column'
}