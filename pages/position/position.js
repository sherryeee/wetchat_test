var app = getApp();
Page({
    data:{
        keyWord:'',
        posList:[]
    },
    onLoad:function(option){
        var that = this;
        console.log(option)
        app.ajax({
            url:app.globalData.urls.searchResult,
            data:{
                'm.newSearch':true,
                'm.keyWord':option['m.keyword'],
                'm.kwType':option['m.kwType']
            },
            success:function(json){
               that.setData({
                   'keyWord':json.data.keyword,
                   'posList':json.data.posList
               })
            }
        })
    },
    intoDetail:function(e){
        var that = this;
        var posId = e.currentTarget.dataset.posid;
        wx.navigateTo({
            url:'../detail/detail?ref=search&m.posId='+posId + '&m.keyword=' + that.data.keyWord +"&action=next&from=search"
        })
  }
})