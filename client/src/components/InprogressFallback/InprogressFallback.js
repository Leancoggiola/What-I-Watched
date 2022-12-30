import { Fragment, memo } from 'react';
// Components
import Theme from '../Theme';
import LoadingSpinner from '../LoadingSpinner';
// Styling
import './InprogressFallback.scss'


const InprogressFallback = memo((props) => {
    return(
        <Fragment>
            <Theme variant='default' />
            <LoadingSpinner fullscreen={true} />
            <div className='inprogress-text'>{props.status}</div>
        </Fragment>
    )
})

export default InprogressFallback;