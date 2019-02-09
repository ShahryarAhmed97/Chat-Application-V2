var config = {
    apiKey: "AIzaSyDCWvFCElwWQavpXGJ2jue4F-vtks4BOsw",
    authDomain: "shary-chat-app-v2.firebaseapp.com",
    databaseURL: "https://shary-chat-app-v2.firebaseio.com",
    projectId: "shary-chat-app-v2",
    storageBucket: "shary-chat-app-v2.appspot.com",
    messagingSenderId: "630326580670"
  };
  firebase.initializeApp(config);





























`
<div class="col-md-6" style='border: 2px solid white'>
<div class="col-md-4 text-center">
 <img src="${userObj.userImg}" class="imgMargin" alt="profilepic" id="profilepic" style="height:150px;">

 </div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="col-md-8">
 <div class="userInfo">
     <p><span class="bold">Email:</span> ${userObj.email}</p>
     <p><span class="bold">Name:</span> ${userObj.fullName}</p>
     <p><span class="bold">Gender:</span> ${userObj.gender}</p>
     <p><span class="bold">Gender:</span> ${userObj.gender}</p>

     <p><span class="bold">Contact No:</span> ${userObj.phNo}</p>
     <p><span class="bold">Blood Type:</span> ${userObj.bldGrpSlct}</p>
     <p><span class="bold">User Type:</span> ${userObj.dob}</p>
     <p><span class="bold">Address:</span> ${userObj.address}</p>
         
 </div>
</div>
</div>

<br><br><br>

`