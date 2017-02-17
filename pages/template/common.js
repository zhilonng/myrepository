// common.js
// 获取用户保险数据并封装为result对象
function getUserResult(productInfo,userResult) {
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
                     if(productInfo[i].name == "agelimit"){
                    result["goodsCode"] = productInfo[i].goodsCode[j]
                     }
                     result[productInfo[i].name]=productInfo[i].attributeValue[j]
                 }
             }
         }
         //radio
         if(productInfo[i].attributeUnitType == 2){
             result[productInfo[i].name] = productInfo[i].attributeValue[userResult[i][0]]
         }
        //  时间选择器
         if(productInfo[i].attributeUnitType == 4){
             result[productInfo[i].name] = userResult[i][0]
         }
        //  label
         if(productInfo[i].attributeUnitType == 5){
             result[productInfo[i].name] = productInfo[i].attributeValue
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
module.exports.getUserResult = getUserResult
exports.getPrice = getPrice