// Styling
import './Icon.scss'

const Icon = (props) => {
    const { src, className, title } = props;

    return (
        <span 
            className={`cc-icon ${className}`}
            dangerouslySetInnerHTML={
                {__html: decodeURIComponent(src.replace(/data:image\/svg\+xml,/, ''))}
            }
            title={ title }
        />
    )
}

export default Icon;