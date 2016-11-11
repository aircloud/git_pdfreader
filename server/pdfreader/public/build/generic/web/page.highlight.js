/**
 * Created by Xiaotao.Nie on 5/11/2016.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

var viewer = document.getElementById('viewer');

console.log("pageHighlight",viewer);

var container = document.getElementById('outerContainer');
var menu = document.getElementById('menu');

var timeIsOut;

var noteDiv =document.getElementById('noteDiv');

var showMyNote = document.getElementById('showMyNote');

var allMyNote = document.getElementById('allMyNote');

var createNewNote = document.getElementById('createNewNote');

var newNoteValue = document.getElementById('newNoteValue');

function showMenu(evt) {
    // var evt = window.event || arguments[0];
    console.log("evt",evt);
    evt = evt.changedTouches ? evt.changedTouches[0] : evt;
    evt.clientX= evt.clientX||evt.pageX;
    evt.clientY= evt.clientY||evt.pageY;

    console.log("container",container.clientWidth,container.clientHeight,menu.offsetWidth, menu.offsetHeight, container.scrollLeft,container.scrollTop);
    console.log("evt",evt.clientX,evt.clientY);
    /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
    var rightedge = container.clientWidth-evt.clientX;
    var bottomedge = container.clientHeight-evt.clientY;
    /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
    if (rightedge < menu.offsetWidth)
        menu.style.left = container.scrollLeft + evt.clientX - menu.offsetWidth + "px";
    else
    /*否则，就定位菜单的左坐标为当前鼠标位置*/
        menu.style.left = container.scrollLeft + evt.clientX + "px";
    /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
    if (bottomedge < menu.offsetHeight)
        menu.style.top = container.scrollTop + evt.clientY - menu.offsetHeight + "px";
    else
    /*否则，就定位菜单的上坐标为当前鼠标位置*/
        menu.style.top = container.scrollTop + evt.clientY + "px";
    /*设置菜单可见*/
    menu.style.visibility = "visible";
    // LTEvent.addListener(menu,"contextmenu",LTEvent.cancelBubble);
}
/*隐藏菜单*/
function hideMenu() {
    menu.style.visibility = 'hidden';
}

function makeContextMenu(e){

    e.preventDefault();

    console.log("contextmenu",e.target);
    e.preventDefault();
    var toHighlight = document.getElementById('toHighlight');
    toHighlight.addEventListener('click',function(){
        console.log(e.target);
        console.log('e.target.nodeValue',e.target.firstChild.nodeType);
        if(e.target.firstChild.nodeType==3)
            e.target.classList.add('yellow');
    });

    showMenu(e);
}

function touchStartF(e){
    hideMenu();
    timeIsOut = window.setTimeout(makeContextMenu,290,e);
    console.log(timeIsOut);
}

function touchEndF(e){
    e.preventDefault();
    console.log("touchend");
    // makeContextMenu(e);
    window.clearTimeout(timeIsOut);
}

function stopPropaga(e) {
    e.stopPropagation();
}

document.addEventListener('click',function(e){
    hideMenu();
});
viewer.addEventListener('DOMSubtreeModified',function(e){
    // console.log("pageHighlight change",viewer.childNodes.item(0));
    for(var i = 0;i<viewer.childNodes.length;i++){
        // viewer.childNodes.item(i).removeEventListener("contextmenu",makeContextMenu,false);
        // viewer.childNodes.item(i).addEventListener("contextmenu",makeContextMenu,false);
        viewer.childNodes.item(i).addEventListener("touchstart",touchStartF,false);
        viewer.childNodes.item(i).addEventListener("touchmove",hideMenu,false);
        viewer.childNodes.item(i).addEventListener("touchend",touchEndF,false);
    }
});

noteDiv.addEventListener('touchmove',stopPropaga,false);
noteDiv.addEventListener('touchstart',stopPropaga,false);
noteDiv.addEventListener('touchend',stopPropaga,false);


//socket part
/************************/

var mySocket;
console.log(localStorage.getItem('allitems'));
var MYNOTENUMBER = localStorage.getItem('allitems')?localStorage.getItem('allitems'):0;
var myBeforeNote = [];

var allMyNoteUl = document.getElementById('allMyNoteUl');

var myNoteTemplateScript = document.getElementById('myNote');

var socketStarter = document.getElementById('socketStarter');

var userList = document.getElementById('userList');

var userLi = document.getElementById('userLi');

var someOneDataTemplateScript = document.getElementById('someoneNote');

var userData;

var someOneNoteDiv = document.getElementById('someOneNoteDiv');

