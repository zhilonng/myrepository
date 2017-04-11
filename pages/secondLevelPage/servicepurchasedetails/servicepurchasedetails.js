// pages/secondLevelPage/servicepurchasedetails/servicepurchasedetails.js
Page({
  data:{
    id:0,//1为咨询服务，2为托管服务
    serviceName:'',//服务名称
    serviceClauseName:[],//服务条款名称
    serviceClauseContent:[],//服务条款内容
    detailsClauseName:[],//详情条款名称,
    detailsClauseImage:[],//详情条款图片
    drtailsClauseContent:[],//详情条款内容, 
    isAgreeProtocol:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    var that = this
    if(options.index == 1){
      //咨询服务
      that.data.serviceName = "家庭保险-咨询服务"
      //服务条款名称
      that.data.serviceClauseName.push("服务内容")
      that.data.serviceClauseName.push("服务形式")
      that.data.serviceClauseName.push("服务时间")
      //服务条款内容
      that.data.serviceClauseContent.push("咨询保险相关内容")
      that.data.serviceClauseContent.push("专家一对一微信咨询")
      that.data.serviceClauseContent.push("7天")
      //详情条款名称
      that.data.detailsClauseName.push("有问必答")
      that.data.detailsClauseName.push("认真建议")
      that.data.detailsClauseName.push("专业解释")
      //详情条款图片
      that.data.detailsClauseImage.push("../../images/icon_6.png")
      that.data.detailsClauseImage.push("../../images/icon_6.png")
      that.data.detailsClauseImage.push("../../images/icon_6.png")
      //详情条款内容
      that.data.drtailsClauseContent.push("在服务有效期间，您可以通过妈咪研究院的微信公众号，随时随地向我们咨询任何保险相关问题，不限数量，不限主题。在上班时间（周一至周五9:00-18:00），我们会即时回复您的问题。非上班时间的留言，我们上班后尽可能第一时间给予回复。")
       that.data.drtailsClauseContent.push("您也可以简单告诉我们您的家庭状况，我们会认真听，然后给出您和您家庭的保险配置大概方向。是的，一个正确的家庭保险配置方向，就可以避免大多数错误。")
        that.data.drtailsClauseContent.push("我们还会比较生动的解释清楚一些比较难懂保险专属概念，教你从根本角度来认识保险核心问题，是的，这是我们的专业和特长。")
    }
    that.setData({
      serviceName:that.data.serviceName,
      serviceClauseName:that.data.serviceClauseName,
      serviceClauseContent:that.data.serviceClauseContent,
      detailsClauseName:that.data.detailsClauseName,
      detailsClauseImage:that.data.detailsClauseImage,
      drtailsClauseContent:that.data.drtailsClauseContent,
    })
    console.log(that.data.serviceClauseContent)
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
  changeProtocolAgreement: function(){
    var that = this
    that.setData({
      isAgreeProtocol:!that.data.isAgreeProtocol
    })
  }
})