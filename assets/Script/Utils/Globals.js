
window.GAME_OPTION = {
    TWO_EIGHT_ID:114,

};


window.Globals = {
    
    };

Globals.hall={};
Globals.utilsFunction={};
Globals.scenes={};
Globals.position={};

Globals.inputLength=0;
Globals.scenes.currentScene=new cc.Node();
Globals.scenes.previousScene=[];
Globals.scenes.previousSceneNum=0;

Globals.position.switchGameNode_x=0;
Globals.position.switchGameNode_y=0;
Globals.position.btnNode_x=-800;
Globals.position.btnNode_y=0;
Globals.position.createRoomNode_x=0;
Globals.position.createRoomNode_y=0;

Globals.utilsFunction.moveNode = function(node,speed,p_x,p_y){

    node.runAction(cc.moveTo(speed,cc.p(p_x,p_y)));
};
Globals.utilsFunction.bottomBarBackBtn = function(canvasNode,nextNode){
    //移除主node
    Globals.utilsFunction.moveNode(Globals.scenes.currentScene,0.3,-2000,0);
    //移除topBar
    Globals.utilsFunction.moveNode(canvasNode.getChildByName("topBar"),0.3,0,500);
     //移除bottomBar
    Globals.utilsFunction.moveNode(canvasNode.getChildByName("bottomBar"),0.3,0,-500);
    //移进friendNode
    Globals.utilsFunction.moveNode(nextNode,0.3,0,0);
};




Globals.netInfo = {
    loginIp:"192.168.0.152",
    loginPort:"10086",
    gameServerList:[],
};

Globals.userInfo = {
    account: "",
    password: "",
    nickName: "",
    userID:0,
    score: 0,
    rebate: 0,
    lLoseWinScore: 0,
    frozenScore: 0
};
// Globals.utilsFunction.moveNode = function(node,speed,p){
    
//         node.runAction(cc.moveTo(speed,p));
//     }