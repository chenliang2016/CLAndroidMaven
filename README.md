# CLAndroidMaven
是一个android相关的maven中央仓库，目前包括，mvp核心框架，以及一个自定义的webview fragment（提供相关的原生与js的交互），集合多个view的aar，工具类的aar，


# 使用方法

在build.gradle 下添加中央库地址

```

android {
 
    repositories {
        ...
        maven {
            url "https://raw.githubusercontent.com/chenliang2016/CLAndroidMaven/master"
        }
        ...
    }
}

```

添加依赖

```
compile 'com.cl:webview:1.1.1'

```

# 库列表

* mvpcore

```
compile 'com.cl:mvpcore:1.0.0'
```

基于mvp的一个核心框架，集成了mvp架构，网络请求工具

[使用方法](MvpCore/readme.md);

* webview

```
compile 'com.cl:webview:1.1.1'
```

封装webview与js交互的相关方法

[使用方法](webview.md);
