// pages/homePage/servicepurchase/servicepurchase.js
Page({
  data:{
    triangleClass:'triangle-right',
    consuleClass:'insurance_service_consule'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  turnToDetails: function(ev){
    var that = this
    that.setData({
      consuleClass:'hover_insurance_service_consule',
      triangleClass:'triangle-right1'
    })
    setInterval(function(){
       that.setData({
      consuleClass:'insurance_service_consule',
      triangleClass:'triangle-right'
    })
},1000);
    wx.navigateTo({
      url: '../../secondLevelPage/servicepurchasedetails/servicepurchasedetails?index='+ev.currentTarget.dataset.index
    })
  }
})