import React from 'react';
import { BrowserRouter as Router, Route,  } from "react-router-dom";
import { TodoModel } from './models/TodoModel'
import { Container } from "@material-ui/core"
import { MenuBar } from './components/MenuBar'
import {Tasklist} from './components/Tasklist'
import { Home } from './components/Home';

import 'first-input-delay';
import "firebase/performance";
import './blankcss.css';

type FormElem = React.FormEvent<HTMLFormElement>



export interface taskProps {
  taskList: TodoModel;
}

const App: React.FunctionComponent = props => {
  return (
    <Router>
    <div>
      <MenuBar />
      <Container maxWidth="sm">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow|Righteous|Roboto|Open+Sans+Condensed|Material+Icons&display=swap" rel="stylesheet" />
        <Route exact path="/" component={Home}/>
        <Route path="/Tasklist"  component={Tasklist}/>

      </Container>
    </div >
    </Router>
  );
};

export { App };