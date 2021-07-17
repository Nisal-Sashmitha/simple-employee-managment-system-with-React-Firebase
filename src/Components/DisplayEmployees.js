import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';
import ExpandLess from '@material-ui/icons/ExpandLess';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {  Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import firebase from '../firebase';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
      
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    button: {
      margin: theme.spacing(1),
    },
  }));





function DisplayEmployees(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);
    const [seniorEngineer, setseniorEngineer] =  useState([]);
    const [juniorEngineer, setjuniorEngineer] =  useState([]);
    const [editingEmployee, seteditingEmployee] = useState(props);
    
    

    

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };

    

    const docRef=firebase.firestore();

    useEffect(() => {

        docRef.collection('employees').onSnapshot(snapshot=>{
      
            const arr =snapshot.docs.map(doc =>({

              ID:doc.id,
              data:doc.data(),
            }));

            console.log(arr);
            setseniorEngineer(arr.filter(function(value) {
                return value.data.position === "senior engineer"; }))

            setjuniorEngineer(arr.filter(function(value) {
                return value.data.position === "junior engineer"; }))    
            

          })
       
    }, [docRef]);

    function deleteEmployee(ID){
      
      docRef.collection('employees').doc(ID).delete().then(() => {
            alert(ID,"Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    function editEmployee(id){
        alert("edit emp",id);
         editingEmployee.editEmployeeHandler(id);
    }
  
  

  console.log("juniorEngineer=>>>",juniorEngineer)
  console.log("seniorEngineer=>>>",seniorEngineer)



    return (
      <div>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
            className={classes.root}
          >
            
          
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="senior engineer list" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {seniorEngineer.map(employee=>(
                //<li>{todo}</li>
                <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                      <ListItemIcon>
                          <DraftsIcon />
                      </ListItemIcon>
              
                      <ListItemText primary={employee.data.employeeName+":"+employee.ID} />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => { deleteEmployee(employee.ID) }}
                      >
                        Delete
                      </Button>
                      <Link to='/edit' ><Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<EditIcon />}
                        onClick = {() => { editEmployee(employee.ID) }}
                      >
                        Edit
                      </Button></Link>


              </ListItem>
              </List>
            </Collapse>

            
                
                
              ))}


            <ListItem button onClick={handleClick2}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="junior  engineers list" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {juniorEngineer.map(employee=>(
                //<li>{todo}</li>
                <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                      <ListItemIcon>
                          <DraftsIcon />
                      </ListItemIcon>
              
                      <ListItemText primary={employee.data.employeeName+":"+employee.ID} />
                      
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => { deleteEmployee(employee.ID) }}
                      >
                        Delete
                      </Button>
                      <Link to='/edit' >
                          <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<EditIcon />}
                          onClick = {() => { editEmployee(employee.ID) }}
                          
                        >
                          Edit
                        </Button>
                      </Link>
                      
              </ListItem>
              </List>
            </Collapse>

            
                
                
              ))}



            
          </List>
    
    
            
        
    </div>
    )
}

export default DisplayEmployees;
