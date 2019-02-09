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
    var userUid=localStorage.getItem('currentUserUid');

    document.getElementById("homeDiv").innerHTML=""
    firebase.database().ref("allChats/pendingReqs/"+userUid)
    .on('value',(data)=>{
     var penUsers=data.val();
    //  for(var key in penUsers){
    //      console.log(penUsers[key])
    //  }
     for(var key in penUsers){
        console.log(key)
         firebase.database().ref("allusers/"+key)
         .on('value',(data1)=>{
             var penUserData=data1.val();




            document.getElementById("homeDiv").innerHTML+=
            `
            <div class="col-md-4 userDiv"  >
            <div class="col-md-4" style="">
                <img src="../images/emptyUser.png" alt="users" height="70px" width="70px" class="userImg">
       
            </div>
            <div class="col-md-4" style="margin-top:15px" >
                <h4>${penUserData.userName}</h4>
       
            </div> 
       
            <div class="col-md-4" style="margin-top:15px">
            <button class="btn btn-primary" onclick="cnfrmFrnds('${penUserData.userUid}')">Accept</button>
            </div>
       
        </div>
       
       
       `


         })

    
}
    })

  }

  function cnfrmFrnds(key){
    var userUid=localStorage.getItem('currentUserUid');
        firebase.database().ref('allusers/'+userUid+'/myfrnds/')
        .push(key)
        .then((success)=>{
console.log(key)

firebase.database().ref('allusers/'+key+'/myfrnds/')
.push(userUid)
.then((success)=>{


    let delRef= firebase.database().ref('allChats/pendingReqs/'+userUid+'/'+key).remove()
          
    // delRef.child(key).remove()
                .then((success)=>{
    alert(success)
                    loadFun()
                })
                .catch((error)=>{
    alert(error.message)
                })
        
            })
            .catch((error)=>{
        alert(error);
        loadFun();
            })

})
.catch((error)=>{

})
          
  }

  
function logOutFun(){

    firebase.auth().signOut()
    .then(function() {
   localStorage.setItem('currentUserUid',null)
   localStorage.setItem('recieverId',null)
    localStorage.setItem('recieverEmail',null)
    localStorage.setItem('fbUser',null);

  
   location.href="../pages/logIn.html"
    }).catch(function(error) {
     alert(error.message)
    });    
  }
  
