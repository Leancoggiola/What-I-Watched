import { Fragment } from 'react';
// Styling
import './IconButton.scss'

const IconButton = (props) => {
    const { children, className, disabled, href, onClick, type } = props;
    const classes = `cc-icon-btn ${className ? className : ''}`;

    return (
        <Fragment>
            {href ?
            <a className={classes}>{children}</a>
            :
            <button type={type} className={classes} disabled={disabled} onClick={onClick} >
                {children}
            </button>
            }
        </Fragment>
    )
}

export default IconButton;