// pages/homePage/insurancehomepage/insurancehomepage.js
var common = require('../../template/common.js')
//获取应用实例  
var app = getApp()  
Page( {  
  data: {  
    /** 
        * 页面配置 
        */  
    casusalHeight:0,
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    productInfo:[],
    productName:[],
    insuranceClassify_name:[],
    insuranceClassify_info:[],
    insuranceCompany_name:[],
    insuranceCompany_info:[],
  },  
  onLoad: function() {  
    var that = this;  
    // 页面初始化 options为页面跳转所带来的参数
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
        productInfo:res.data,
        winHeight: (res.data.length+1)*128+34,
        casusalHeight:(res.data.length+1)*128+34
      })
    }
    })
  
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo({
      success: function(res){  
        that.setData({
          winWidth: res.windowWidth,   
        });  
      }  
    });  
  },  
  /** 
     * 滑动切换tab 
     */  
  bindChange: function(e){  
  
    var that = this;  
    that.setData({currentTab: e.detail.current});  

   if(e.detail.current == 0){
     that.setData({
       winHeight:that.data.casusalHeight
     })
   }
    if(e.detail.current == 1 && that.data.insuranceClassify_name.length == 0){
      common.showDialog()
      var that = this;  
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
  url:'https://baby.mamid.cn/Caculate/Product/goodsCategory', 
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      that.data.insuranceClassify_name.splice(0,that.data.insuranceClassify_name.length)
      for(var i=0;i<res.data.length;i++){
        that.data.insuranceClassify_name.push(res.data[i].category_name)
      }
      console.log("length:"+res.data.length)
      that.setData({
      insuranceClassify_name:that.data.insuranceClassify_name,
      insuranceClassify_info:res.data,
      winHeight: (res.data.length)*110+34
      })
      wx.hideToast()
    }
    })
    }

    if(e.detail.current == 2 && that.data.insuranceCompany_name.length == 0){
      common.showDialog()
      var that = this;  
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
  url:'https://baby.mamid.cn/Caculate/Product/goodsCompany', 
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
      that.data.insuranceCompany_name.splice(0,that.data.insuranceCompany_name.length)
      for(var i=0;i<res.data.length;i++){
        that.data.insuranceCompany_name.push(res.data[i].company_name)
      }
      console.log("length:"+res.data.length)
      that.setData({
      insuranceCompany_name:that.data.insuranceCompany_name,
      insuranceCompany_info:res.data,
      winHeight: (res.data.length)*102+34
      })
      wx.hideToast()
    }
    })
    }
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function(e){  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })
  //     if(e.detail.current == 1 && that.data.insuranceClassify_name.length == 0){
  //       common.showDialog()
  //     var that = this;  
  //   // 页面初始化 options为页面跳转所带来的参数
  //   wx.request({
  // url:'https://baby.mamid.cn/Caculate/Product/goodsCategory', 
  //   header: {
  //       'content-type': 'application/json'
  //   },
  //   success: function(res) {
  //     console.log(res.data)
  //     that.data.insuranceClassify_name.splice(0,that.data.insuranceClassify_name.length)
  //     for(var i=0;i<res.data.length;i++){
  //       that.data.insuranceClassify_name.push(res.data[i].category_name)
  //     }
  //     that.setData({
  //     insuranceClassify_name:that.data.insuranceClassify_name,
  //     insuranceClassify_info:res.data
  //     })
  //     wx.hideToast()
  //   }
  //   })
  //   }
        
    }  
  },
  // 跳转到保费计算界面
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
      url: '../../insuranceCaculator/insuranceCaculator?goods_goods_type_id='+that.data.productInfo[goods_id].goods_type_id+"&goods_type_priceonly="+that.data.productInfo[goods_id].goods_type_priceonly+"&goods_type_name="+that.data.productInfo[goods_id].goods_type_name,
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
  },
    /**
     *跳转二级页面insuranceClassifyList **/
 turnToInsuranceClassify:function(e){
   var that = this
   var index=0
   if(that.data.currentTab==1){
    index= that.data.insuranceClassify_info[e.currentTarget.dataset.index].category_id
   }else{
     index = that.data.insuranceCompany_info[e.currentTarget.dataset.index].company_id
   }
   wx.navigateTo({
     url: '../../secondLevelPage/insuranceClassifyList/insuranceClassifyList?index='+index+"&currentTab="+that.data.currentTab,
     success: function(res){
       // success
     },
   })
 }
})  