##使用前准备

###引入依赖

build.gradle修改

```

android {
    ...
    repositories {
     	 ...
     	mavenCentral()
        jcenter()
        maven {
            url "https://raw.githubusercontent.com/chenliang2016/CLAndroidMaven/master"
        }
        ...
    }
    ...
}

dependencies {
    ...
    compile 'com.cl:mvpcore:1.0.3'
    ...
}
```

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
        android:theme="@style/customTheme"
        tools:replace="android:icon">
  
  
		...
        <activity android:name="com.cl.twidget.QRScanActivity"
            android:screenOrientation="portrait" />
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
    
    //二维码扫描需要的权限
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.FLASHLIGHT" />
   ...

</manifest>
```
