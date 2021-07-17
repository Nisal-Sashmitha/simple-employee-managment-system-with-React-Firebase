import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DisplayEmployees from './Components/DisplayEmployees';
import AddEmployees from './Components/AddEmployees';
import EditEmployees from './Components/EditEmployees';
import React,{ useState } from 'react';

function App() {

  const [editingEmployee, setEditingEmployee] = useState("");



  function editEmployeeHandler(EmpID){
    console.log("EmpID in app.js>>>>>>>>>",EmpID);
    setEditingEmployee(EmpID);
  }
  console.log("OUTER EmpID in app.js>>>>>>>>>",editingEmployee);
  
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path='/add' >
            <AddEmployees/>
          </Route>
          <Route path='/' exact component={DisplayEmployees}>
            <DisplayEmployees editEmployeeHandler={editEmployeeHandler}/>
          </Route>
          <Route path='/edit' >
            <EditEmployees id={editingEmployee}/>
          </Route>
          

        </Switch>
      
    
      </Router>
    </div>
  );
}

export default App;
