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
// console.log(valueOf(firebase.database.ServerValue.TIMESTAMP))
  var allContacts=document.getElementById("allContacts");
  var userUid=localStorage.getItem('currentUserUid');
//   var welcm=localStorage.getItem('currentUserData');
// document.getElementById('h1').innerHTML="Welcome  "+welcm
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
        allContacts.innerHTML+=
        `
        
        <tr>
         <td><img src="../images/emptyUser.png" alt="users" height="70px" width="70px" class="userImg">
        <button class='btn btn-success' style="width:200px; font-size:1.3em;background-color:transparent;color:green" onclick='contactIdFun("${allUsers[key].email}","${key}")'>${allUsers[key].userName}</button>
        </td>
        </tr>
        `
        }
      }
    }

   
    })
 })
 
}



// function addContacts(){

//   var myContacts=document.getElementById('myContacts').value;
//   var userUid=localStorage.getItem('currentUserUid');
// var exiConArray=[]
//   firebase.database().ref('myContacts/'+userUid)
//   .on('value',(data)=>{
//     var exiCon=data.val();
//     for(var key in exiCon){
//       exiConArray.push(exiCon[key].myContacts);
//     }
// if(exiConArray.includes(myContacts)==false){
        
//   let contactObj={
//     myContacts,
//   }
//   firebase.database().ref('myContacts/'+userUid)
//   .push(contactObj)
//   .then((success)=>{
//     document.getElementById('allContacts').innerHTML=""

//     // alert("SuccessFully added"+success)
//     console.log("SuccessFully added"+success)
//     document.getElementById('myContacts').value="";
//     loadFun();
//   })
//   .catch((error)=>{
// alert(error)
// console.log(error)
//   })
      
// }
// else{
//   alert('this contact already exists');
//   document.getElementById('myContacts').value="";

// }

//   })

// }








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
    var recieverEmail=email;
    var recieverId=key;
    localStorage.setItem('recieverId',key)
    localStorage.setItem('recieverEmail',email)
  var msgsViewDiv2=document.getElementById('msgsViewDiv2');
     document.getElementById('recieverId').value=recieverEmail;
 var allMsgs=[];
 var msgRef;
 if(userUid<recieverId){
   msgRef=userUid+recieverId;
 }
 else{
   msgRef=recieverId+userUid;
 }
  
  
     firebase.database().ref('allChats/FrndsChats/'+userUid+'/'+recieverId+'/'+msgRef)

     .on('value',(data)=>{
       var msgsData=data.val();

     
       msgsViewDiv2.innerHTML="";
       for(var key in msgsData){
        
 allMsgs.push(msgsData[key])
         
        
       }


  
     })

     var msgViewDiv1=document.getElementById("msgViewDiv1");
     firebase.database().ref('allChats/FrndsChats/'+userUid+'/'+recieverId+'/Reciever/')

     .on('value',(data)=>{
       var msgsData=data.val();
       msgsViewDiv1.innerHTML="";
       for(var key in msgsData){
        
allMsgs.push(msgsData[key])
          
 
        
       }


  
     })  

     //  allMsgs.sort(compare);

     firebase.database().ref('tempChats/'+userUid).
     set(allMsgs)
     .then((success)=>{

    var userUid=localStorage.getItem('currentUserUid');

      firebase.database().ref('tempChats/'+userUid) 
      .orderByChild('tStamp')
      .on('value',(data)=>{
        var allMsgs=data.val();
        for(var key in allMsgs){
          console.log(allMsgs[key])
               msgsViewDiv1.innerHTML+=
               `
               <table   style='overflow-wrap: break-word;padding:10px;border-radius:10px;box-shadow:0px 0px 20px grey;'>
               <tr  style='padding:10px'>
               <td style='font-size:1.3em;padding:10px;overflow-wrap: break-word;width:100px !important ;' ><p  style='width:300px !important ;overflow-wrap: break-word;'>${allMsgs[key].msg}</p> </td>
              
              </tr>
          
             <tr style='text-align:right; color:grey;border-top:2px solid lightgrey;padding:10px;'>
             <td>${allMsgs[key].tStamp}&nbsp;&nbsp;&nbsp; ${allMsgs[key].currentUserData} </td>
             </tr>
           
               </table>
               <br><br>
               `
              
           }
      })


     

     })
     .catch((error)=>{

     })
    
    //  setInterval(updateScroll,1000);

  
  
  }
  
  
  

function sendFun(){

  var msg=document.getElementById('msg').value;
  var userUid=localStorage.getItem('currentUserUid');
  var recieverId=localStorage.getItem('recieverId');
  var recieverEmail=localStorage.getItem('recieverEmail');
  var currentUserData=localStorage.getItem('currentUserData')
  console.log(currentUserData)
  
  var today = new Date();
  // var tStamp = today.getHours() + ":" + today.getMinutes() ;
  var tStamp=today.toUTCString();
    let userMsg={
    msg,
    tStamp,
    currentUserData,

  }
 firebase.database().ref('allChats/FrndsChats/'+userUid+'/'+recieverId+'/Sender/')
  .push(userMsg)
  .then((success)=>{
    firebase.database().ref('allChats/FrndsChats/'+recieverId+'/'+userUid+'/Reciever/')
    .push(userMsg)

  .then((success)=>{
    contactIdFun(recieverEmail,recieverId)

  })
  .catch((error)=>{

  })




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

