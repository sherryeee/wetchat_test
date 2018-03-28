//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    latestData: {},
    keyWType: '2',
    keyWTypeTxt:'全文',
    keyWord:'',
    keyBoxShow:false
  },
  onLoad: function(options) {
    console.log('index onLoad');
    var that = this;
    
  app.ajax({
      url: app.globalData.urls.latestPosition,
      success: function(json){
        that.setData({
          latestData:json.data
        })
        // success
      },
      fail: function(res) {
        console.log(res)
        // fail
      },
    })
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  //事件处理函数
  keyWTypeTap: function() {
    var that = this;
    var value = that.keyBoxShow ? false :true;
    this.setData({
      'keyBoxShow': value
    })
  },
  keyWTypeItemTap:function(e){
    this.setData({
      'keyBoxShow': false,
      'keyWType':e.target.dataset.value,
      'keyWTypeTxt': e.target.dataset.value === "0" ? "职位" : e.target.dataset.value === "1" ? "企业" : "全文"
    })
  },
  searchPosition:function(e){
    var keyword= e.detail.value['m.keyWord'];
    var that = this;
    that.setData({
      'keyWord':keyword
    })
    wx.navigateTo({
      url:'../position/position?m.newSearch=true&m.keyword='+that.data.keyWord + '&m.kwType=' + that.data.keyWType 
    })
  },
  intoDetail:function(e){
    var that = this;
    var posId = e.currentTarget.dataset.posid;
    wx.navigateTo({
        url:'../detail/detail?ref=search&m.posId='+posId + '&m.keyword=' + that.data.keyWord 
    })
  }
})
