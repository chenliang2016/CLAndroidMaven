##准备

###引入依赖

build.gradle修改

```

android {
    ...
    repositories {
     	 ...
        maven {
            url "https://raw.githubusercontent.com/chenliang2016/CLAndroidMaven/master"
        }
        ...
    }
    ...
}

dependencies {
    ...
    compile 'com.cl:mvpcore:1.0.2'
    ...
}
```

###权限配置
* 网络请求，各权限添加，设置Application。

```
    ...
    <!-- 在SDCard中创建与删除文件权限 -->
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
    <!-- 往SDCard写入数据权限 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"></uses-permission>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
    ...
```

###创建自己的application 继承 BaseApplication

因为在BaseApplication中进行了Mvp相关单例文件的创建

```
public class MyApplication extends BaseApplication {
}

```