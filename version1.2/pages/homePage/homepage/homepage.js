// pages/homePage/homepage/homepage.js
Page({
  data:{
    attributeName:['属性名1','属性名2','属性名3'],
    attributeValue:[
      ['男','女'],['男','女'],['2015-09-01','2017-09-01']
      ],
    attributeUnitType:[1,2,4],
    isShowException:false,
    exceptionInfo:"卡号格式不正确",
    attributeValueindex:[['','',''],['','',''],['','','']],
    userResult:[['tp_pressattributeValue','tp_attributeValue'],['tp_attributeValue','tp_attributeValue'],['2015-09-01']],
    areaid:[],
    secondareaid:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var that = this
    var list = [];
    //获取area一级目录，完成数据初始化
    wx.request({
    url: 'https://baby.mamid.cn/Caculate/Index/insProvince', 
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      for(var i=0;i<res.data.length;i++){
        list.push(res.data[i].area_areaname)
        that.data.areaid.push(res.data[i].area_id)
      }
      that.data.attributeName.push("投保人地区")
      that.data.attributeValue.push([])
      that.data.attributeValue[that.data.attributeValue.length-1].push(list)
      that.data.attributeUnitType.push(3)
      that.data.attributeValueindex.push(['','',''])
      that.setData({
        attributeName:that.data.attributeName,
        attributeValue:that.data.attributeValue,
        attributeUnitType:that.data.attributeUnitType,
        attributeValueindex:that.data.attributeValueindex
      })
      console.log(that.data.firstStageAtrribute)
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
  tpBtnPressHandler:function(e){
    var that = this
    for(var i=0;i<that.data.userResult[e.target.dataset.index].length;i++){
      if(i==e.target.dataset.btnindex){
        that.data.userResult[e.target.dataset.index].splice(i,1,"tp_pressattributeValue")
      }else{
        that.data.userResult[e.target.dataset.index].splice(i,1,"tp_attributeValue")
      }
    }
    that.setData({
      userResult:that.data.userResult
    })
  },
  // 一级目录数据修改与二级目录数据初始化
  evShowFirstStageAttribute:function(e){
    console.log(e)
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.data.attributeValueindex[e.target.dataset.index].splice(0,1,that.data.attributeValue[e.target.dataset.index][0][e.detail.value])
    that.data.attributeValueindex[e.target.dataset.index].splice(1,2,'')
    this.setData({
      attributeValueindex:that.data.attributeValueindex
    })
    //获取二级元素选项卡数据
    wx.request({
    url: 'https://baby.mamid.cn/Caculate/Index/insCity/parentId/'+that.data.areaid[e.detail.value], 
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      var list = []
      if(that.data.secondareaid.length != 0){
        that.data.secondareaid.splice(0,that.data.secondareaid.length)
      }
        for(var i=0;i<res.data.length;i++){
        list.push(res.data[i].area_areaname)
        that.data.secondareaid.push(res.data[i].area_id)
        }
        if(that.data.attributeValue[e.target.dataset.index].length == 1){
          that.data.attributeValue[e.target.dataset.index].push(list)
        }else{
          that.data.attributeValue[e.target.dataset.index].splice(1,1,list)
        }
        that.setData({
          attributeValue:that.data.attributeValue,
          secondareaid:that.data.secondareaid
        })
        console.log(that.data.secondareaid)
    }
    })
  },
  // 二级目录数据修改与三级目录数据初始化
   evShowSecondStageAttribute:function(e){
    //展开二级元素选项卡
    var that = this
    console.log(e.target.dataset.index)
    console.log(e.detail.value)
    console.log(that.data.attributeValueindex)
    console.log(that.data.attributeValue[e.target.dataset.index][1][e.detail.value])
    that.data.attributeValueindex[e.target.dataset.index].splice(1,1,that.data.attributeValue[e.target.dataset.index][1][e.detail.value])
    that.data.attributeValueindex[e.target.dataset.index].splice(2,1,'')
    this.setData({
      attributeValueindex:that.data.attributeValueindex
    })

    //获取三级元素选项卡数据
    wx.request({
    url: 'https://baby.mamid.cn/Caculate/Index/insCity/parentId/'+that.data.secondareaid[e.detail.value], 
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      var list = []
      for(var i=0;i<res.data.length;i++){
        list.push(res.data[i].area_areaname)
        }
        if(that.data.attributeValue[e.target.dataset.index].length == 2){
          that.data.attributeValue[e.target.dataset.index].push(list)
        }else{
          that.data.attributeValue[e.target.dataset.index].splice(2,1,list)
        }
        that.setData({
          attributeValue:that.data.attributeValue,
        })
    }
    })
  },
  // 三级目录数据修改
  evShowthirdStageAttribute:function(e){
    //展开三级元素选项卡
    var that = this
    console.log(e.target.dataset.index)
    console.log(e.detail.value)
    console.log(that.data.attributeValueindex)
    console.log(that.data.attributeValue[e.target.dataset.index][2][e.detail.value])
    that.data.attributeValueindex[e.target.dataset.index].splice(2,1,that.data.attributeValue[e.target.dataset.index][2][e.detail.value])
    this.setData({
      attributeValueindex:that.data.attributeValueindex
    })
  },
  bindDateChange:function(e){
    console.log(e)
    var that = this
    that.data.userResult[e.target.dataset.index].splice(0,1,e.detail.value)
    that.setData({
      userResult:that.data.userResult
    })
  }
})