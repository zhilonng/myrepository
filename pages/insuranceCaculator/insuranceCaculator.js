// pages/insuranceCaculator/insuranceCaculator.js
var common = require('../template/common.js')

Page({
  data:{
    goods_type_id:'',
    productName:'',
    goods_type_priceonly:"",
    lastResult:{},
    productInfo:[],
    attributeName:[],
    attributeValue:[],
    attributeUnitType:[],
    isShowException:false,
    exceptionInfo:"卡号格式不正确",
    attributeValueindex:[],
    userResult:[],
    areaid:[],
    secondareaid:[],
    caculateResult:'',
  },
  onLoad:function(options){
    // console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
// 获取保险参数并完成初始化
    wx.request({
    url: 'https://baby.mamid.cn/Caculate/Goods/getGoods/goods_goods_type_id/'+options.goods_goods_type_id, 
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      // console.log(res.data)
      that.data.caculateResult = res.data.defaultPrice
      var length = 0
      for(var js2 in res.data){
        length++;
      }
      for(var i=0;i<length-2;i++){
        if(res.data[i]==undefined){length++}else{
        var attributeValueindexList =[] //attributeValueindex初始化
        var firstCatalogList = [];
        // 方格式布局
        if(res.data[i].attributeUnitType == 1){
          for(var j=0;j<res.data[i].attributeValue.length;j++){
            if(res.data[i].attributeValue[j] == res.data[i].default){
              attributeValueindexList.push("tp_pressattributeValue")
            }else{
            attributeValueindexList.push("tp_attributeValue")
            }
          }
        }
        //radio
        if(res.data[i].attributeUnitType == 2){
          for(var j=0;j<res.data[i].attributeValue.length;j++){
            if(res.data[i].attributeValue[j]==res.data[i].default){
              attributeValueindexList.push(j)
            }
          }
        }
        // 普通选择器
        if(res.data[i].attributeUnitType == 6){
          for(var j=0;j<res.data[i].attributeValue.length;j++){
              attributeValueindexList.push(res.data[i].default)
          }
        }
        // 地区选择器
        if(res.data[i].attributeUnitType ==3){
          //获取area一级目录，完成数据初始化
        wx.request({
        url: 'https://baby.mamid.cn/Caculate/Index/insProvince', 
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          // console.log(res.data)
        }
        })
        }
        
        // 时间选择器
        if(res.data[i].attributeUnitType == 4){
          var today = new Date()
          var startTime = new Date(today.valueOf()-res.data[i].attributeValue[1]*24*60*60*1000)
          var endTime = new Date(today.valueOf()-res.data[i].attributeValue[0]*24*60*60*1000)
          startTime = startTime.getFullYear()+"-"+(startTime.getMonth()+1)+"-"+startTime.getDate()
          endTime = endTime.getFullYear()+"-"+(endTime.getMonth()+1)+"-"+endTime.getDate()
          res.data[i].attributeValue.splice(0,1,startTime)
          res.data[i].attributeValue.splice(1,1,endTime)
          attributeValueindexList.push(res.data[i].default)
        }
        //label
        if(res.data[i].attributeUnitType == 5){
          attributeValueindexList.push(res.data[i].attributeValue)
        }
        that.data.attributeValue.push(res.data[i].attributeValue)
        that.data.userResult.push(attributeValueindexList)
        that.data.attributeName.push(res.data[i].attributeName)
        that.data.attributeUnitType.push(res.data[i].attributeUnitType)
      }
      }
      that.setData({
        goods_type_id:options.goods_goods_type_id,
        productName:options.goods_type_name,
        productInfo:res.data,
        attributeName:that.data.attributeName,
        attributeUnitType:that.data.attributeUnitType,
        attributeValue:that.data.attributeValue,
        userResult:that.data.userResult,
        caculateResult:res.data.defaultPrice,
        goods_type_priceonly:options.goods_type_priceonly
      })
      // console.log(that.data.attributeValue)
    }
    })

    // var list = [];
  //   //获取area一级目录，完成数据初始化
  //   wx.request({
  //   url: 'https://baby.mamid.cn/Caculate/Index/insProvince', 
  //   header: {
  //       'content-type': 'application/json'
  //   },
  //   success: function(res) {
  //     console.log(res.data)
  //     for(var i=0;i<res.data.length;i++){
  //       list.push(res.data[i].area_areaname)
  //       that.data.areaid.push(res.data[i].area_id)
  //     }
  //     that.data.attributeName.push("投保人地区")
  //     that.data.attributeValue.push([])
  //     that.data.attributeValue[that.data.attributeValue.length-1].push(list)
  //     that.data.attributeUnitType.push(3)
  //     that.data.attributeValueindex.push(['','',''])
  //     that.setData({
  //       attributeName:that.data.attributeName,
  //       attributeValue:that.data.attributeValue,
  //       attributeUnitType:that.data.attributeUnitType,
  //       attributeValueindex:that.data.attributeValueindex
  //     })
  //     console.log(that.data.firstStageAtrribute)
  //   }
  // })
  
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
  // 方格布局点击事件
  tpBtnPressHandler:function(e){

    common.showDialog()

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

    // 刷新价格
    var result = common.getUserResult(that.data.productInfo,that.data.userResult,that.data.lastResult,that.data.goods_type_priceonly)
    console.log(JSON.stringify(result))
    if(JSON.stringify(result).indexOf('.') == -1){wx.hideToast()}else{
    wx.request({
      url: 'https://baby.mamid.cn/Caculate/Goods/orderTrial',
      header: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
      data: {
          result:JSON.stringify(result)
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        // console.log(res.data)
        var newUserResult = common.reviseData(res.data,that.data.userResult,that.data.attributeName,that.data.productInfo)
        that.setData({
        lastResult:result,
        caculateResult:res.data.defaultPrice,
        userResult:newUserResult
      })
         wx.hideToast()
      },
    })
    }
  },
  // 一级目录数据修改与二级目录数据初始化
  evShowFirstStageAttribute:function(e){
    // console.log(e)
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
  // 时间选择器日期改变事件
  bindDateChange:function(e){
    console.log(e)
    common.showDialog()
    var that = this
    that.data.userResult[e.target.dataset.index].splice(0,1,e.detail.value)
    that.setData({
      userResult:that.data.userResult
    })

    // 刷新价格
    var result = common.getUserResult(that.data.productInfo,that.data.userResult,that.data.lastResult,that.data.goods_type_priceonly)
    if(JSON.stringify(result).indexOf('.') == -1){wx.hideToast()}else{
    wx.request({
      url: 'https://baby.mamid.cn/Caculate/Goods/orderTrial',
      header: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
      data: {
          result:JSON.stringify(result)
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)
        var newUserResult = common.reviseData(res.data,that.data.userResult,that.data.attributeName,that.data.productInfo)
        that.setData({
        lastResult:result,
        caculateResult:res.data.defaultPrice,
        userResult:newUserResult
      })
        wx.hideToast()
      },
    })
    }
  },
  // radio点击事件
  radioClickHandler:function(e){
    console.log(e)
    var that = this
    common.showDialog()
    that.data.userResult[e.target.dataset.index].splice(0,1,e.target.dataset.rdindex)
    that.setData({
      userResult:that.data.userResult
    })
    // 刷新价格
    var result = common.getUserResult(that.data.productInfo,that.data.userResult,that.data.lastResult,that.data.goods_type_priceonly)
    console.log(result)
    if(JSON.stringify(result).indexOf('.') == -1){wx.hideToast()}else{
    wx.request({
      url: 'https://baby.mamid.cn/Caculate/Goods/orderTrial',
      header: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
      data: {
          result:JSON.stringify(result)
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)

       var b = common.revisePremium(res.data,that.data.productInfo,that.data.attributeValue,that.data.userResult)

        var newUserResult = common.reviseData(res.data,b[2],that.data.attributeName,b[0])
        that.setData({
        lastResult:result,
        caculateResult:res.data.defaultPrice,
        userResult:newUserResult,
        productInfo:b[0],
        attributeValue:b[1]
      })
        wx.hideToast()
       },
    })
    }
  },
  // 普通选择器
  bindPickerChange:function(e){
    // console.log(e)
    var that = this
    common.showDialog()
    var number = that.data.attributeValue[e.target.dataset.pkindex][e.detail.value]
     that.data.userResult[e.target.dataset.pkindex].splice(0,1,number)
     that.setData({
       userResult:that.data.userResult
     })

     // 刷新价格
    var result = common.getUserResult(that.data.productInfo,that.data.userResult,that.data.lastResult,that.data.goods_type_priceonly)
    // console.log(result)
    if(JSON.stringify(result).indexOf('.') == -1){wx.hideToast()}else{
    wx.request({
      url: 'https://baby.mamid.cn/Caculate/Goods/orderTrial',
      header: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
      data: {
          result:JSON.stringify(result)
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        // console.log(res.data)
        var newUserResult = common.reviseData(res.data,that.data.userResult,that.data.attributeName,that.data.productInfo)
        that.setData({
        lastResult:result,
        caculateResult:res.data.defaultPrice,
        userResult:newUserResult
      })
        wx.hideToast()
      },
    })
    }
  },
  // 点击计算事件
  resultCaculateHandle:function(){
    
  },
  //分享
  onShareAppMessage: function () {
    var that = this
    return {
      title: '保费计算-'+that.data.productName,
      path: '/pages/insuranceCaculator/insuranceCaculator?goods_goods_type_id='+that.data.goods_type_id+"&goods_type_priceonly="+that.data.goods_type_priceonly+"&goods_type_name="+that.data.productName
    }
  }

})