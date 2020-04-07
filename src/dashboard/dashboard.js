import React from "react";
import ChatList from "../chatList/chatList";
import { Button, withStyles } from "@material-ui/core";
import styles from "./style";
import ChatViewComponent from '../chatview/chatView'
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
        <Button className={classes.signOutBtn} onClick={this.signOut}>
          Sign Out
        </Button>
      </div>
    );
  }
  signOut= () =>firebase.auth().signOut();

  selectChat = chatIndex => {
      console.log('index:',chatIndex)
    this.setState({selectChat:chatIndex})
  };

  newChatBtnClicked = () =>
    this.setState({ newChatFormVisible: true, selectedChat: null });

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _user => {
      if (!_user) this.props.history.push("/login");
      else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _user.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _user.email,
              chats: chats
            });
            console.log(this.state);
          });
      }
    });
  };
}

export default withStyles(styles)(DashbordComponent);
