import React,{useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import "./style.css";
import useReactRouter from'use-react-router'
const firebase = require("firebase")

const LoginComponent =() =>{
    const [Email,setEmail] = useState('') 
    const [Password,setPassword] = useState('')
    const [loginError,setloginError] = useState(false)

    const userTyping = (type,e) =>{
        switch(type){
            case 'email':
                    setEmail(e.target.value);
                break;
            
            case 'password':
                    setPassword(e.target.value);
                break;
            default:
            break;
        }
    }
    const { history } = useReactRouter();

    const submitLogin = (e) =>{
        e.preventDefault();
        firebase
         .auth()
         .signInWithEmailAndPassword(Email, Password)
         .then(() =>{
            history.push('/dashboard')
         },err=>{
            setloginError(true);
             console.log(err)
         })
        }

        
return (
    <main className="main">
        <CssBaseline></CssBaseline>
        <Paper className="paper">
            <Typography component="h1" variant='h5'>Log In!</Typography>
            <form className="form" onSubmit={(e) =>submitLogin(e)}>
                <FormControl required fullWidth margin='nomal'>
                    <InputLabel htmlFor='login-email-input'>
                        Enter Your Email!
                    </InputLabel>
                    <Input autoComplete='email' value={Email} autoFocus id="login-email-input" onChange={(e) =>userTyping('email',e)}></Input>
                </FormControl>
                <FormControl required fullWidth margin='nomal'>
                    <InputLabel htmlFor='login-password-input'>
                        Enter Your Password
                    </InputLabel>
                    <Input type='password'value={Password} autoComplete='email' autoFocus id="login-password-input" onChange={(e) =>userTyping('password',e)}></Input>
                </FormControl>
                <Button type='submit' fullWidth variant='contained' color='primary' className="submit">
                    Log In
                </Button>
            </form>
            {
                loginError ?
                <Typography className="errortext" component="h5" variant="h6">
                    Incorrect Login Information
                </Typography> :
                null
            }
            <Typography component="h5" variant="h6" className="noAccountHeader">Don't Have An Account?</Typography>
            <Link className="signUpLink" to="/signup">Sign Up!</Link>
        </Paper>
    </main>
)
}


export default LoginComponent;