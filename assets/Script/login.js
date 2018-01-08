cc.Class({
    extends: cc.Component,

    properties: {
        accountEbox:cc.EditBox,
        passwordEbox:cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {
        this.init();
       
    },
    init:function(){

        Globals.LoginMgr.initOprationHandler();
        this.reWriteLoginServerCallBack();
    
    },
    onLoginBtnClick: function() {
        var accountName = this.accountEbox.string;
        var password = this.passwordEbox.string;
        Globals.LoginMgr.requestLogin(accountName,password);
        
    },

    reWriteLoginServerCallBack:function(){
        var self = this;
        
        Globals.LoginMgr.handleLoginSuccess = function(data){
            self.handleLoginSuccess(data);      
        };
        Globals.LoginMgr.handleLoginFail = function(data){//登陆失败
            self.handleLoginFail(data);
        };

        Globals.LoginMgr.handleLoginFinish = function(data){//登陆完成
            self.handleLoginFinish(data);                
        };
    },
    handleLoginSuccess:function(data){
        cc.log("登录成功");
        Globals.userInfo.account = data.szAccounts;
        Globals.userInfo.password = this.passwordEBox.string;
        Globals.userInfo.nickName = data.szNickName;
        Globals.userInfo.userID = data.dwUserID;
        Globals.userInfo.score = data.lUserScore;
        Globals.userInfo.rebate = data.dbCommissionScale;

        cc.sys.localStorage.setItem("account", data.szAccounts);
        cc.sys.localStorage.setItem("password", this.passwordEBox.string);
    },
    handleLoginFinish:function(data){
        cc.log("登录完成");
        
        cc.find("utilsNode").getComponent("utilsNode").hideLoadingNode();
        this.goToStartScene();
    },
    handleLoginFail:function(data){
            
        cc.log("登录失败");
        cc.find("utilsNode").getComponent("utilsNode").hideLoadingNode();
        
    },
    goToStartScene: function(){
        cc.director.preloadScene("start",function(){
            cc.director.loadScene("start");
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
