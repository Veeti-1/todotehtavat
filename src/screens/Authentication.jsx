import { Link, useNavigate } from "react-router-dom";
//import { auth } from "../../server/db_helper/auth";
import {useUser} from "../context/UseUser";

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
            <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign up': 'Sign in'}</h3>
            <form onSubmit={handleSubmit}>
                <label> email</label>
                <input 
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
                placeholder="Email" type="email"/>
                <label>Password</label>
                    <input
                    placeholder='Password'
                    type='password' value={user.password}
                    onChange={e => setUser({...user,password: e.target.value})}/>
                <button type="submit">{authenticationMode === AuthenticationMode.SignIn ? 'Login' : 'Submit'}
                </button>
                <Link to={authenticationMode === AuthenticationMode.SignUp ? '/signin': '/signup'}>
                {authenticationMode === AuthenticationMode.SignIn ? 'Have an account? Login here': 'No account? Register here'}
                </Link>
                  
            </form>
        </div>
    )
}