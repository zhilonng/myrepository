// common.js
// 获取用户保险数据并封装为result对象
function getUserResult(productInfo,userResult,lastResult) {
  var result ={}
  var length = 0
  var newProductInfo = []
  for(var js2 in productInfo){
    length++;
 }
 var length2 = length
 for(var k=0;k<length2-1;k++){
     console.log(k)
     if(productInfo[k] == undefined){length2++}else{
     newProductInfo.push(productInfo[k])
     }
 }
 for(var i=0;i<length-1;i++){
         //方格类型
         if(newProductInfo[i].attributeUnitType == 1){
             console.log(userResult)
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
                result["."+newProductInfo[i].name]=lastResult[productInfo[i].name]
                     }else{
                result[newProductInfo[i].name]=newProductInfo[i].attributeValue[j]
                     }
                     }else{
                         if(newProductInfo[i].attributeValue[j] != lastResult[productInfo[i].name]){
                result[newProductInfo[i].name] = newProductInfo[i].attributeValue[j]
                result["."+newProductInfo[i].name]=lastResult[newProductInfo[i].name]
                     }else{
                result[newProductInfo[i].name]=newProductInfo[i].attributeValue[j]
                     }
                     }
                     }
                     if(newProductInfo[i].name == "agelimit"){
                    result["goodsCode"] = newProductInfo[i].goodsCode[j]
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
    
    console.log(JSON.stringify(result))
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