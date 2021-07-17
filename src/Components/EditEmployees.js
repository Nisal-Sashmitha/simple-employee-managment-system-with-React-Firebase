import React,{useState} from 'react';
import { useEffect } from 'react';
import firebase from '../firebase';
import {Form,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddEmployee.css';


function EditEmployees(props) {

    const [employeeName, setEmployeeName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [startdate, setStartdate] = useState("");
    const [positions, setPositions] = useState([]);
    const db=firebase.firestore();
    const [employeeId, setEmployeeId] = useState(props.id);

    useEffect(() => {

        db.collection('positions').onSnapshot(snapshot=>{
      
            const arr =snapshot.docs.map(doc =>doc.data());
            
            setPositions(arr);
            

          })
       
    }, [db]);

    useEffect(() => {

        db.collection("employees").doc(employeeId.toString()).get().then(function(doc) {
            if (doc.exists) {
            console.log("Document data:", doc.data());
            setEmail(doc.data().email);    
            setEmployeeName(doc.data().employeeName);
            setPhoneNumber(doc.data().phoneNumber);
            setPosition(doc.data().position);
            setStartdate(doc.data().startdate);


            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

}, [db,employeeId])
    
    

   
   


    function editdata(e){
        e.preventDefault();
        alert("editdone");
        const updatedEmployee ={
            employeeName,
            email,
            phoneNumber,
            position,
            startdate
        }
        console.log(updatedEmployee);

        db.collection("employees").doc(employeeId).update(updatedEmployee);
        




        


       
    }
    

   
    

    return (
        <div className="addEmployeeForm">    
            <h1>Edit employee:{employeeId}</h1>


            <Form onSubmit={editdata}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={employeeName} onChange={(e)=>{setEmployeeName(e.target.value);}} />
                    
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value);}}  />
                    
                </Form.Group>
                <Form.Group controlId="formBasicPhoneNo">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value);}}  />
                    
                </Form.Group>

                
                <Form.Control as="select" value={position} onChange={(e)=>{setPosition(e.target.value);}}>
                    <option value="">selectPosition</option>
                    {positions.map(position=>(
                        <option value={position.positionName}>{position.positionName}</option>
                    ))}
                </Form.Control>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Phone Number" value={startdate} onChange={(e)=>{setStartdate(e.target.value);}}  />
                    
                </Form.Group>
  
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


        </div>
    )
}

export default EditEmployees
