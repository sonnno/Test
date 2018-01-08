cc.Class({
    extends: cc.Component,

    properties: {
        layout:cc.Node,
        prograss:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    update: function (dt) {
        if (this.prograss.active) {
            this.prograss.rotation = this.prograss.rotation - dt * 45;
        }
    },
    show: function(){

        this.resetNode();
        this.node.active = true;
        this.rotate();
    },
    resetNode:function(){
        //this.node.stopAllActions();
       // this.layout.active = false;
        //this.prograss.active = false;
    },
    rotate:function(){
       // alert(1);
    },
    hide:function(){
        this.node.stopAllActions();
        this.node.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
