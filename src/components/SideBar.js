import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FilterIcon from '@material-ui/icons/FilterList';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  button:{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
  sideContent:{
    marginLeft: '20px'
  }
});

export default function SideBar({filterState}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: false,
  });

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, isOpen: open });
  };

  const sideList = (filterState) => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer( false)}
    >
      <h2 className = {classes.sideContent}>Filter by Type</h2>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <Fab 
            variant='extended' color='primary' aria-label='add' 
            onClick={toggleDrawer(true)} className = {classes.button}
        >
            <FilterIcon/>&nbsp;Filter
        </Fab>
        <Drawer anchor='right' open={state.isOpen} onClose={toggleDrawer(false)}>
            {sideList(filterState)}
        </Drawer>
    </div>
  );
}
