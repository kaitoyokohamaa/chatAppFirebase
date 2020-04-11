import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./style";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

class ChatListaComponent extends React.Component {
  render() {
    const { classes } = this.props;
    console.log(this.props.chats)
    if (this.props.chats.length === 0 && this.props.chats === []) {
      console.log(this.props.chats.length)
      return(
        <div>Loafding</div>
      )
    }else　if(this.props.chats.length > 0){
      console.log(this.props.chats)
      return (
        <main className={classes.root}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.newChatBtn}
            onClick={this.newChat}
          >
              New Message
          </Button>
          <List>
            {this.props.chats.map((_chat, _index) => {
              return (
                <div key={_index}>
                  <ListItem
                    onClick={() => this.selectChat(_index)}
                    className={classes.listItem}
                    selected={this.props.selectedChatIndex === _index} 
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp">
                        {
                          _chat.users
                            .filter(_user => _user !== this.props.userEmail)[0]
                            .split("")[0]
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        _chat.users.filter(
                          _user => _user !== this.props.userEmail
                        )[0]
                      }
                      secondary={
                        <Typography component="span" color="textPrimary">
                         { 
                           _chat.messages === undefined ?
                           null:
                           _chat.messages[
                            _chat.messages.length - 1
                          ].message.substring(0, 30)
                        }
                        </Typography>
                      }
                    >
                    </ListItemText>
                  </ListItem>
                  <Divider></Divider>
                </div>
              );
            })}
          </List>
        </main>
      );
    }else{
      return(
        <main className={classes.root}>
            <Button variant='contained'
                fullWidth
                color='primary'
                onClick={this.newChat}
                className={classes.newChatBtn}>
                    おニューなメッセージ
                </Button>
                <List></List>
        </main>
    )
    }
  }
  // userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => {
   this.props.newChatBtnFn()
  };
  selectChat = index => {
    this.props.selectChatFn(index)
  };
}
export default withStyles(styles)(ChatListaComponent);
