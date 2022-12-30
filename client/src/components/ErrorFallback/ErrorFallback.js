// Styling
import './ErrorFallback.scss'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className='error-fallback'>
            <div className='no-content-found'>
                <p className='main-text'>
                   {error}
                </p>
                <p className='main-text'>
                    Algo salio mal. Es necesario recargar la pagina o intentar mas tarde.
                </p>
                <button type='button' onClick={() => resetErrorBoundary()}>
                    Reintentar
                </button>
            </div>
        </div>

    )
}

export default ErrorFallback;