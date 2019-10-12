import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FilterIcon from '@material-ui/icons/FilterList';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';

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
    filter:[],
  });

  const handleCheck = event => {
    var currentFilter = state.filter;
    const indexOfType = currentFilter.indexOf(event.target.value);
    if(indexOfType >= 0){
      currentFilter.splice(indexOfType,1);
    }else{
      currentFilter = [...currentFilter,event.target.value];
    }
    console.log(currentFilter);
    setState({...state, filter: currentFilter});
  };

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
      <Button className = {classes.sideContent} variant='contained' color='primary'
              onClick   = {()=>props.handleFilter(state.filter)}
      >
        <span className='text'>Apply</span>
      </Button>
      <Button className = {classes.sideContent} variant='contained' color='secondary'
              onClick   = {()=>setState({...state,filter:[]})}
      >
        <span className='text'>Reset </span>
      </Button>
      <br/><br/>
      <Divider />
        <div className = {classes.sideContent}>
          <FormGroup aria-label='type-filter' name='types' value={state.filter} onChange={handleCheck}>        
            {
              types !== null || types !== undefined ?
              types.map((type)=>(
                <FormControlLabel
                  key = {type}
                  value={type}
                  control={<Checkbox color='primary' checked={state.filter.indexOf(type)>=0}/>}
                  label={<span className='text'>{type}</span>}
                />
              )) : null
            }
          </FormGroup>
        </div>
    </div>
  );

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