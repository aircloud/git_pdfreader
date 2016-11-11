/**
 * Created by Xiaotao.Nie on 8/11/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

var alluser = 0;
var alluserIndex=[];
var tempMyID;

module.exports={
  startSocket:function (socket) {

    socket.emit('open');

    socket.on('addUser',function(userNumber){
      alluserIndex.push(userNumber);
      console.log(alluserIndex);
      alluser++;
      socket.broadcast.emit('changeuser',JSON.stringify(alluserIndex));
      socket.emit('changeuser',JSON.stringify(alluserIndex));
    });

    socket.on('message',function(){
      console.log('server receive the message from client');
      socket.emit('test','serverready');
      // socket.setBroadcast('message',"readyready");
    });

    socket.on('wantContent',function(info){
      var tempInfo = JSON.parse(info);
      tempMyID=tempInfo.myID;
      socket.broadcast.emit('ensureID',tempInfo.getID);
    });

    socket.on('content',function(content){
      var sendContent = {
        content:content,
        ID:tempMyID
      };
      socket.broadcast.emit('sendContent',JSON.stringify(sendContent));
    });

    socket.on('removeUser',function(userNumber){
      console.log('alluserIndex.indexOf(userNumber)',alluserIndex.indexOf(userNumber));
      alluserIndex.splice(alluserIndex.indexOf(userNumber),1);
    });

    socket.on('disconnect',function(){
      console.log('disconnect');
      alluser--;
      socket.broadcast.emit('changeuser',JSON.stringify(alluserIndex));
      socket.emit('changeuser',JSON.stringify(alluserIndex));
    });

    var client = {
      socket: socket,
      name:false
    }
  }  
};