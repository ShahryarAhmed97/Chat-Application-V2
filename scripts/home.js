var config = {
  apiKey: "AIzaSyDCWvFCElwWQavpXGJ2jue4F-vtks4BOsw",
  authDomain: "shary-chat-app-v2.firebaseapp.com",
  databaseURL: "https://shary-chat-app-v2.firebaseio.com",
  projectId: "shary-chat-app-v2",
  storageBucket: "shary-chat-app-v2.appspot.com",
  messagingSenderId: "630326580670"
};

firebase.initializeApp(config);
var currentUserData=localStorage.getItem('currentUserData')
  console.log(currentUserData)



function loadFun(){
  var allContacts=document.getElementById("allContacts");
  var userUid=localStorage.getItem('currentUserUid');
var userUids=[];
  firebase.database().ref("allusers/"+userUid+"/myfrnds/") 
  .on("value",(data1)=>{
    var myContacts=data1.val();

    for(var k in myContacts){
      userUids.push(myContacts[k]) ;
     }

console.log(userUids);


    firebase.database().ref("allusers/")
    .on("value",(data)=>{
      var allUsers=data.val();
console.log(allUsers)

      for(var key in allUsers){
        
        for(var u in userUids){

        if(allUsers[key].userUid==userUids[u]){

        var id=key;
        if(allUsers[key].userImg==undefined){
          allUsers[key].userImg="../images/emptyUser.png"
      }
        allContacts.innerHTML+=
        `
        
        <tr>
         <td><img src="${allUsers[key].userImg}" alt="users" height="70px" width="70px" class="userImg">
        <button class='btn btn-success' style="width:200px; font-size:1.3em;background-color:transparent;color:green" onclick='contactIdFun("${allUsers[key].userName}","${key}")'>${allUsers[key].userName}</button>
        </td>
        </tr>
        `
        }
      }
    }

   
    })
 })
 
}












function updateScroll(){
  var scrollDiv=document.getElementById('scrollDiv');
  scrollDiv.scrollTop = scrollDiv.scrollHeight;
}

function compare(a,b) {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
}



function contactIdFun(email,key){
  document.getElementById('msg').value="";
    var userUid=localStorage.getItem('currentUserUid');
    var currentUserName=localStorage.getItem('currentUserName')
    var recieverEmail=email;
    var recieverId=key;
    localStorage.setItem('recieverId',key)
    localStorage.setItem('recieverEmail',email)

  var msgsViewDiv2=document.getElementById('msgsViewDiv2');
     document.getElementById('recieverId').value=recieverEmail;
 var allMsgs=[];
 var msgRef;

  
  
     firebase.database().ref('allChats/frndsChats/'+userUid+recieverId)

     .on('value',(data)=>{
       var msgsData=data.val();

     var recName=localStorage.getItem('recieverEmail')
       msgsViewDiv2.innerHTML="";
       for(var key in msgsData){

             
  if(msgsData[key].currentUserData==undefined){
    msgsData[key].currentUserData=recieverEmail;
  }
  console.log(userUid)
          if(msgsData[key].currentUserName==currentUserName){
            msgsViewDiv2.innerHTML+=
            `
            <div style="text-align:right;">
            <table   style='margin-left:400px;text-align:right !important;overflow-wrap: break-word;padding:10px;border-radius:10px;box-shadow:0px 0px 20px grey;'>
            <tr  style='padding:10px;margin-left:300px;'>
            <td style='font-size:1.3em;padding:10px;overflow-wrap: break-word;width:100px !important ;' ><p  style='width:300px !important ;overflow-wrap: break-word;'>${msgsData[key].msg}</p> </td>
            
            </tr>
            
            <tr style='margin-left:300px;text-align:right; color:grey;border-top:2px solid lightgrey;padding:10px;'>
            <td style='padding:10px;'>${msgsData[key].tStamp}&nbsp;&nbsp;&nbsp; ${currentUserName} </td>
            </tr>
            
            </table>
            <br><br>
            </div>
            `
            
          }

          else{

            msgsViewDiv2.innerHTML+=
            `
            <table   style='overflow-wrap: break-word;padding:10px;border-radius:10px;box-shadow:0px 0px 20px grey;'>
            <tr  style='padding:10px;'>
            <td style='font-size:1.3em;padding:10px;overflow-wrap: break-word;width:100px !important ;' ><p  style='width:300px !important ;overflow-wrap: break-word;'>${msgsData[key].msg}</p> </td>
            
            </tr>
            
            <tr style='text-align:right; color:grey;border-top:2px solid lightgrey;padding:10px;'>
            <td style='padding:10px;'>${msgsData[key].tStamp}&nbsp;&nbsp;&nbsp; ${recName} </td>
            </tr>
            
            </table>
            <br><br>
            `
          }
        
         
        
       }


  
     })


    
    //  setInterval(updateScroll,1000);

  
  
  }
  
  
  

function sendFun(){

  var msg=document.getElementById('msg').value;
  var userUid=localStorage.getItem('currentUserUid');
  var recieverId=localStorage.getItem('recieverId');
  var recieverEmail=localStorage.getItem('recieverEmail');
  var currentUserData=localStorage.getItem('currentUserData')
  var currentUserName=localStorage.getItem('currentUserName')
  console.log(currentUserData)
  
  var today = new Date();
  var tStamp=today.toUTCString();
    let userMsg={
    msg,
    tStamp,
    currentUserData,
    currentUserName,

  }


 firebase.database().ref('allChats/frndsChats/'+userUid+recieverId)
  .push(userMsg)
  .then((success)=>{
    contactIdFun(recieverEmail,recieverId)



  })
  .catch((error)=>{
alert(error)
  });


  firebase.database().ref('allChats/frndsChats/'+recieverId+userUid)
  .push(userMsg)
  .then((success)=>{
    contactIdFun(recieverEmail,recieverId)



  })
  .catch((error)=>{
alert(error)
  });




}



  
function logOutFun(){
  
  
  firebase.auth().signOut()
  .then(function() {
 localStorage.setItem('currentUserUid',null)
 localStorage.setItem('recieverId',null)
  localStorage.setItem('recieverEmail',null)
  localStorage.setItem('currentUserData',null);
  localStorage.setItem('fbUser',null);




 location.href="../pages/logIn.html"
  }).catch(function(error) {
   alert(error.message)
  });    
}



