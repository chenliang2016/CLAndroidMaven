#MutiImageSelector

代码照搬[MutiImageSelector](https://github.com/lovetuzitong/MultiImageSelector)

##使用前
在AndroidManifest文件中添加打开相册的Activity，以及相关权限，因为此控件中使用了相关控件

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.cl.clandroidmvp">

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:replace="android:icon">
        ...
        <activity
            android:configChanges="orientation|screenSize"
            android:name="com.cl.twidget.ImageSelector.MultiImageSelectorActivity" />
        ...    

    </application>

    ...
    <!-- 在SDCard中创建与删除文件权限 -->
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
    <!-- 往SDCard写入数据权限 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"></uses-permission>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
   ...

</manifest>
```

###创建一个Selector

```
MultiImageSelector.create()
        .showCamera(boolean) // show camera or not. true by default
        .count(int) // max select image size, 9 by default. used width #.multi()
        .single() // single mode
        .multi() // multi mode, default mode;
        .origin(ArrayList<String>) // original select data set, used width #.multi()
        .start(Activity/Fragment, REQUEST_IMAGE);
```

###接受返回参数

```
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if(requestCode == REQUEST_IMAGE){
        if(resultCode == RESULT_OK){
            // Get the result list of select image paths
            List<String> path = data.getStringArrayListExtra(MultiImageSelectorActivity.EXTRA_RESULT);
            // do your logic ....
        }
    }
}
```

###自定义自己的Activity

```
class CustomerActivity extends Activity implements MultiImageSelectorFragment.Callback{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // customer logic here...
        Bundle bundle = new Bundle();
        bundle.putInt(MultiImageSelectorFragment.EXTRA_SELECT_COUNT, mDefaultCount);
        bundle.putInt(MultiImageSelectorFragment.EXTRA_SELECT_MODE, mode);
        bundle.putBoolean(MultiImageSelectorFragment.EXTRA_SHOW_CAMERA, isShow);
        // Add fragment to your Activity
        getSupportFragmentManager().beginTransaction()
                .add(R.id.image_grid, Fragment.instantiate(this, MultiImageSelectorFragment.class.getName(), bundle))
                .commit();
    }
    @Override
    public void onSingleImageSelected(String path) {
        // When select mode set to MODE_SINGLE, this method will received result from fragment
    }

    @Override
    public void onImageSelected(String path) {
        // You can specify your ActionBar behavior here 
    }

    @Override
    public void onImageUnselected(String path) {
        // You can specify your ActionBar behavior here 
    }

    @Override
    public void onCameraShot(File imageFile) {
        // When user take phone by camera, this method will be called.
    }
}
```