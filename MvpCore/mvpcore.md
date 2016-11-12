#CLAndroidMVP
##介绍
CLAndroidMVP框架是基于MVP模式下的快速开发框架。整合了Volley的网络请求。
参考[google原味MVP项目](http://www.jianshu.com/p/dc9733bc3a54),[第三方封装MVP框架](http://www.jianshu.com/p/e0feb16105f9?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)


##使用框架前
* 网络请求，各权限添加，设置Application。

```
<application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".temp.TempActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
    <!-- 在SDCard中创建与删除文件权限 -->
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
    <!-- 往SDCard写入数据权限 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"></uses-permission>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
```


```
public class MyApplication extends BaseApplication {
}

```


##使用框架创建一个MVP模式的请求闭环
1.创建View与Presenter的约定类

```
/**
 * Created by e驾宝 on 2016/8/11.
 */
public class TempContract {
    interface View extends TaskBaseView{
    }
    interface Present{
        void startLoad();
    }
}

```

***注意***
> 此处TaskBaseView默认有3个方法。分别对应与Volley的请求开始，请求成功，请求失败3个基本方法
> 
> 所以在Activity实现了这个View接口后要复写这3个方法，在其中处理网络请求不同状态下的View的变化

2.创建Present实现类

```
/**
 * Created by e驾宝 on 2016/8/11.
 */
public class TempPresent extends TaskBasePresenter<TempContract.View> implements TempContract.Present {
    @Override
    public void startLoad() {
        TempHttp tempHttp = new TempHttp();
        tempHttp.setListener(this);
        tempHttp.excuteList(mContext);
    }
    @Override
    public void onStart(String TaskTag) {
        TaskBaseView taskBaseView = (TaskBaseView)getIView();
        taskBaseView.loadStart(TaskTag);
    }
    @Override
    public void onSuccess(String TaskTag, Object rs) {
        TaskBaseView taskBaseView = (TaskBaseView)getIView();
        taskBaseView.loadSuccess(TaskTag,rs);
    }
    @Override
    public void onError(String TaskTag, String errorString) {
        TaskBaseView taskBaseView = (TaskBaseView)getIView();
        taskBaseView.loadError(TaskTag,errorString);
    }
}
```

***解读***
> 实现TaskBasePresent方法后并给其设置View的范型，
> 
> TempPresent就可以通过**getIView()**这个父类方法来获取View。然后强转成自己的view处理相关逻辑.

> 此处TaskBasePresenter实现了VolleyUtil的监听。所以复写了onStart(),onSuccess(),onError() 3个方法。

> 此处TempHttp就是Model，就是一个网络请求。拿到数据后，会回调到想要的onStart，onSuccess, onError方法中

3.创建Model类，TempHttp

```
/**
 * Created by e驾宝 on 2016/8/11.
 */
public class TempHttp extends TaskBaseModel{
    public void excuteList(Context context){
        getData(context,"http://115.159.151.61:3001/api/shop/list?page=1&size=10","1");
    }
}
```

***解读***
> TaskBaseModel封装了Volley的网络请求，并设置了一个监听。通过设置该监听，网络请求就会回调。

> 上述present中tempHttp.setListener(this);就是这个原理

其中TaskBaseModel封装了两个请求方法，get，post请求

```
    public void getData(Context context,String url,String taskTag){
        VolleyUtil volleyUtil = new  VolleyUtil();
        volleyUtil.JsonRequestGet(context,taskTag,url,getListener());
    }
    public void postData(Context context, String url, Map<String,Object> params, String taskTag){
        VolleyUtil volleyUtil = new  VolleyUtil();
        volleyUtil.JsonRequestPost(context,taskTag,url,params,getListener());
    }

```

4.最后创建Activity

```
/**
 * Created by e驾宝 on 2016/8/11.
 */
public class TempActivity extends BaseActivity<TempPresent>  implements TempContract.View{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.temp_layout);
        mPresenter.startLoad();
    }
    @Override
    public BaseView getBaseView() {
        return this;
    }
    @Override
    public void loadStart(String TaskTag) {
        Log.i("start",TaskTag);
    }
    @Override
    public void loadSuccess(String TaskTag, Object rs) {
        Log.i("success",rs.toString());
    }
    @Override
    public void loadError(String TaskTag, String errorString) {
        Log.i("error",errorString.toString());
    }
}
```

***解读***
> 继承BaseActivity并设置TempPresent范型后，activity就会创建一个mPresent。在activity直接使用mPresent来处理业务逻辑即可。

> 这里mPresent.startLoad()就是上述创建的一个网络请求

> activity实现了View接口，只需要复写网络请求的相关的方法就可以处理相关逻辑。

> 注意此处getBaseView必须要返回正确的view，这样Presenter里 TaskBaseView taskBaseView = (TaskBaseView)getIView();才起作用

##框架相关工具类

* AppUtils  －－ app相关工具类，app名，版本获取之类
* DensityUtils  －－ 单位转化相关工具类
* HttpUtils －－  网络请求相关类，简单数据请求，使用VolleyUtil
* KeyBoardUtils  －－ 软键盘工具类
* NetUtils  －－ 网络状态相关类，是否连接，是否连接wifi等
* SDCardUtils  －－ 操作sd卡相关类
* SPUtils  －－ shareprefresence 相关类
* ScreenUtils －－  屏幕相关类
* VolleyUtil －－ 请求相关类，包括get，post请求

