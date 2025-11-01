import { Link, useNavigate } from "react-router-dom";
//import { auth } from "../../server/db_helper/auth";
import {useUser} from "../context/UseUser";
import '../styles/signupin.css'
export const AuthenticationMode = Object.freeze({
    Signin : 'Login',
    Signup : 'SignUp'
})

export default function Authentication({authenticationMode}) {


    const {user , setUser, signUp, signIn} = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault()

      
   const signFunction = authenticationMode === AuthenticationMode.SignUp ?
    signUp : signIn
   signFunction().then(response =>{
navigate(authenticationMode === Authentication.SignUp ? '/signin' : '/')
})
.catch(error => {
alert(error)
})
}

    return (
        <div>
            <h3 className="SignH3">{authenticationMode === AuthenticationMode.SignIn ? 'Sign up': 'Sign in'}</h3>
            <form onSubmit={handleSubmit}>
                
                <input 
                className="emailplaceholder"
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
                placeholder="Email" type="email"/>
                
                    <input
                    className="pwlaceholder"
                    placeholder='Password'
                    type='password' value={user.password}
                    onChange={e => setUser({...user,password: e.target.value})}/>
                <button className="submitBtn"type="submit">{authenticationMode === AuthenticationMode.SignIn ? 'Register' : 'Login'}
                </button>
                <Link to={authenticationMode === AuthenticationMode.SignUp ? '/signin': '/signup'} className="link">
                {authenticationMode === AuthenticationMode.SignIn ? 'Have an account? Login here': 'No account? Register here'}
                </Link>
                  
            </form>
        </div>
    )
}