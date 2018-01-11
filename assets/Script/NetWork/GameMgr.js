var Net = require("NetWork");
var GameMgr = cc.Class({
    properties: {
        net: null,
    },

    init: function(){
        this.net = new Net();
        this.net.init();
        this.initOprationHandler();
        this.setDataHandler();
    },
    sendData: function (mci, sci, data) {
        var packageData = this.buildPackage(mci, sci, data);

        this.net.sendData(packageData);
    },

    buildPackage: function (mci, sci, data) {
        return {
            cbDataKind: 0,
            cbCheckCode: 0,
            wPacketSize: 0,
            MainCmdID: mci,
            SubCmdID: sci,
            data: data
        }
    },    


    requestLogin: function () {

        var data = {
            dwPlazaVersion: 101253123,
            dwFrameVersion: 101056515,
            dwProcessVersion: 101056515,
            dwUserID: parseInt(Globals.userInfo.userID),
            szPassword: Globals.userInfo.password,
            szMachineID: "123123",
            wKindID: 105
        };

        this.sendData(1, 1, data);
    },


    initOprationHandler:function(){
        //登录
        this.handleLoginFail = function(data){};

        this.handleLoginFinish = function(data){};

        this.handleUserIn = function(data){};

        this.handleUserStatusChange = function(data){};

        //框架命令
        this.handleGameBaseSceneData = function (data) { };
        //游戏命令
        this.handleGameStatusInfo = function (data) { };

        this.handleGameResultInfo = function (data) { };

        this.handleBetResultInfo = function (data) { };
    },

    //接收消息处理
    setDataHandler: function(){
        var self = this;
        this.net.handleData = function(data){
            if(data.MainCmdID != 0){
                cc.log("this is game server");
                cc.log(data);
            }

            switch(data.MainCmdID){
                case 0:// 心跳
                    self.handleBeatData(data);
                    break;
                case 1://login
                    self.handleLoginData(data);
                    break;

                case 2://配置信息  
                    break;

                case 3://用户命令    
                    self.handleUserData(data);
                    break;
                // case 4://状态命令
                //     self.handleStatusData(data);
                //     break;
                case 100://框架命令
                    self.handleFrameData(data);
                    break;

                case 200://游戏命令    
                    self.handleGameData(data);
                    break;

                default:
                    cc.log("unuse maincmdid" + data.MainCmdID);
                    break;    
            }
        }
    },

    handleBeatData: function (data) {
        // if(data.SubCmdID == 1){
        //     this.sendBeatPacket();
        // }
    },

    handleLoginData: function (data) {
        //登陆命令1
        var self = this;

        var info = {}

        if (data.array) {
            info = data.array[0];
        }

        switch (data.SubCmdID) {
            case 101://登陆失败
                self.handleLoginFail(info);
                break;
            case 102://登陆完成
                self.handleLoginFinish(info);
                break;

            default:
                cc.log("unuse SubCmdID" + data.SubCmdID);
                break;
        }
    },
    handleUserData: function (data) {
        //用户命令 3
        var self = this;

        var info = {}

        if (data.array) {
            info = data.array[0];
        }

        switch (data.SubCmdID) {
            case 100://用户进入
                self.handleUserIn(info);
                break;
            case 102://用户状态改变
                self.handleUserStatusChange(info);
                break;
            default:
                cc.log("unuse SubCmdID" + data.SubCmdID);
                break;
        }
    },

    handleFrameData: function (data) {
        //框架命令100
        var self = this;

        var info = {}

        if (data.array) {
            info = data.array[0];
        }

        switch (data.SubCmdID) {
            // case 200://系统消息
            //     self.handleSysInfoData(info);
            case 300://游戏场景基础ID
                self.handleGameBaseSceneData(info);
                break;
            // case 400://重连游戏数据信息
            //     self.handleGameResumeData(info);
            //     break;
            default:
                cc.log("unuse SubCmdID" + data.SubCmdID);
                break;
        }
    },

    handleGameData: function (data) {
        //游戏命令  200
        var self = this;

        var info = {}

        if (data.array) {
            info = data.array[0];
        }

        switch (data.SubCmdID) {
            case 100: //游戏状态信息
                self.handleGameStatusInfo(info);
                break;
            case 101: //开奖结果
                self.handleGameResultInfo(info);
                break;
            case 102: //投注结果
                self.handleBetResultInfo(info);
                break;
            default:
                cc.log("unuse SubCmdID" + data.SubCmdID);
                break;
        }

    },
});

module.exports = GameMgr;
