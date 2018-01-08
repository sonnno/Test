cc.Class({
    extends: cc.Component,

    properties: {
        btnList:{
            default:[],
            type:cc.Button
        },
        canvasNode:cc.Node
    },

    // use this for initialization
    onLoad: function () {

    },

    switchBtn: function (event,btnType) {
        for(var i=1;i<=this.btnList.length; i++){
            if(i==parseInt(btnType)){
                this.btnList[i-1].interactable = false;
            }else{
                this.btnList[i-1].interactable = true;
            }
        }
    },
    onGameGoldBtnClick: function (){
        //自己zoom
   
        cc.sequence(this.node.getChildByName("shopListBtn").runAction(cc.scaleTo(0.1,1.2)),this.node.getChildByName("shopListBtn").runAction(cc.scaleTo(0.1,1)));
    },
    onGameBeanBtnClick: function (){
        //自己zoom
    
        cc.sequence(this.node.getChildByName("beanListBtn").runAction(cc.scaleTo(0.1,1.2)),this.node.getChildByName("beanListBtn").runAction(cc.scaleTo(0.1,1)));
    },

    onbackBtnClick:function(){

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
