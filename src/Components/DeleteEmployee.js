import React from 'react';
import firebase from '../firebase';

function DeleteEmployee() {

    const collectionn = docRef.collection('employees');
    tutorialsRef.doc(id).delete();

    return (
        <div>
            
        </div>
    )
}

export default DeleteEmployee
