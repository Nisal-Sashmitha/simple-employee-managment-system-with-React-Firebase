import React,{useState,useEffect} from 'react';
import firebase from '../firebase';
import {Form,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddEmployee.css';

function AddEmployees() {

    const [employeeName, setEmployeeName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [startdate, setStartdate] = useState("");
    const [positions, setPositions] = useState([]);
    const db=firebase.firestore();


    useEffect(() => {

        db.collection('positions').onSnapshot(snapshot=>{
      
            const arr =snapshot.docs.map(doc =>doc.data());
            
            setPositions(arr);
            

          })
       
    }, [db])

    
    function sendData(e){
        e.preventDefault();
        alert("done");
        const newEmployee ={
            employeeName,
            email,
            phoneNumber,
            position,
            startdate
        }
        console.log(newEmployee);

        


        db.collection("employees").doc().set(newEmployee)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });




        setEmployeeName("");
        setEmail("");
        setPhoneNumber("");
        setPosition("");
        setStartdate("");
    }
    

    return (
        

        <div className="addEmployeeForm">    
            <Form onSubmit={sendData}>
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

                
                <Form.Control as="select" onChange={(e)=>{setPosition(e.target.value);}}>
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

export default AddEmployees;
