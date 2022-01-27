import React, { useState } from 'react'
const Validation = (callback) => {
    
    //Form values
    const [values, setValues] = useState({});

    //Errors
    const [errors, setErrors] = useState({});

     // Regex for user input fields
    const regForName = /^[a-zA-Z]{3,100}$/;
    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const regForPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/);
    const regforContact=RegExp(/^[0-9]{10}$/);
    const regForAddress = RegExp(/^([A-Za-z]|[0-9]|[\w\s])+$/);
    const regForPincode = RegExp(/^[1-9][0-9]{5}/);

    const validate = (event, name, value) => {

        //A function to validate each input values
        switch (name) {
            case "fname":
                errors.fname = regForName.test(value)
                    ? ""
                    : "Name atleast have 3 characters";
                break;

            case "lname":
                    errors.lname = regForName.test(value)
                        ? ""
                        : "Name atleast have 3 characters";
                    break;

            case "email":
                errors.email = regForEmail.test(value) ? "" : "Enter Valid Email";
                break;
        
            case "contact":
                errors.contact=regforContact.test(value) ?"" : "Enter valid contact Number";
                break;
        
            case "password":
                errors.password = regForPassword.test(value)
                    ? ""
                    : "Please enter 8 digit password with special characters";
                break;
        
            case "cpassword":
                errors.cpassword =
                    document.getElementById("password").value === value
                    ? ""
                    : "Password and confirm password should be same";
                break;

            case "address":
                errors.address = regForAddress.test(value)
                ? " "
                : "Enter Valid Address";
                break;

            case "pincode":
                errors.pincode = regForPincode.test(value)
                ? " "
                : " Enter valid pincode";
                break;
            
            case "city":
                errors.city = regForName.test(value)
                    ? ""
                    : "City atleast have 3 characters";
                break;

            case "state":
                errors.state = regForName.test(value)
                    ? ""
                    : "State atleast have 2 characters";
                break;

            case "country":
            errors.country = regForName.test(value)
                ? ""
                : "Country atleast have 2 characters";
            break;

            default:
                alert("Fill proper details")
        }
    }

    //checking errors
    const validating_error = (errors) => {
        let valid = true;
        Object.values(errors).forEach((values) => values.length > 0 && (valid = false));
        return valid;
      };

      
    const handleSubmit = (event) => {
        event.preventDefault(); 
        if(validating_error(errors)){
            callback();
            console.log("Hello")
        } 
        else{
            alert("There is an error")
        }
    }

  //A method to handle form inputs
    const handler = (event) => {
        //To stop default events    
        event.persist();

        let name = event.target.name;
        let val = event.target.value;
        validate(event,name,val)
        //Let's set these values in state
        setValues({
            ...values,
            [name]:val,
        })    
    }

    return {
        values,
        errors,
        handler,
        handleSubmit
    }
}

export default Validation