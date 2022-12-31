// Styling
import './Avatar.scss'

const Avatar = (props) => {
    const { name, onClick } = props;

    const initials = 
        name.match(/(\b\S)?/g)
            .join('')
            .split('@')[0]
            .replaceAll('.','')
            .slice(0, 2)
            .toUpperCase();

    return(
        <div className='cc-avatar' onClick={() => onClick()}>
            <div className='cc-avatar-initials'>
                <span>{initials}</span>
            </div>
        </div>
    )
}

export default Avatar;