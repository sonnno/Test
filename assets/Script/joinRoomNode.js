

cc.Class({
    extends: cc.Component,

    properties: {
        numberBtnList: {
            default:[],
            type:cc.Button,
        },


    },


    // use this for initialization
    onLoad: function () {

        
    },
    inputNumber: function (event,numberType) {


     

        var labelName="numberLabel_";
        for(var i=0;i<this.numberBtnList.length;i++){
            if(i==numberType){
                //del
                if(i==10){
                    if(Globals.inputLength>0){
                        this.node.getChildByName(labelName+Globals.inputLength).getComponent(cc.Label).string="";
                        Globals.inputLength--;
                    }
                   
                }else if(i==11){ //clear
                    if(Globals.inputLength>0){
                        for(var j=Globals.inputLength;j>0;j--){
                            this.node.getChildByName(labelName+j).getComponent(cc.Label).string="";     
                        }
                        Globals.inputLength=0;
                    }
                   
                }else{
                    if(Globals.inputLength<6){
                        Globals.inputLength++;
                        this.node.getChildByName(labelName+Globals.inputLength).getComponent(cc.Label).string=i;
                    }
                    
                }
               
            }
        
        }
       parseInt(numberType)


    },

    onBgBtnClick: function(){

   
        this.node.runAction(cc.scaleTo(0.3,0,0));
        var eventHandler = new cc.Component.EventHandler();
        this.inputNumber(eventHandler,11);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
