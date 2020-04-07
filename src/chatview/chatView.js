import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

class ChatViewComponent extends React.Component {
  render() {
    const { classes, chat,user } = this.props;

    if (chat === undefined) {
      return <main className={classes.content}>誰とチャットしたいの？</main>;
    } else {
        return (
        <div>
            <div className={classes.chatHeader}>
                あなたは{chat.users.filter(_user => _user !== user)[0]}と会話中です
            </div>
            <main className={classes.content}>
                {
                    chat.messages.map((_msg,_index) =>{
                        return(
                            <div key={_index} className={_msg.sender === user ? classes.userSent : classes.friendSent}>
                                {_msg.message}
                            </div>
                        )
                    }
                
                    )
                }
            </main>
        </div>
        )
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
