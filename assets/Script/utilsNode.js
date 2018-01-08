cc.Class({
    extends: cc.Component,

    properties: {
        loadingNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
    },

    showLoadingNode: function() {

        this.loadingNode.getComponent("loadingNode").show();

    },
    
    hideLoadingNode:function(){
        this.loadingNode.getComponent("loadingNode").hide();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
