// Styling
import './Login.scss'


const Login = () => {
    return (
        <div className='login-container'>
            <div className='login-card'>
                <h1>Bienvenido a What I Saw</h1>
                <p>Una plataforma para hacer seguimiento de peliculas y series</p>
                <button type='submit' onClick={() => window.location.href = '/'}>Login</button>
            </div>
        </div>
    )
}

export default Login;