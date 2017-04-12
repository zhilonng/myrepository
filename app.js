//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
            success: function(res) {
            //获取用户code，转发到我们的服务器，再在我们服务器与微信交互，获取openid
                var code = res.code
                wx.getUserInfo({
                    success: function(userInfo) {
                      console.log(userInfo)
                        var encryptedData = userInfo.encryptedData
                        var iv = userInfo.iv
                        //我们服务器请求地址
                        var url ='https://baby.mamid.cn/Api/Index/login'
                        var userinfo = userInfo.userInfo
                        var username = userinfo.nickName
                        var useravatar =userinfo.avatarUrl
                        var usersex=userinfo.gender
                        wx.request({
                            url: url,
                            method: 'POST',
                            data: {
                                'iv':iv,
                                'encryptedData':encryptedData,
                                'code': code,
                                'username':username,
                                'useravatar':useravatar,
                                'usersex':usersex
                            },
                            header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
               success:function(response) {
               //数据交互成功后，我们将服务器返回的数据写入全局变量与缓存中
             console.log(response.data)
             if(response.data.babyres.length == 0){
               response.data.babyres.push({
                 baby_avatar:'https://oj76c7lts.qnssl.com/baby_default_img.png',
                 baby_birthday:"2017-03-01",
                 baby_name:"请添加宝宝",
                 baby_sex:"0",
                 baby_id:'0'
               })
             }
             //写入全局变量
             that.globalData.userInfo = response.data
             wx.hideToast()
            //写入后，我们将跳转到主页
            wx.redirectTo({
              url: '../index/index',
             })
          },
      failure: function(error) {
               console.log(error)
                            },
                        })
                    }
                })
            }
        })

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})