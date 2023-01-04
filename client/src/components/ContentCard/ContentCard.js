import { useSelector } from 'react-redux'
// Components
import { Card, CardFooter, CardHeader, CardImage } from '../../commonComponents/Card';
import { Pill } from '../../commonComponents/Pill';
// Styling
import './ContentCard.scss'

const ContentCard = (props) => {
    const { item } = props;
    const { data } = useSelector((state) => state.meta.appList)

    return (
        <Card className='content-card'>
            <CardImage>
                <img src={item.imageUrl} alt={item.title+'portrait'} />
            </CardImage>
            <CardHeader className='content-card-header'>
                <span><b>{item.title}</b></span>
                <span>{item.type}</span>
            </CardHeader>
            <CardFooter className='content-card-footer'>
                <Pill className='content-card-footer-pill'>{item.status}</Pill>
                <Pill className='content-card-footer-pill'>{item.appDisplayName}</Pill>
            </CardFooter>
        </Card>
    )
}

export default ContentCard;