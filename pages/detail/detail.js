// pages/detail/detail.js
var app = getApp();
Page({
  data:{
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    keyword:'',
    posData:[],
    prePosId: 0,
    nextPosId: 0,
    current: 1,
    initPage: 0
  },
  isExist: function( id ) {
        var that = this
        var data = that.data.posData
        for( var i = 0, l = data.length;i < l;i++ ) {
            if( data[ i ].posId === id ) {
                return true
            }
        }
        return false
  },
  onLoad:function(options){
    var that = this;
    if( options.from === 'search' ) {
            that.getPositionDetail( options );
        } else{
             app.ajax({
                url: app.globalData.urls.posInfo,
                data: {
                    'm.posId': options['m.posId'],
                    'm.keyword': options['m.keyword']
                },
                success: function( json ) {
                    console.log( json )
                    var data = that.data.posData;
                    data.push( json.data )
                    that.setData( {
                        keyword: options.keyword,
                        posData: data
                    })
                },
                fail: function( e ) {
                    console.error( e )
                }
            })
        }
   
  },
   swiperChanged: function( e ) {
        var id = ''
        var that = this
        var data = that.data
        var action = ''
        if( e.detail.current < data.current ) {
            action = 'pre'
            id = data.posData[ data.current ].stepGetInfo ? data.posData[ data.current ].stepGetInfo.prePosId : 0
        } else if( e.detail.current > data.current ) {
            action = 'next'
            id = data.posData[ data.current ].stepGetInfo ? data.posData[ data.current ].stepGetInfo.nextPosId : 0
        } else {
            return true;
        }

        // var id = e.detail.current < ( data.current - 1 ) ? ( data.posData[ e.detail.current + 1 ] ? data.posData[ e.detail.current + 1 ].stepGetInfo.prePosId : 0 ) : ( data.posData[ e.detail.current - 1 ] ? data.posData[ e.detail.current - 1 ].stepGetInfo.nextPosId : 0 )
        // var action = e.detail.current < ( data.current - 1 ) ? 'pre' : 'next'
        if ( id > 0 ) {
            if( !that.isExist( id ) ) {
                that.getPositionDetail( {
                    'm.posId': id,
                    'action': action,
                    'm.keyword':data.keyword,
                    'reffer': 'swiper'
                })
            } else {
                if( action === 'pre' ) {
                    data.current = data.current - 1
                } else {
                    data.current = data.current + 1
                }
            }
        } else {
            if( action === 'pre' ) {
                data.current = data.current - 1
            } else {
                data.current = data.current + 1
            }
        }
    },
   getPositionDetail: function( parms ) {
        var that = this
        app.ajax( {
            url: app.globalData.urls.posInfo,
            data: {
                'action': parms.action,
                'm.posId': parms['m.posId'],
                'm.keyword': parms['m.keyword'],
                'm.isBidding': 0
            },
            success: function( json ) {
                console.log( json )
                var data = that.data.posData
                var isSwiper = parms.reffer === 'swiper'

                if( isSwiper ) {
                    if( parms.action === 'pre' ) {
                        data[ 0 ] = json.data
                        that.data.current = 0
                        if( json.data.stepGetInfo.prePosId > 0 ) {
                            that.data.current = 1
                            that.setData( {
                                posData: data,
                                keyword: parms.keyword,
                                initPage: 0,
                                current: that.data.current,
                                duration: 1000
                                // prePosId: json.data.stepGetInfo.prePosId,
                                // nextPosId: json.data.stepGetInfo.nextPosId
                            })
                            setTimeout(function(){
                                console.log('unshift')
                                data.unshift({})
                                that.setData({
                                    posData: data,
                                    initPage: 1,
                                    duration: 500
                                })
                            },500)
                            return true
                        }

                    } else {
                        data[ data.length - 1 ] = json.data
                        that.data.current = data.length - 1
                        if( json.data.stepGetInfo.nextPosId > 0 ) {
                            data.push( {})
                            that.data.current = data.length - 2
                        }

                    }
                    //  that.setData({
                    //   current: that.data.current
                    // })

                } else {
                    data.push( json.data )
                    if( json.data.stepGetInfo.prePosId > 0 ) {
                        that.data.initPage = 1
                        data.unshift( {})
                    }else{
                        that.data.current = 0;
                    }

                    if( json.data.stepGetInfo.nextPosId > 0 ) {
                        data.push( {})
                    }
                    // that.setData({
                    //   current: that.data.initPage
                    // })
                }
                 console.log('current',that.data.current)

                that.setData( {
                    posData: data,
                    keyword: parms.keyword,
                    initPage: that.data.current,
                    current:that.data.current,
                    duration: 1000
                    // prePosId: json.data.stepGetInfo.prePosId,
                    // nextPosId: json.data.stepGetInfo.nextPosId
                })


                console.log( that.data.posData )

                // setTimeout(function(){

                //     var data = that.data.posData;
                //     var cacheData = data[0]
                //     data.unshift( cacheData )
                //     that.setData({
                //         posData: data,
                //         current: 1
                //     })
                //     console.log(111)
                // },2000)
            },
            fail: function( e ) {
                console.error( e )
            }
        })
    },
  getPosData:function(opt){
      app.ajax({
                url: app.globalData.urls.posInfo,
                data: {
                    'm.posId': opt.posId,
                    'm.keyword':opt.keyword,
                    'action':opt.action,
                    'm.isBidding':opt.isBidding
                },
                success: function( json ) {
                    console.log( json )
                    var data = that.data.posData;
                    data.push( json.data )
                    that.setData( {
                        keyword: options.keyword,
                        posData: data
                    })
                },
                fail: function( e ) {
                    console.error( e )
                }
            })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})