import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FilterIcon from '@material-ui/icons/FilterList';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

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
    marginLeft: '30px'
  }
});

function FilterSideBar(props) {
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

  const sideList = (types) => (
    <div
      className={classes.list}
      role='presentation'
    >
      <h2 className = {classes.sideContent}>Filter by Type</h2>
      <Button className = {classes.sideContent} variant='contained' color='primary'>
        <span className='text'>Apply</span>
      </Button>
      <Button className = {classes.sideContent} variant='contained' color='secondary'>
        <span className='text'>Reset</span>
      </Button>
      <br/><br/>
      <Divider />
        <div className = {classes.sideContent}>
          <FormControlLabel
            control={
            <Checkbox
                checked={true}
                // onChange={}
                value="checkedB"
                color="primary"
            />
            }
            label={<span className='text'>All</span>}
          />
        <br/>
        </div>
        {
          types !== null || types !== undefined ?
          types.map((type)=>(
            <div key= {type} className = {classes.sideContent}>
              <FormControlLabel
                control={
                <Checkbox
                    checked={false}
                    // onChange={}
                    value="checkedB"
                    color="primary"
                />
                }
                label={<span className='text'>{type}</span>}
              />
              <br/>
            </div>
            // <p className = {classes.sideContent} key={type}>{type}</p>
          )) : null
        }
    </div>
  );

  console.log('filter types = '+props.listFilter)
  return (
    <div>
        <Fab 
            variant='extended' color='primary' aria-label='add' 
            onClick={toggleDrawer(true)} className = {classes.button}
        >
            <FilterIcon/>&nbsp;<span className='text'>Filter</span>
        </Fab>
        <Drawer anchor='right' open={state.isOpen} onClose={toggleDrawer(false)}>
            {sideList(props.listFilter)}
        </Drawer>
    </div>
  );
}

export default FilterSideBar;