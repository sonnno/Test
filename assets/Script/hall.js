cc.Class({
    extends: cc.Component,

    properties: {

        createRoomNode:cc.Node,
        joinRoomNode:cc.Node,
        menuNode:cc.Node,
        topBar:cc.Node,
        bottomBar:cc.Node,
        switchGameNode:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },

    init:function(){
        Globals.loginMgr.initOprationHandler();
        Globals.gameMgr.initOprationHandler();

        this.reWriteLoginServerCallback();
        this.reWriteGameServerCallback();

        Globals.gameMgr.net.closeWS();
    },
    start:function(){
        Globals.loginMgr.requestNoticeInfo();

    },


    reWriteLoginServerCallback: function () {
        var self = this;

        Globals.loginMgr.handleUserData = function (data) {//
            self.handleUserData(data);
        }

        Globals.loginMgr.handleNoticeInfo = function (data) {//
            self.handleNoticeInfo(data);
        }

        Globals.loginMgr.handleNoticeFinish = function (data) {//
            self.handleNoticeFinish(data);
        }

    },

    reWriteGameServerCallback: function () {
        var self = this;

        Globals.gameMgr.handleLoginFail = function (data) {//登陆失败
            self.handleLoginFail(data);
        }

        Globals.gameMgr.handleLoginFinish = function (data) {//登陆完成
            self.handleLoginFinish(data);
        }

        Globals.gameMgr.handleUserIn = function (data) {//用户进入
            self.handleUserIn(data);
        }

        Globals.gameMgr.handleUserStatusChange = function (data) {//用户状态改变
            self.handleUserStatusChange(data);
        }
    },

    handleLoginFail: function (data) {
        cc.find("utilsNode").getComponent("UtilsNode").hideLoadingNode();
    },
    handleLoginFinish: function (data) {

        this.goToGameScene();
    },
    handleUserIn: function (data) {

    },
    handleUserStatusChange: function (data) {
        // cc.find("utilsNode").getComponent("UtilsNode").hideLoadingNode();
        if (data.dwUserID == Globals.userInfo.userID) {
            if (data.UserStatus.wTableID != 65535) {
                this.goToGameScene();
            }
        }
    },

    handleUserData: function (data) {

    },

    handleNoticeInfo: function (data) {
        var noticeList = data.AnnouncementInfo.splice(0, data.dwAnnouncementCount);
    },

    handleNoticeFinish: function (data) {

    },


    goToGameScene: function () {
        cc.find("utilsNode").getComponent("utilsNode").hideLoadingNode();

            cc.director.preloadScene("twoEigth", function () {
                cc.director.loadScene("twoEigth");
            });
        
    },


    onCreateRoomClick: function () {
        //alert(1);

        //移进
        Globals.utilsFunction.moveNode(this.createRoomNode,0.3,0,0);
        //移出
        Globals.utilsFunction.moveNode(this.menuNode.getChildByName("btnNode"),0.3,-2000,0);
        Globals.scenes.currentScene=this.createRoomNode;
        Globals.scenes.previousScene[++Globals.scenes.previousSceneNum]=this.menuNode.getChildByName("btnNode");

        var eventHandler = new cc.Component.EventHandler();
        this.createRoomNode.getComponent("createRoomNode").switchDiFen(eventHandler,1);
        this.createRoomNode.getComponent("createRoomNode").switchJuShu(eventHandler,1);
        this.createRoomNode.getComponent("createRoomNode").switchFangFei(eventHandler,1);
        this.createRoomNode.getComponent("createRoomNode").switchMoShi(eventHandler,1);
        this.createRoomNode.getComponent("createRoomNode").switchRenShu(eventHandler,1);
      

    },

    onJoinRoomClick: function (){
       // var spawn = cc.spawn(cc.moveBy(0.5, 0, 50), cc.scaleTo(0.5, 0.8, 1.4));
 

        var spawn = cc.spawn(cc.scaleTo(0.3, 1, 1));
        this.joinRoomNode.runAction(spawn);
    },
    start: function (){
        //this.menuNode.getChildByName("btnNode").runAction(cc.moveTo(0.2, cc.p(0, 0)));
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
