var DataAdapter = require("DataAdapter");

var Net = cc.Class({
    properties: {
        ws:null,
        ip:"",
        port:"",
        name:"",
        dataAdapter:null
    },

    init:function(){
        this.dataAdapter=new DataAdapter();
        this.ws = null;
        this.ip = "";
        this.port = "";
        this.name = "";

    },
    setNetOption:function(ip,port,serverName){
        this.ip = ip;
        this.port = port;
        this.name = serverName;
    },
    sendData:function(data){

        if(!this.ws){
            return this.connect(data);
        }
        if(this.ws.readyState!=1){
            return this.connect(data);
        }
        data = this.modifyPackage(data);

        if(data.MainCmdID !=0){
            cc.log("sendPackage");
            cc.log(data);
        }
        data = this.dataAdapter.jsToJson(data);
        this.ws.send(data);
    },
    modifyPackage: function(data){
        data.cbDataKind = 2;
        data.cbCheckCode = 100;
        data.wPacketSize = 0;
        return data;
    },
    connect:function(data){
        var self = this;
        this.ws = new WebSocket("ws://"+this.ip+":"+this.port);
        this.ws.onopen=function(event){
            cc.log(self.name+"ws is opened");
            if(data){
                self.sendData(data);
            }
        };

        this.ws.onmessage = function(event){
            cc.log(self.name+"ws onmessage");
            var data = self.dataAdapter.jsonToJs(event.data);
            self.handleData(data);
        };

        this.ws.onclose = function(event){
            cc.log(self.name+"ws is closed");
            cc.log(event);
            self.handleClose();
        };
        this.ws.onerror = function(event){
            self.handleError();
        };
    },

    handleClose:function(){
        this.ws = null;
    },
    handleData:function(data){

    },
    handleError:function(){
        cc.log(self.name+"ws onerror");
        cc.log(event);
    },

    closeWS: function () {
        if (this.ws && this.ws.readyState == 1) {
            cc.find("utilsNode").getComponent("utilsNode").showLoadindNode();
            this.ws.close();
        } else {
            this.handleClose();
        }
    },

    handleClose: function () {

        this.ws = null;
        cc.find("utilsNode").getComponent("UtilsNode").hideLoadingNode();
    },


});

module.exports = Net;