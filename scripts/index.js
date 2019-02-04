var config = {
  apiKey: "AIzaSyDCWvFCElwWQavpXGJ2jue4F-vtks4BOsw",
  authDomain: "shary-chat-app-v2.firebaseapp.com",
  databaseURL: "https://shary-chat-app-v2.firebaseio.com",
  projectId: "shary-chat-app-v2",
  storageBucket: "shary-chat-app-v2.appspot.com",
  messagingSenderId: "630326580670"
};
firebase.initializeApp(config);



function userDetails(){
    var userName=document.getElementById('userName').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var dob=document.getElementById('dob').value;
    var genArr=document.getElementsByName('gender');
    var gender;
    for(var i=0;i<genArr.length;i++){
        if(genArr[i].checked)
     gender=genArr[i].value;
        
    }
if(userName!=undefined && email!=undefined && password!=undefined && dob!=undefined && userName!="" && email!="" && password!="" && dob!="" && gender!=undefined && userName!=" " && email!=" " && password!=" " && dob!=" "){
    var emailCheck=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(email.match(emailCheck)){
    
    let userObj={
        userName,
        email,
        password,
        dob,
        gender,
    

    }

    return userObj
}
                    else{
                        alert('email is badly formatted !!')
                }
}

else{
    alert('please Fill all fields Properly!!')
}
}

function signFun(){

    var userObj=userDetails();
console.log(userObj.email)
    firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .then((success)=>{

        let userUid=firebase.auth().currentUser.uid;
        localStorage.setItem('currentUserUid',userUid);

        userObj.userUid=userUid;

        firebase.database().ref('allusers/'+userUid).set(userObj)
        .then((success)=>{

window.location.href="./pages/logIn.html"
        })
        .catch((error)=>{
alert(error.message)
        })

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
    


}


function fbLogFun(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
      });



      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token)

        let userUid=firebase.auth().currentUser.uid;
        localStorage.setItem('currentUserUid',userUid);
        // for(var key in user){
       
        //    var uid = user[key].uid;
        //    var email=user[key].email;
        //    var displayName=user[key].displayName;
        // }

        // let userObj={
        //   uid,
        //   email,
        //   displayName
        // }

        window.location.href="./pages/home.html"
//         firebase.database().ref("users/"+uid)
//         .set(userObj)
//         .then((success)=>{

//         }).catch((error)=>{
//           var errorMessage = error.message;
// alert(errorMessage)
//         })
      

     

    


 }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;  
      var credential = error.credential;
      });
}