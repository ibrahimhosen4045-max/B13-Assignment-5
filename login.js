const value = (id) => {
    const inputUserName = document.getElementById(id)
    const inputUserNameVal = inputUserName.value.trim();
    return inputUserNameVal;
}


document.getElementById("login-button").addEventListener("click", ()=>{
   const userName = value("input-user")
    if(userName !== "admin"){
        alert("Invalid name")
        return;
    }
   const passWord = value("input-pass")
   if(passWord !== "admin123"){
    
    alert("Invalid Password")
    return;
   }

   if(userName && passWord){
    alert("Login Successfull")
    window.location.assign("./home.html")
   } else {
    alert("Invalid Login")
   }
   
})