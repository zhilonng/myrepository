// common.js
// 获取用户保险数据并封装为result对象
function getUserResult(productInfo,userResult,lastResult,goods_type_priceonly) {
//     console.log("=================")
//   console.log(productInfo)
//   console.log(userResult)
//   console.log(lastResult)
//   console.log(goods_type_priceonly)
  var result ={}
  var length = 0
  var newProductInfo = []
  for(var js2 in productInfo){
    length++;
 }
 var length2 = length
 for(var k=0;k<length2-1;k++){
     if(productInfo[k] == undefined){length2++}else{
     newProductInfo.push(productInfo[k])
     }
 }
 for(var i=0;i<length-1;i++){
         //方格类型
         if(newProductInfo[i].attributeUnitType == 1){
             for(var j=0;j<userResult[i].length;j++){
                 if(userResult[i][j] == "tp_pressattributeValue"){
                     if(isEmptyObject(lastResult)){
                        if(newProductInfo[i].attributeValue[j] != newProductInfo[i].default){
                result[newProductInfo[i].name] = newProductInfo[i].attributeValue[j]
                result["."+newProductInfo[i].name]=newProductInfo[i].default
                     }else{
                result[newProductInfo[i].name]=newProductInfo[i].attributeValue[j]
                     }
                     }else{
                         if(lastResult["."+newProductInfo[i].name] ==undefined){
                         if(newProductInfo[i].attributeValue[j] != lastResult[newProductInfo[i].name]){
                result[newProductInfo[i].name] = newProductInfo[i].attributeValue[j]
                result["."+newProductInfo[i].name]=lastResult[newProductInfo[i].name]
                     }else{
                result[newProductInfo[i].name]=newProductInfo[i].attributeValue[j]
                     }
                     }else{
                         if(newProductInfo[i].attributeValue[j] != lastResult[newProductInfo[i].name]){
                result[newProductInfo[i].name] = newProductInfo[i].attributeValue[j]
                result["."+newProductInfo[i].name]=lastResult[newProductInfo[i].name]
                     }else{
                result[newProductInfo[i].name]=newProductInfo[i].attributeValue[j]
                     }
                     }
                     }
                     if(newProductInfo[i].name == "insureAgeLimit"){
                         console.log(typeof(newProductInfo[i].goodsCode)=="string")
                         if(typeof(newProductInfo[i].goodsCode)=="string"){
                             result["goodsCode"] = newProductInfo[i].goodsCode
                         }else{
                    result["goodsCode"] = newProductInfo[i].goodsCode[j]
                         }
                    if(goods_type_priceonly == "1"){
                         result["codeCode"] = newProductInfo[i].goodsCode[j]
                     }
                     }
                     
                     
                 }
             }
         }
         //radio
         if(newProductInfo[i].attributeUnitType == 2){
             if(isEmptyObject(lastResult)){
                 if(newProductInfo[i].attributeValue[userResult[i][0]] != newProductInfo[i].default){
                      result[newProductInfo[i].name] = newProductInfo[i].attributeValue[userResult[i][0]]
                       result["."+newProductInfo[i].name] = newProductInfo[i].default
                 }else{
                     result[newProductInfo[i].name] = newProductInfo[i].attributeValue[userResult[i][0]]
                 }
             }else{
                 if(lastResult["."+newProductInfo[i].name] ==undefined){
                     if(newProductInfo[i].attributeValue[userResult[i][0]] != lastResult[newProductInfo[i].name]){
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue[userResult[i][0]]
                       result["."+newProductInfo[i].name] = lastResult[newProductInfo[i].name]
                     }else{
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue[userResult[i][0]]
                     }
                 }else{
                     if(newProductInfo[i].attributeValue[userResult[i][0]] != lastResult[newProductInfo[i].name]){
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue[userResult[i][0]]
                       result["."+newProductInfo[i].name] = lastResult[newProductInfo[i].name]
                     }else{
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue[userResult[i][0]]
                     }
                 }
             }
         }
        //  时间选择器
         if(newProductInfo[i].attributeUnitType == 4){
             if(isEmptyObject(lastResult)){
                 if(userResult[i][0] != newProductInfo[i].default){
                      result[newProductInfo[i].name] = userResult[i][0]
                       result["."+newProductInfo[i].name] = newProductInfo[i].default
                 }else{
                     result[newProductInfo[i].name] = userResult[i][0]
                 }
             }else{
                 if(lastResult["."+newProductInfo[i].name] ==undefined){
                     if(userResult[i][0] != lastResult[newProductInfo[i].name]){
                         result[newProductInfo[i].name] = userResult[i][0]
                       result["."+newProductInfo[i].name] = lastResult[newProductInfo[i].name]
                     }else{
                         result[newProductInfo[i].name] = userResult[i][0]
                     }
                 }else{
                     if(userResult[i][0] != lastResult[newProductInfo[i].name]){
                         result[newProductInfo[i].name] = userResult[i][0]
                       result["."+newProductInfo[i].name] = lastResult[newProductInfo[i].name]
                     }else{
                         result[newProductInfo[i].name] = userResult[i][0]
                     }
                 }
             }
         }
        //  label
         if(newProductInfo[i].attributeUnitType == 5){
             if(isEmptyObject(lastResult)){
                 if(newProductInfo[i].attributeValue != newProductInfo[i].default){
                      result[newProductInfo[i].name] = newProductInfo[i].attributeValue
                       result["."+newProductInfo[i].name] = newProductInfo[i].default
                 }else{
                     result[newProductInfo[i].name] = newProductInfo[i].attributeValue
                 }
             }else{
                 if(lastResult["."+newProductInfo[i].name] ==undefined){
                     if(newProductInfo[i].attributeValue != lastResult[newProductInfo[i].name]){
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue
                       result["."+newProductInfo[i].name] = lastResult[newProductInfo[i].name]
                     }else{
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue
                     }
                 }else{
                     if(newProductInfo[i].attributeValue != lastResult[newProductInfo[i].name]){
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue
                       result["."+newProductInfo[i].name] = lastResult[newProductInfo[i].name]
                     }else{
                         result[newProductInfo[i].name] = newProductInfo[i].attributeValue
                     }
                 }
             }
         }
 }
  return result
}
// 发送result对象并请求结果
function getPrice(result){
    
    // console.log(JSON.stringify(result))
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
        return res.data
      },
    })
}

