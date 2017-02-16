// pages/homePage/insurancetypepage/insurancetypepage.js
Page({
  data:{
    productName:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.request({
    url: 'https://baby.mamid.cn/Caculate/Goods/getGoodsType', 
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      for(var i=0;i<res.data.length;i++){
        that.data.productName.push(res.data[i].goods_type_name)
      }
      that.setData({
        productName:that.data.productName
      })
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
  },
  turnIntoCaculaPage:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../homepage/homepage?',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})