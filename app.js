//app.js
var prefix = 'http://192.168.61.126:8082'
App({
  onlaunch: function () {
    var that = this;
    var log = wx.getStorageSync('log') || [];
    console.log(log);
    console.log('app.onlanuch')
    // Do something initial when launch.
    wx.request({
      url: that.globalData.urls.init,
      success: function (json) {
        console.log(json);
        //that.globalData.jobcnpid = json.jobcnpid;
        //that.globalData.jcnid = json.JCNID;
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onShow: function () {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    urls: {
      init: prefix + '/touch/init_action.ujson',
      posInfo: prefix + '/touch/position/posInfo_action.ujson',
      searchResult: prefix + '/touch/search/result_action.ujson',
      latestPosition: prefix + '/search/recommendLastes4Home_action.ujson'
    },
    jcnid:"jcn22929115b62add35e0",
    jobcnpid:"246A8A6AB7D26BD93CA8A3C76E5FFAF2832119F6DA122F2A"
  },
  ajax:function(option){
    var that = this;
    wx.request({
      url:option.url,
      data:option.data,
      header:{
          'cookie':'JCNID=' + that.globalData.jcnid + ';jobcnpid=' + that.globalData.jobcnpid + ';'
      },
      success:option.success,
      fail:option.fail
    })
  }
})