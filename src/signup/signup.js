import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './style';
import FormControl from '@material-ui/core/FormControl';
import {Link} from 'react-router-dom';

const firebase =require("firebase")
class SignupComponent extends React.Component{

    constructor(){
        super();
        this.state={
            email:null,
            password:null,
            passwordConfirmation:null,
            signupError:'There was an error'
        }
    }
    render(){
        const {classes} =this.props

     
return (
    <main className={classes.main} >
        <CssBaseline >
            <Paper className={classes.paper}>
                <Typography component="h1" variant='h5'>
                    Sign Up!
                </Typography>
                <form onSubmit={(e) =>this.subimitSignup(e)} className={classes.form}>
                    <FormControl required fullWidth margin='nomal'>
                        <InputLabel htnlFor='sinup-email-input'>
                            Enter Youtr Email
                        </InputLabel>
                        <Input autoComplete='email' onChange={(e) => this.userTyping('email',e)} autoFoucus id='signup-email-input'>
                        </Input>
                    </FormControl>
                    <FormControl required fullWidth margin='nomal'>
                        <InputLabel htnlFor='sinup-password-input'>
                           Create A Password
                        </InputLabel>
                        <Input type='password' autoComplete='email' onChange={(e) => this.userTyping('password',e)} autoFoucus id='sinup-password-input'>
                        </Input>
                    </FormControl>
                    <FormControl required fullWidth margin='nomal'>
                        <InputLabel htnlFor='sinup-password-confirmation-input'>
                           Confirm Your Password
                        </InputLabel>
                        <Input type='password' autoComplete='email' onChange={(e) => this.userTyping('passwordConfirmation',e)} autoFoucus id='sinup-password-input'>
                        </Input>
                    </FormControl>
                    <Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
                            SUBMIT
                    </Button>
                </form>
                {
                    this.state.signupError ?
                    <Typography className={classes.errorText} component='h5' variant='h6' >
                        {this.state.signupError}
                    </Typography>:
                    null
                }
                <Typography component='h5' variant='h6' className={classes.hasAccountHeader}>Already Have An Account?</Typography>
                <Link className={classes.logInLink} to='/login'>Logi In!</Link>
            </Paper>
        </CssBaseline>
    </main>
)
    }
    formIsValid =() =>this.state.password === this.state.passwordConfirmation;

    userTyping=(type ,e)=>{
        switch(type){
            case 'email':
                this.setState({email:e.target.value});
                break;

            case 'password':
                this.setState({password:e.target.value});
                break;

            case 'passwordConfirmation':
                this.setState({passwordConfirmation:e.target.value});
                break;

                default:
                break;
        }
    }
    subimitSignup=(e) =>{
        e.preventDefault();
        if(!this.formIsValid()){
            this.setState({signupError : 'Passwords do not match!'})
            return;
        }
       firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(authRes =>{
            const userObj = {
                email:authRes.user.email
            };
        firebase
         .firestore()
         .collection('users')
         .doc(this.state.email)
         .set(userObj)
         .then(() =>{
             this.props.history.push('/dashboard')
         },authErr =>{
             console.log(authErr)
             this.setState({signupError:'Failed to add user'})
         },dbErr =>{
             console.log(dbErr)
             this.setState({signupError:'Failed add user'})
         })
        })
    }
}

export default withStyles(styles)(SignupComponent);