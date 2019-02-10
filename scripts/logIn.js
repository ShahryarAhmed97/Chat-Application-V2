

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDCWvFCElwWQavpXGJ2jue4F-vtks4BOsw",
    authDomain: "shary-chat-app-v2.firebaseapp.com",
    databaseURL: "https://shary-chat-app-v2.firebaseio.com",
    projectId: "shary-chat-app-v2",
    storageBucket: "shary-chat-app-v2.appspot.com",
    messagingSenderId: "630326580670"
  };
  firebase.initializeApp(config);


  




  function logFun(){
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;

    if( email!=undefined && password!=undefined &&  email!="" && password!="" &&  email!=" " && password!=" "){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success)=>{
        let userUid=firebase.auth().currentUser.uid;
        let userEmail=firebase.auth().currentUser.email;
        localStorage.setItem('currentUserData',userEmail);
        
        localStorage.setItem('currentUserUid',userUid);
        firebase.database().ref('allusers/'+userUid)
        .once('value',(data)=>{
          var userObj=data.val();
          localStorage.setItem('currentUserName',userObj.userName)

          location.href="../pages/home.html";

        })

    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }
  else{
    alert('please Fill all fields Properly!!')
}

}