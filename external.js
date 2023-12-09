//external js 
//function to validate the form 
//https://www.w3schools.com/js/js_validation.asp
function validateform(){ 
//varibles used for the form validator  
var name=document.getElementById('name').value;  
var lastname=document.getElementByI('lastname').value;
var email=document.getElementById('email').value;  
var dob=document.getElementById('dob').value;  
var pnum=document.getElementById('pnum').value;  
var gender=document.getElementById('gender').value;  
var country=document.getElementById('country').value;  
// if statement to stop user from leaving thr form blank
if (name==null || name==""){ //if name is name blank is send an alrt that it cant be left blank
  alert("Frist Name can't be blank");  
  return false; // if its not blank   
  }else if(lastname==null || lastname==""){ //if lastname is name blank is send an alrt that it cant be left blank
    alert("Lastname cant be blank");
    return false; // if its not blank 
  }else if (email==null || email==""){ //if email is name blank is send an alrt that it cant be left blank
    alert("email cant be blank");
    return false; // if its not blank 
  }else if(dob==null || dob==""){ //if name is dob blank is send an alrt that it cant be left blank
    alert("DOB cant be blank");
    return false; // if its not blank 
  }else if(pnum.length<10){ // using .length to check that the password is at least 6 characters long
    alert("Phone Number must be 10 digits long");
    return false; // if its not blank 
  }else if(gender==null || gender==""){ //if gender is name blank is send an alrt that it cant be left blank
    alert("You must pick an option");
    return false; // if its not blank 
  }else(country==null || country==""){ //if country is name blank is send an alrt that it cant be left blank
    alert("Country cant be blank");
    return false; // if its not blank 
  }



}  

