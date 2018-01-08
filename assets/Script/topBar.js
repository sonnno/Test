cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },
    onBackBtnClick: function () {


        if( Globals.scenes.previousScene[Globals.scenes.previousSceneNum].name =="switchGameNode"){
            this.node.getChildByName("backBtn").active=false;
        }

     
        //移出
        Globals.utilsFunction.moveNode(Globals.scenes.currentScene,0.3,2000,0);
        var preSNode = Globals.scenes.previousScene[Globals.scenes.previousSceneNum];
        //移进
        Globals.utilsFunction.moveNode(preSNode,0.3,preSNode.getComponent(preSNode.name).getOriginalPosion_x(),preSNode.getComponent(preSNode.name).getOriginalPosion_y());
   
        Globals.scenes.currentScene=Globals.scenes.previousScene[Globals.scenes.previousSceneNum];
        if(Globals.scenes.previousSceneNum>0){
            Globals.scenes.previousSceneNum--;
        }
            
        

        
    }

    // called every frame, uncomment this function to activate update callback 
    // update: function (dt) {

    // },
});
