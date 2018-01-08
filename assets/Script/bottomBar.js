cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },
    onFriendBtnClick:function () {
        Globals.utilsFunction.bottomBarBackBtn(this.canvasNode,this.canvasNode.getChildByName("friendNode"));
        
    },
    onMallBtnClick: function() {

         Globals.utilsFunction.bottomBarBackBtn(this.canvasNode,this.canvasNode.getChildByName("shopNode"));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
