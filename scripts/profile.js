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
  var userAreaDiv=document.getElementById('userAreaDiv');
  var userUid=localStorage.getItem('currentUserUid');
  firebase.database().ref('allusers/'+userUid)
  .once('value',(data)=>{

    let userObj=data.val();

if(userObj.userImg==undefined){
  userObj.userImg='../images/emptyUser.png'
}

    userAreaDiv.innerHTML+=
  
  `
<div class="col-md-6 col-md-offset-3" style='border: 2px solid white;margin-top:30px;'>
<div class="col-md-4 text-center">
<img src="${userObj.userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">
<input type='file' id='userImg' name='userImage'    class="imgMargin" style="display:none;">
<button class='btn btn-success'  id='upButt' onclick="hideFun()" >Upload Image</button>
<button class='btn btn-success' style="display:none;" id='upImg' onclick="uploadImg()" >Submit</button>

</div>
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="col-md-8">
<div class="userInfo">
<p><span class="bold">Name:</span> ${userObj.userName}</p>
     <p><span class="bold">Email:</span> ${userObj.email}</p>
     <p><span class="bold">Gender:</span> ${userObj.gender}</p>
     
     <p><span class="bold">Date Of Birth:</span> ${userObj.dob}</p>

     <br>

     
 </div>
</div>
</div>

<br><br><br>

`

  })

  

}

function hideFun(){
document.getElementById('userImg').style.display='block'

document.getElementById('upButt').style.display='none'
document.getElementById('upImg').style.display='block'


}


function uploadImg(){

  var userImg=document.getElementById('userImg').files[0];
  console.log(userImg)




  let userUid=localStorage.getItem('currentUserUid')
  firebase.storage().ref().child(`userProfiles/${userUid}/${userImg.name}`).put(userImg)
  .then((success)=>{
      success.ref.getDownloadURL()
      .then((url)=>{
          userImg=url
let userImgObj={
  userImg
}
          firebase.database().ref(`allusers/${userUid}/userImg/`)
          .set(userImg).then((success)=>{
              location.reload();
  
          })
          .catch((error)=>{
              console.log(error.message)
          })



      })
      .catch((error)=>{
          console.log(error.message)

      });

  })  .catch((error)=>{
      console.log(error.message)

  });
 

}























