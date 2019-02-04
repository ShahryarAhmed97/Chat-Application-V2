var config = {
    apiKey: "AIzaSyDCWvFCElwWQavpXGJ2jue4F-vtks4BOsw",
    authDomain: "shary-chat-app-v2.firebaseapp.com",
    databaseURL: "https://shary-chat-app-v2.firebaseio.com",
    projectId: "shary-chat-app-v2",
    storageBucket: "shary-chat-app-v2.appspot.com",
    messagingSenderId: "630326580670"
  };
  firebase.initializeApp(config);




  function loadFun(){
    document.getElementById("homeDiv").innerHTML=""
    firebase.database().ref("allusers/")
    .on('value',(data)=>{
     var allUsers=data.val();

for(var key in allUsers){

     document.getElementById("homeDiv").innerHTML+=
     `
     <div class="col-md-4 userDiv"  >
     <div class="col-md-4" style="">
         <img src="../images/emptyUser.png" alt="users" height="70px" width="70px" class="userImg">

     </div>
     <div class="col-md-4" style="margin-top:15px" >
         <h4>${allUsers[key].userName}</h4>

     </div> 

     <div class="col-md-4" style="margin-top:15px">
     <button class="btn btn-primary" onclick="addFrnds('${key}')">Add Friend</button>
     </div>

 </div>


`
}
    })

  }

  function addFrnds(key){
var userUid=localStorage.getItem('currentUserUid');
    firebase.database().ref('allusers/'+userUid+'/myfrnds/')
    .push(key)
    .then((success)=>{
        // alert('Frnd added Successfully');
        loadFun();

    })
    .catch((error)=>{
alert(error);
loadFun();
    })
  }

  
function logOutFun(){

    firebase.auth().signOut()
    .then(function() {
   localStorage.setItem('currentUserUid',null)
   localStorage.setItem('recieverId',null)
    localStorage.setItem('recieverEmail',null)
  
   location.href="../pages/logIn.html"
    }).catch(function(error) {
     alert(error.message)
    });    
  }
  
