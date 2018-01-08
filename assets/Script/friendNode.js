cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    onBackBtnClick () {
        //移除自己
        Globals.utilsFunction.moveNode(this.node,0.3,2000,0);
        //移进topBar
        Globals.utilsFunction.moveNode(this.canvasNode.getChildByName("topBar"),0.3,0,320);
        //移进bottomBar
        Globals.utilsFunction.moveNode(this.canvasNode.getChildByName("bottomBar"),0.3,0,-321);
        
        //移进CurrentScene
        var curS = Globals.scenes.currentScene;
        Globals.utilsFunction.moveNode(curS,0.3,curS.getComponent(curS.name).getOriginalPosion_x(),curS.getComponent(curS.name).getOriginalPosion_y());
        
      
        

    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
