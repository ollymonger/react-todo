import React from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom";
import { Toolbar, Typography, InputBase } from "@material-ui/core"
import { AppBar, Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Tasklist } from './Tasklist';
import { Home } from './Home';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const MenuBar: React.FunctionComponent = props => {

  const classes = useStyles(1);

  return (
    <AppBar position="static">
      <Toolbar>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
              <MenuIcon />
          </Button>
              <Menu {...bindMenu(popupState)}>
                <Link to="/"><MenuItem onClick={popupState.close}>Home</MenuItem></Link>     
                <Link to="/Tasklist"><MenuItem onClick={popupState.close}>TaskLists</MenuItem></Link>                
                <Route path="/" component={Home} />                
                <Route path="/Tasklist" component={Tasklist} />
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <Typography className={classes.title} variant="h6" noWrap>| TaskLists
          </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'Search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
};

export { MenuBar };