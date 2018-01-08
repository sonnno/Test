var Net = require("NetWork");
var LoginMgr = cc.Class({
    extends: cc.Component,

    properties: {
        net:null,
    },


    // use this for initialization
    onLoad: function () {

    },
    init:function(){
        this.net=new Net();
        this.net.init();
        this.net.setNetOption(Globals.netInfo.loginIp,Globals.netInfo.loginPort,"loginServer");
        this.initOprationHandler();
        this.setDataHandler();
    },

    sendData: function(mci, sci, data){
        var packageData = this.buildPackage(mci,sci,data);
        this.net.sendData(packageData);
    },
    buildPackage: function(mci, sci, data){
        return {
        	cbDataKind:0,
        	cbCheckCode:0,
        	wPacketSize:0,
        	MainCmdID:mci,
        	SubCmdID:sci,
        	data:data            
        }
    },    

    
    requestLogin:function(accountName,password){

        cc.find("utilsNode").getComponent("utilsNode").showLoadingNode();
        // Globals.utilsFunction.showLoadingNode();
        // Globals.utilsFunction.showLoadingNode();
        var data = {
            dwPlazaVersion:101253123,
            szMachineID:"123123",
            szPassword:password,
            szAccounts:accountName,
            cbValidateFlags:2
        };       

        this.sendData(1,2,data);

    },

    requestNoticeInfo: function () {
        var data = {
            dwUserID: Globals.userInfo.userID,
        };

        this.sendData(3, 1265, data);
    },


    handleServerListData: function (data) {
        switch (data.SubCmdID) {
            case 104://severlist
                Globals.netInfo.gameServerList = data.array;
                break;

            default:
                cc.log("no use sumid" + data.SubCmdID);
                break;
        }
    },


    initOprationHandler: function(){
        //-----------广场登录-----------------
        this.handleLoginSuccess = function(data){};

        this.handleLoginFail = function(data){};

        this.handleLoginFinish = function(data){};

        this.handleLoginReplace = function(data){};
    },

    setDataHandler:function(){
        var self = this;
        this.net.handleData = function(data){
            if(data.MainCmdID != 0){
                cc.log("------------------登录服务器--------------------");
                cc.log(data);
            }
            switch(data.MainCmdID){
                case 0://心跳
                    self.handleBeatData(data);
                    break;
                case 1://登录
                    self.handleLoginData(data);
                    break;
                case 2://列表信息    
                    self.handleServerListData(data);
                    break;
                case 3://用户服务
                    self.handleUserServiceData(data);
                    break;
                default:
                    cc.log("no use maincmdid"+data.MainCmdID);
                    break;
            }
        }
    },

    handleBeatData: function(data){
        // if(data.SubCmdID == 1){
        //     this.sendBeatPacket();
        // }
    },    
    handleLoginData: function(data){
        var self = this;
        
        var info = {}
        if(data.array){
            info = data.array[0];
        }

        // Globals.utilsFunction.hideLoadingNode();
        switch(data.SubCmdID){
            case 100://login success
                this.handleLoginSuccess(info);
                break;
            case 101://login fail
                this.handleLoginFail(info);
                break;
            case 102: //login finish
                this.handleLoginFinish(info);
                break;
            case 105: //login replace
                this.handleLoginReplace(info);
                break;
            default:
                cc.log("no use sumid"+data.SubCmdID);
                break;

        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

module.exports = LoginMgr;