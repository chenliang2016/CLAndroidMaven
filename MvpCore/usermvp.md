##使用mvp

###1.创建View与Presenter的约定类

```
public class LoginContract {
    interface View extends BaseView {
    }
    interface Present{
        void login();
    }
}
```

###2.创建Present实现类

```
public class LoginPresent extends BasePresenter<LoginContract.View> implements LoginContract.Present {
    @Override
    public void login() {

    }

}
```

###3.创建Model类

```
public class LoginModel extends BaseModel {

}
```

###4.创建Activity ，即 view的实现类
public class LoginActivity extends BaseActivity<LoginPresent> implements View{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    @Override
    public BaseView getBaseView() {
        return this;
    }

}

>* 1.每个实现了View的类，即view层，都有个默认的mPresenter参数，即为Activity创建了一个变量，
>* 2.每个Activity类中getBaseView方法，这个方法为mPresenter指定了相应的view的索引，所以需要实现这个方法。以实现mPresenter 与 View的绑定
>* 3.在基础的BasePresent中使用了RxJava，使用mCompositeSubscription.addSubscription来进行观察者与被观察者的绑带。详情看[网络请求](usernet.md)
