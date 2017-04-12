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
    switch(options.index){
      case "1":
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
          break;
        case "2":
          //咨询服务
          that.data.serviceName = "家庭保险-托管服务"
          //服务条款名称
          that.data.serviceClauseName.push("服务内容")
          that.data.serviceClauseName.push("服务形式")
          that.data.serviceClauseName.push("服务时间")
          //服务条款内容
          that.data.serviceClauseContent.push("家庭保险配置、托管和管理")
          that.data.serviceClauseContent.push("全家全程一体化服务")
          that.data.serviceClauseContent.push("365天")
          //详情条款名称
          that.data.detailsClauseName.push("方案定制")
          that.data.detailsClauseName.push("投保协助")
          that.data.detailsClauseName.push("理赔协助")
          that.data.detailsClauseName.push("有问必答")
          //详情条款图片
          that.data.detailsClauseImage.push("../../images/icon_6.png")
          that.data.detailsClauseImage.push("../../images/icon_6.png")
          that.data.detailsClauseImage.push("../../images/icon_6.png")
          that.data.detailsClauseImage.push("../../images/icon_6.png")
          //详情条款内容
          that.data.drtailsClauseContent.push("✔按照您及您家庭的各项指标综合规划保险配置；\n✔帮您梳理以及分析现有保单，给出保单处理意见；\n✔从众多保险公司的各种保险产品中，精选高性比产品，配置适合您的保险方案。")
          that.data.drtailsClauseContent.push("✔妈咪研究院提供一体化的投保协助；\n✔在多种投保渠道和投保方式中，提供更合适更方便的渠道和方式；\n✔帮您梳理健康告知情况，把关核保成功可能性，全程指导保单填写。\n")
            that.data.drtailsClauseContent.push("✔首先从源头避免理赔难度，帮您明确购买保险的目的，选择合适的保险产品搭配，清晰告知每份保险的保障能力；\n✔当保险出险时，您可以第一时间联系妈咪研究院，我们会全程协助您进行理赔。")
            that.data.drtailsClauseContent.push("托管服务包含了全年咨询服务。在一年服务有效期间，您可以通过妈咪研究院的微信公众号，随时随地向我们咨询任何保险相关问题，不限数量，不限主题。")
            break;
          default: break;
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
  },
  pay: function(){
    var that = this
    if(that.data.isAgreeProtocol == true){
      //同意协议
      wx.login({
        success: function(res) {
        //获取用户code，转发到我们的服务器，再在我们服务器与微信交互，获取openid
        var code = res.code
        wx.request({
          url:'https://baby.mamid.cn/Api/Index/paylogin',
          method: 'POST',
          data: {
          'code': code,                       
          },
          header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
          success:function(response) {
            //console.log(response.data)
            var openid=response.data
            var price=0.01;
            var goods_id=1;
            var goods_name='托管服务';
            var quantity=1;
            wx.request({
              url:'https://baby.mamid.cn/Api/Test/payJoinfee',
              method: 'POST',
              data: {
                  'openid': openid,
                  'price':price,
                  'goods_id':goods_id,
                  'goods_name':goods_name,
                  'quantity':quantity,
              },
              header: {
                   "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                console.log(res.data);
                console.log('调起支付');
                wx.requestPayment({
                'timeStamp': res.data.timeStamp,
                'nonceStr': res.data.nonceStr,
                'package': res.data.package,
                'signType': res.data.signType,
                'paySign': res.data.paySign,
                'success':function(res){
                console.log('success');
                wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 3000
                  });
                  },
                'fail':function(res){
                    console.log('fail');
                },
                'complete':function(res){
                    console.log('complete');
                        }
                    });
                },
              fail:function(res){
                  console.log(res.data)
              }
            })
            },
              failure: function(error) {
                      console.log(error)
              },
            })
          }
        })
    var timestamp = Date.parse(new Date());
    console.log(timestamp);return false; 
    wx.requestPayment({
        'timeStamp': timestamp,
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success':function(res){
        },
        'fail':function(res){
   }
   })
    }else{
      wx.showToast({
        title: '用户未同意《服务协议》',
        icon: 'loading',
        duration: 2000
      })
    }
  }
})