function updateMyNote(){
    for(var ii = 0;ii<MYNOTENUMBER;ii++){
        myBeforeNote[ii]={};
        myBeforeNote[ii].info = localStorage.getItem('my'+ii);
        myBeforeNote[ii].num = localStorage.getItem('page'+ii);
        myBeforeNote[ii].time = localStorage.getItem('date'+ii);
    }

    console.log(JSON.stringify(myBeforeNote));

    var myNoteTemplate = _.template(myNoteTemplateScript.innerHTML);
    console.log('myNoteTemplateScript.innerHTML',myNoteTemplateScript.innerHTML);
    allMyNoteUl.innerHTML=myNoteTemplate(JSON.stringify(myBeforeNote));
}
updateMyNote();

var innerEditor = document.getElementById('pageNumber');

var ifSocketOpen=0;

var someOneData;

var myNoteIndex=Math.floor(Math.random()*1000000);

function newSocketClient(){
    mySocket=io.connect('pdf.10000h.top');
    ifSocketOpen=1;
    mySocket.on('open',function(){
        console.log('connected');
        mySocket.emit('addUser',myNoteIndex);
    });

    mySocket.on('changeuser',function(alluser){
        console.log('changeuser',alluser);
        alluser=JSON.parse(alluser);
        var userImg = [];
        for(var ii=0;ii<alluser.length;ii++){
            if(alluser[ii]!=myNoteIndex) {
                var jj = ii + 1;
                var tempUserData = {
                    image: "image/user" + jj + ".png",
                    id: alluser[ii]
                };
                userImg.push(tempUserData);
            }
        }
        console.log(JSON.stringify(userImg));
        userData=userImg;
        var userLiTemplate = _.template(userLi.innerHTML);
        console.log('userLi.innerHTML',userLi.innerHTML);
        console.log('userLiTemplate',userLiTemplate);
        userList.innerHTML=userLiTemplate(JSON.stringify(userData));
        userList.addEventListener('click',wantContent);
    });

    mySocket.on('test',function(json){
        console.log('message:',json);
    });

    mySocket.on('ensureID',function(ID){
        if(myNoteIndex==ID){
            mySocket.emit('content',JSON.stringify(myBeforeNote));
        }
    });

    mySocket.on('sendContent',function(sendContent){
        sendContent=JSON.parse(sendContent);
        if(myNoteIndex==sendContent.ID){
            //接受socket传来的笔记的全局代码

            someOneData = JSON.parse(sendContent.content);
            // console.log('someOneData',JSON.parse(someOneData));

            var someOneDataTemplate = _.template(someOneDataTemplateScript.innerHTML);

            //使用模版的时候为何要定义成全局变量?
            someOneNoteDiv.innerHTML=someOneDataTemplate(JSON.stringify(someOneData));

        }
    });
}

function clearSocketClient(){
    if(ifSocketOpen){
        mySocket.emit('removeUser',myNoteIndex);
        mySocket.close();
        ifSocketOpen=0;
    }
    userList.innerHTML=null;
}

function toggleMyNoteDiv(){
    someOneNoteDiv.style.visibility='hidden';
    if(allMyNote.style.visibility=='hidden')
        allMyNote.style.visibility='visible';
    else
        allMyNote.style.visibility='hidden';
}

function wantContent(e){

    if(someOneNoteDiv.style.visibility=='hidden') {
        someOneNoteDiv.style.visibility='visible';
        allMyNote.style.visibility='hidden';
        console.log("e.target.attributes.id", e.target.attributes.id, e.target.id);
        mySocket.emit('wantContent', JSON.stringify({myID: myNoteIndex, getID: e.target.id}));
    }
    else{
        someOneNoteDiv.style.visibility='hidden';
    }
}


function createMyNewNote(e){
    e.preventDefault();
    console.log(newNoteValue.value);
    console.log('innerEditor.value',innerEditor.value);
    var pageNumber = innerEditor.value;
    var nowDate = new Date();
    var noteDate = nowDate.getFullYear().toString()+"-"+(nowDate.getMonth()+1).toString()+"-"+nowDate.getDate().toString()+" "+nowDate.getHours().toString()+":"+nowDate.getSeconds().toString();

    if(newNoteValue.value){
        console.log("即将要在第",pageNumber,"页存储内容：",newNoteValue.value);
        //这里应该用html5本地存储
        localStorage.setItem('my'+MYNOTENUMBER,newNoteValue.value);
        localStorage.setItem('page'+MYNOTENUMBER,pageNumber);
        localStorage.setItem('date'+MYNOTENUMBER,noteDate);
        MYNOTENUMBER++;
        localStorage.allitems=MYNOTENUMBER;
        console.log(MYNOTENUMBER);
        updateMyNote();
    }
    return false;
}

showMyNote.addEventListener('click',toggleMyNoteDiv,false);
createNewNote.addEventListener('click',createMyNewNote,false);
socketStarter.addEventListener('click',function(e){
    if(socketStarter.innerHTML=="开启云协作"){
        newSocketClient();
        socketStarter.innerHTML='关闭云协作';
    }
    else{
        clearSocketClient();
        socketStarter.innerHTML='开启云协作';
    }
},false);
window.onbeforeunload=clearSocketClient;