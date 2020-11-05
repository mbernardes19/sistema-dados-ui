import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FunctionComponent, CSSProperties } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';

type CardProps = {
    width?: number,
    height?: number,
    contentAlign?: 'center' | 'left' | 'right',
    contentFlow?: 'row' | 'column',
    clickable?: boolean,
    href?: string,
    fluid?: boolean,
    style?: CSSProperties,
    onClick?: (event?: any) => void
}


export const SimpleCard: FunctionComponent<CardProps> = ({ width, height, contentFlow, fluid, contentAlign, clickable, style, onClick, href, children }) => {
    
    const NonClickableCardContent = () => (
        <CardContent style={{display: 'flex', justifyContent: contentAlign, flexDirection: contentFlow, flexWrap: 'wrap', textAlign: contentAlign, padding: '2rem'}}>
            { children }
        </CardContent>
    );
    
    const ClickableCardContent = () => (
        <CardActionArea>
            <NonClickableCardContent />
        </CardActionArea>
    );

        {
            return !fluid ?
            (
                <Card onClick={onClick} raised style={{overflow: 'auto', minHeight: `${height}rem`, maxHeight: `${height+4}rem`, minWidth: `${width}rem`, maxWidth: `${width+4}rem`, margin: '1rem', cursor: clickable ? 'pointer' : 'default', ...style }}>
                    {
                        clickable ? <ClickableCardContent /> : <NonClickableCardContent />
                    }
                </Card>
            ) : (
                <Card onClick={onClick} raised style={{overflow: 'auto', margin: '1rem', cursor: clickable ? 'pointer' : 'default', ...style }}>
                    {
                        clickable ? <ClickableCardContent /> : <NonClickableCardContent />
                    }
                </Card>
            )
        }
    
}
SimpleCard.defaultProps = {
    height: 24,
    width: 20,
    contentAlign: 'center',
    contentFlow: 'column'
}