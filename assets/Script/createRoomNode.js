cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode:cc.Node,
        diFenBtnList: {
            default:[],
            type:cc.Button
        },
        juShuBtnList: {
            default:[],
            type:cc.Button
        },
        fangFeiBtnList: {
            default:[],
            type:cc.Button
        },
        moShiBtnList: {
            default:[],
            type:cc.Button
        },
        renShuBtnList: {
            default:[],
            type:cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {

    },
 

    switchDiFen: function (event,diFenType) {

        //alert(parseInt(diFenType));
        for(var i=1;i<=this.diFenBtnList.length; i++){
            if(i==parseInt(diFenType)){
                this.diFenBtnList[i-1].interactable = false;
            }else{
                this.diFenBtnList[i-1].interactable = true;
            }
        }
    },
    
    switchJuShu: function (event,juShuType) {

        for(var i=1; i<=this.juShuBtnList.length;i++){
            if(i==parseInt(juShuType)){
                this.juShuBtnList[i-1].interactable = false;
            }else{
                this.juShuBtnList[i-1].interactable = true;
            }
        }
    },
    switchFangFei: function (event,fangFeiType) {
        
                for(var i=1; i<=this.fangFeiBtnList.length;i++){
                    if(i==parseInt(fangFeiType)){
                        this.fangFeiBtnList[i-1].interactable = false;
                    }else{
                        this.fangFeiBtnList[i-1].interactable = true;
                    }
                }
    },
    switchMoShi: function (event,moShiType) {
        
                for(var i=1; i<=this.moShiBtnList.length;i++){
                    if(i==parseInt(moShiType)){
                        this.moShiBtnList[i-1].interactable = false;
                    }else{
                        this.moShiBtnList[i-1].interactable = true;
                    }
                }
     },
     switchRenShu: function (event,renShuType) {
        
                for(var i=1; i<=this.renShuBtnList.length;i++){
                    if(i==parseInt(renShuType)){
                        this.renShuBtnList[i-1].interactable = false;
                    }else{
                        this.renShuBtnList[i-1].interactable = true;
                    }
          
                }
    },

    getOriginalPosion_x: function(){

        return Globals.position.createRoomNode_x;
    },

    getOriginalPosion_y: function(){
        
                return Globals.position.createRoomNode_y;
    },
    onCloseBtnClick (){
        alert(1);
    },
    //创建游戏进入
    onCreateRoomBtnClick(){
        
        cc.find("utilsNode").getComponent("utilsNode").showLoadingNode();

        for(var i=0;i<Globals.netInfo.gameServerList.length;i++){
            var serverData = Globals.netInfo.gameServerList[i];
            if(serverData.wKindID == GAME_OPTION.TWO_EIGHT_ID){
                var ip = serverData.szServerAddr;
                var port = serverData.wServerPort;
                Globals.GameMgr.net.setNetOption(ip, port, "tLgame");

                Globals.GameMgr.requestLogin();
                break;
            }
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
