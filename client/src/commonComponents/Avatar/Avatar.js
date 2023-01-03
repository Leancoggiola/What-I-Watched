// Styling
import { forwardRef } from 'react';
import './Avatar.scss'

const Avatar = forwardRef((props,ref) => {
    const { name, onClick, user } = props;

    const initials = 
        name.match(/(\b\S)?/g)
            .join('')
            .split('@')[0]
            .replaceAll('.','')
            .slice(0, 2)
            .toUpperCase();

    return(
        <div className='cc-avatar' onClick={() => onClick()}>
            { user?.picture ?
            <img src={user.picture} alt={initials} />
            :
            <div className='cc-avatar-initials'>
                <span>{initials}</span>
            </div>
            }
        </div>
    )
})

export default Avatar;