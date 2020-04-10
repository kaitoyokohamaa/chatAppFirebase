import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatTextComponent extends React.Component{

    constructor(){
        super();
        this.state={
            chatText:''
        };
    }

    render(){
        const {classes} = this.props
        return(
            <div className={classes.chatTextBoxContainer}>
               <TextField 
               placeholder='Type!!!!!!!!!!!!!!!!!!!'
               onKeyUp={(e) =>this.userTyping(e)}
               id='chattextbox'
               className={classes.chatTextBox}
               onFocus={this.userClickedInput}
               >
               </TextField>
               <Send onClick={this.submitMessage} className={classes.sendBtn}> 
               </Send>
            </div>
        )
    }
    userTyping = (e) =>{
       e.keyCode === 13  ? this.submitMessage() : this.setState({chatText:e.target.value})
       console.log(this.state.chatText)
    }

    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    submitMessage = () => {
        if(this.messageValid(this.state.chatText)) {
            const {submitMessageFn} = this.props
          const sub = submitMessageFn(this.state.chatText);
          console.log('333')
          console.log(submitMessageFn)
          console.log('33is.state.chatText3')
          document.getElementById('chattextbox').value = '';
        }
      }
    userClickedInput = () =>console.log('change Input')

}
export default withStyles(styles)(ChatTextComponent)