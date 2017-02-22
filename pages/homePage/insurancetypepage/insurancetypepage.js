// pages/homePage/insurancetypepage/insurancetypepage.js
Page({
  data:{
    productInfo:[],
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
        productName:that.data.productName,
        productInfo:res.data
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
    var that = this
    var goods_id
    if(e.target.dataset.index != undefined){
      goods_id = e.target.dataset.index
    }
    if(e.currentTarget.dataset.index != undefined){
      goods_id = e.currentTarget.dataset.index
    }
      wx.navigateTo({
      url: '../homepage/homepage?goods_goods_type_id='+that.data.productInfo[goods_id].goods_type_id+"&goods_type_priceonly="+that.data.productInfo[goods_id].goods_type_priceonly,
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