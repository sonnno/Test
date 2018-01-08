cc.Class({
    extends: cc.Component,

    properties: {
     canvasNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

        Globals.scenes.currentScene=this.node;
    },
    on2GangBtnClick () {
        //移走自己
        Globals.utilsFunction.moveNode(Globals.scenes.currentScene,0.3,-1000,0);
        //移进创建游戏屏
        Globals.utilsFunction.moveNode(this.canvasNode.getChildByName("menuNode").getChildByName("btnNode"),0.3,-800,0);
        Globals.scenes.previousScene[Globals.scenes.previousSceneNum]=Globals.scenes.currentScene;
        Globals.scenes.currentScene=this.canvasNode.getChildByName("menuNode").getChildByName("btnNode");
        this.canvasNode.getChildByName("topBar").getChildByName("backBtn").active=true;

    },

    getOriginalPosion_x: function(){
        
                return Globals.position.switchGameNode_x;
    },
    getOriginalPosion_y: function(){
        
                return Globals.position.switchGameNode_y;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
