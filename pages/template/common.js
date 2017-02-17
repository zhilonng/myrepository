// common.js
// 获取用户保险数据并封装为result对象
function getUserResult(productInfo,userResult,lastResult) {
  var result ={}
  var length = 0
  for(var js2 in productInfo){
    length++;
 }
 for(var i=0;i<length-1;i++){
     if(productInfo[i] == undefined){length++}else{
         //方格类型
         if(productInfo[i].attributeUnitType == 1){
             for(var j=0;j<userResult[i].length;j++){
                 if(userResult[i][j] == "tp_pressattributeValue"){
                     console.log(isEmptyObject(lastResult))
                     if(isEmptyObject(lastResult)){
                        if(productInfo[i].attributeValue[j] != productInfo[i].default){
                result["."+productInfo[i].name] = productInfo[i].attributeValue[j]
                result[productInfo[i].name]=productInfo[i].default
                     }else{
                result[productInfo[i].name]=productInfo[i].attributeValue[j]
                     }
                     }else{
                         console.log(productInfo[i].attributeValue[j])
                         console.log(lastResult[productInfo[i].name])
                         if(lastResult["."+productInfo[i].name] ==undefined){
                         if(productInfo[i].attributeValue[j] != lastResult[productInfo[i].name]){
                result["."+productInfo[i].name] = productInfo[i].attributeValue[j]
                result[productInfo[i].name]=lastResult[productInfo[i].name]
                     }else{
                result[productInfo[i].name]=productInfo[i].attributeValue[j]
                     }
                     }else{
                         if(productInfo[i].attributeValue[j] != lastResult["."+productInfo[i].name]){
                result["."+productInfo[i].name] = productInfo[i].attributeValue[j]
                result[productInfo[i].name]=lastResult["."+productInfo[i].name]
                     }else{
                result[productInfo[i].name]=productInfo[i].attributeValue[j]
                     }
                     }
                     }
                     if(productInfo[i].name == "agelimit"){
                    result["goodsCode"] = productInfo[i].goodsCode[j]
                     }
                     
                 }
             }
         }
         //radio
         if(productInfo[i].attributeUnitType == 2){
             if(isEmptyObject(lastResult)){
                 if(productInfo[i].attributeValue[userResult[i][0]] != productInfo[i].default){
                     console.log("1")
                     console.log(productInfo[i].attributeValue[userResult[i][0]])
                     console.log(productInfo[i].default)
                      result["."+productInfo[i].name] = productInfo[i].attributeValue[userResult[i][0]]
                       result[productInfo[i].name] = productInfo[i].default
                 }else{
                     result[productInfo[i].name] = productInfo[i].attributeValue[userResult[i][0]]
                 }
             }else{
                 if(lastResult["."+productInfo[i].name] ==undefined){
                     if(productInfo[i].attributeValue[userResult[i][0]] != lastResult[productInfo[i].name]){
                         result["."+productInfo[i].name] = productInfo[i].attributeValue[userResult[i][0]]
                       result[productInfo[i].name] = lastResult[productInfo[i].name]
                     }else{
                         result[productInfo[i].name] = productInfo[i].attributeValue[userResult[i][0]]
                     }
                 }else{
                     if(productInfo[i].attributeValue[userResult[i][0]] != lastResult["."+productInfo[i].name]){
                         result["."+productInfo[i].name] = productInfo[i].attributeValue[userResult[i][0]]
                       result[productInfo[i].name] = lastResult["."+productInfo[i].name]
                     }else{
                         result[productInfo[i].name] = productInfo[i].attributeValue[userResult[i][0]]
                     }
                 }
             }
         }
        //  时间选择器
         if(productInfo[i].attributeUnitType == 4){
             if(isEmptyObject(lastResult)){
                 if(userResult[i][0] != productInfo[i].default){
                      result["."+productInfo[i].name] = userResult[i][0]
                       result[productInfo[i].name] = productInfo[i].default
                 }else{
                     result[productInfo[i].name] = userResult[i][0]
                 }
             }else{
                 if(lastResult["."+productInfo[i].name] ==undefined){
                     if(userResult[i][0] != lastResult[productInfo[i].name]){
                         result["."+productInfo[i].name] = userResult[i][0]
                       result[productInfo[i].name] = lastResult[productInfo[i].name]
                     }else{
                         result[productInfo[i].name] = userResult[i][0]
                     }
                 }else{
                     if(userResult[i][0] != lastResult["."+productInfo[i].name]){
                         result["."+productInfo[i].name] = userResult[i][0]
                       result[productInfo[i].name] = lastResult["."+productInfo[i].name]
                     }else{
                         result[productInfo[i].name] = userResult[i][0]
                     }
                 }
             }
         }
        //  label
         if(productInfo[i].attributeUnitType == 5){
             if(isEmptyObject(lastResult)){
                 if(productInfo[i].attributeValue != productInfo[i].default){
                      result["."+productInfo[i].name] = productInfo[i].attributeValue
                       result[productInfo[i].name] = productInfo[i].default
                 }else{
                     result[productInfo[i].name] = productInfo[i].attributeValue
                 }
             }else{
                 if(lastResult["."+productInfo[i].name] ==undefined){
                     if(productInfo[i].attributeValue != lastResult[productInfo[i].name]){
                         result["."+productInfo[i].name] = productInfo[i].attributeValue
                       result[productInfo[i].name] = lastResult[productInfo[i].name]
                     }else{
                         result[productInfo[i].name] = productInfo[i].attributeValue
                     }
                 }else{
                     if(productInfo[i].attributeValue != lastResult["."+productInfo[i].name]){
                         result["."+productInfo[i].name] = productInfo[i].attributeValue
                       result[productInfo[i].name] = lastResult["."+productInfo[i].name]
                     }else{
                         result[productInfo[i].name] = productInfo[i].attributeValue
                     }
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
      },
    })
}
function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
module.exports.getUserResult = getUserResult
exports.getPrice = getPrice