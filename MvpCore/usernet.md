##网络请求

网络请求使用了Retrofit+RxJava的方式

#####创建请求接口接口

```

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import rx.Observable;


public interface ApiStores {
    //baseUrl
    String API_SERVER_URL = "http://www.weather.com.cn/";

    //加载天气
    @GET("adat/sk/{cityId}.html")
    Observable<T> loadDataByRetrofitRxjava(@Path("cityId") String cityId);
}
```

其中T换成自己的返回实体。

#####创建ApiStores的接口对象

```
ApiStores apiStores = AppClient.retrofit("").create(ApiStores.class)


```

#####使用RxJava的观察者模式进行网络请求，并监听请求成功失败等状态

```
addSubscription(apiStores.loadDataByRetrofitRxjava(cityId),
                new ApiCallback<MainModel>() {
                    @Override
                    public void onSuccess(MainModel model) {
                        mvpView.getDataSuccess(model);
                    }

                    @Override
                    public void onFailure(String msg) {
                        mvpView.getDataFail(msg);
                    }


                    @Override
                    public void onFinish() {
                        mvpView.hideLoading();
                    }

                });

```

>注意：整个过程在presenter中使用，因为addSubscription方法，是BasePresenter中的方法



