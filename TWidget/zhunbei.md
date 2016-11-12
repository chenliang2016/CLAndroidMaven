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
    compile 'com.cl:twidget:1.0.2'
    ...
}
```