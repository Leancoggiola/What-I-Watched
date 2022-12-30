// Styling
import './LoadingSpinner.scss'


const LoadingSpinner = (props) => {
    const { showPosRelative, fullscreen} = props;

    return (
        <div className='progress-loader-pos-relative'>
            <div className={`progress-loader-container ${showPosRelative ? 'progress-loader-pos-relative' : ''} ${fullscreen ? 'progress-loader-fullscreen' : ''}`}>
                <div className='progress-loader-content'>
                    <div className='progress-loader-square'></div>
                    <div className='progress-loader-square'></div>
                    <div className='progress-loader-square'></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingSpinner;