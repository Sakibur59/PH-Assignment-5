document.getElementById("login-btn").addEventListener("click",()=>{
    const user = document.getElementById("input-login");
    const username = user.value;

    const pass = document.getElementById("password-login");
    const password = pass.value;

    if(username === 'admin' && password ==='admin123'){
        alert("Login Success");
        window.location.assign("main.html");
    } else{
        alert("Login Failed")
        return;
    }
})