import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import Mypic from '../assets/img/my-pic.png';


const Chat = (props) => {
  // ()で条件式を囲んで、それを変数に対して入れると、条件式の結果(審議値 true.false)変数にが入る
  const isQuestion = (props.type === 'question');
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={Mypic} />
        ) : (
          <Avatar alt="icon" src={NoProfile} />
        )}

      </ListItemAvatar>
      <div className='p-chat__bubble'>{ props.text }</div>
    </ListItem>

  )
}

export default Chat;
