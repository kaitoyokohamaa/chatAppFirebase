import React from "react";
import ChatList from "../chatList/chatList";
import { Button, withStyles } from "@material-ui/core";
import styles from "./style";
import ChatViewComponent from '../chatview/chatView'
import ChatTextBox from '../chattextbox/chattextbox'
import NewChatComponent from '../newChat/newChat'
const firebase = require("firebase");
class DashbordComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectChat: null,
      newChatFormVisible: false,
      email: null,
      chats: []
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ChatList
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}                 
          userEmail={this.state.email}                 
        >                 
          {" "}                 
        </ChatList>                 
        {                 
            this.state.newChatFormVisible?                  
            null:                 
            <ChatViewComponent                 
                user={this.state.email}                 
                chat={this.state.chats[this.state.selectChat]}                 
            ></ChatViewComponent>                 
        }                 
        {
          this.state.selectChat !== null && !this.state.newChatFormVisible?
          <ChatTextBox submitMessageFn={this.submitMessage}/>:null
        }
        {
          this.state.newChatFormVisible ? <NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChatComponent>:null
        }

        <Button className={classes.signOutBtn} onClick={this.signOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  signOut= () =>firebase.auth().signOut();

  selectChat = chatIndex => {
    this.setState({selectChat:chatIndex ,newChatFormVisible:false})
    console.log({selectChat:chatIndex},chatIndex)
  };

  submitMessage = (msg) => {
    console.log(1111)
    console.log(this.state.newChatFormVisible)
    console.log(1111)
    const docKey = this.buildDocKey(this.state.chats[this.state.selectChat]
      .users
      .filter(_usr => _usr !== this.state.email)[0])
      console.log(docKey)
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: msg,
          sender: this.state.email
        }),
        receiverHasRead: false
      });
  }

  goToChat = async (docKey, msg) =>{
    const usersInChat = docKey.split(':')
    const chat = this.state.chats.find(_chat => usersInChat.every(_user =>_chat.users.includes(_user)));
    this.setState({newChatFormVisible:false})
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg)
  }

  buildDocKey = (friend) =>[friend,this.state.email].sort().join(':')

  newChatBtnClicked = () =>
    this.setState({ newChatFormVisible: true, selectChat: null });

    newChatSubmit = async (chatObj) =>{
      const docKey = this.buildDocKey(chatObj.sendTo);
      await 
      firebase
       .firestore()
       .collection('chats')
       .doc(docKey)
       .set({
         messages:[{
           message:chatObj.message,
           sender:this.state.email
         }],
         users:[this.state.email, chatObj.sendTo],
         receiverHasRead :false
       })
       this.setState({newChatFormVisible:false});
       this.selectChat(this.state.chats.length - 1)
    }

    componentWillMount = () => {
      firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
          this.props.history.push('/login');
        else {
          await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', _usr.email)
            .onSnapshot(async res => {
              const chats = res.docs.map(_doc => _doc.data());
              await this.setState({
                email: _usr.email,
                chats: chats,
                friends: []
              });
            })
        }
    });
  }
}

export default withStyles(styles)(DashbordComponent);