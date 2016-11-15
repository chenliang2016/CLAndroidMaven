##H5调用App

### 引入js

引入此文件夹下[TH5.js](TH5.js)文件

###Html调用案例

```
   var params = {message:"加载中"};
   H5App.callNative("showLoading",JSON.stringify(params),function () {
                   alert("success");
   },function () {
                   alert("error");
   })

```

###调用方法介绍

```

H5App.callNative(method,params,onSuccess,onFailure)

```

* H5App 全局Js对象
* callNative通过此方法，发起native通信请求，所有的native通信都由此方法
* method：调用原生的方法名，String类型
* params：传递的参数，String类型，如果是json，转化为String
* onSuccess：调用native成功后回调
* onFailure：调用native失败后回调

###method与params对应关系

|method|params|描述|
|---|---|---|
|showLoading|{message:"加载中"}|弹出框加载方式|
|hideLoading|""|弹出框加载关闭|
|alertMessage|{message:"加载中"}|弹出确认提示框|
|showToast|{message:"加载中"}|toast显示|
|naviPush|{className:"com.cl.clandroidmvp.CommonWebViewActivity",params:{url:"https://www.baidu.com"}}|映射到startActivity方法，className是类名，params，是传的参数|
|naviPop|“”|关闭当前activity|
|photoPick|“{uploadUrl:"http://192.168.16.213:7000/upload"}”|图片上传，包括拍照，选择图片|
|qrscan|“”|二维码扫描|