function reviseData(res,userResult,attributeName,productInfo){
    // console.log("=====")
    // console.log(productInfo)
    // console.log(res)
    // console.log(userResult)
    // console.log(attributeName)
    var length = 0
    for(var js2 in res){
    length++;
    }
    if(length == 1){return userResult}
    else{
        for(var i=0;i<length-1;i++){
            if(res[i] == undefined){length++}else{
            for(var j=0;j<userResult.length;j++){
                if(attributeName[j] == res[i].attributeName){
                    console.log(j)
                    //方格式布局
                    if(res[i].attributeUnitType == 1){
                        for(var k=0;k<productInfo[i].attributeValue.length;k++){
                            if(productInfo[i].attributeValue[k]==res[i].default){userResult[j].splice(k,1,"tp_pressattributeValue")}
                            else{userResult[j].splice(k,1,"tp_attributeValue")}
                        }
                    }
                    //ridio
                    if(res[i].attributeUnitType == 2){
                        for(var k=0;k<productInfo[i].attributeValue.length;k++){
                            if(productInfo[i].attributeValue[k]==res[i].default){
                                userResult[j].splice(0,1,k)
                            }
                        }
                    }
                    //时间选择器
                    if(res[i].attributeUnitType == 4){
                        userResult[j].splice(0,1,res[i].default)
                    }
                    //label
                    if(res[i].attributeUnitType == 5){
                        userResult[j].splice(0,1,res[i].default)
                    }
                    }
                }
            }
        }
        return userResult
    }
}
function revisePremium(res,productInfo,attributeValue,userResult){
    
    var length = 0
    var res_length = 0 
    var premium_index = 0 //premiumExemption的下标
    var newProductInfo = []
    for(var js2 in productInfo){
    length++;
    }
    for(var js3 in res){
        res_length++
    }
    for(var j=0;j<res_length-1;j++){
        if(res[j]==undefined){res_length++}
        else{
            if(res[j].name == "premiumExemption"){
                premium_index = j
            }
        }
    }
 for(var i=0;i<length-1;i++){
     if(productInfo[i] == undefined){length++}
     else{
         if(premium_index != 0)
         if(productInfo[i].name=="premiumExemption"){
             productInfo[i] = res[premium_index]
         }
         newProductInfo.push(productInfo[i])
     }
 }
 for(var k=0;k<newProductInfo.length;k++){
     if(newProductInfo[k].name=="premiumExemption"){
         attributeValue.splice(k,1,newProductInfo[k].attributeValue)
         var a = []
         for(var m=0;m<attributeValue[k].length;m++){
             if(attributeValue[k][m] == newProductInfo[k].default){
                 a.push("tp_pressattributeValue")
             }else{
                 a.push("tp_attributeValue")
             }
         }
         userResult.splice(k,1,a)
     }
 }
 var b=[]
 b.push(productInfo)
 b.push(attributeValue)
 b.push(userResult)
 return b
}
function showDialog(){
  wx.showToast({
  title: '加载中',
  icon: 'loading',
  duration: 10000
})

setTimeout(function(){
  wx.hideToast()
},2000)
}
function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
module.exports.getUserResult = getUserResult
exports.getPrice = getPrice
exports.showDialog = showDialog
exports.reviseData = reviseData
exports.revisePremium = revisePremium