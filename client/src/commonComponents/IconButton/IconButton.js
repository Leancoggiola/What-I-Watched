import { forwardRef, Fragment } from 'react';
// Styling
import './IconButton.scss'

const IconButton = forwardRef((props, ref) => {
    const { children, className, disabled, href, onClick, type } = props;
    const classes = `cc-icon-btn ${className ? className : ''}`;

    return (
        <Fragment>
            {href ?
            <a ref={ref} className={classes}>{children}</a>
            :
            <button ref={ref} type={type} className={classes} disabled={disabled} onClick={onClick} >
                {children}
            </button>
            }
        </Fragment>
    )
})

export default IconButton;