var DataAdapter = cc.Class({
    jsonToJs:function(dataStr){
        return JSON.parse(dataStr);
    },
    jsToJson:function(data){
        return JSON.stringify(data);
    }
});

module.exports = DataAdapter;