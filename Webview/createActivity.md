##创建自己的Activity

###导入fragment

```
import com.cl.webview.fragment.CLWebViewFragment;

```

###Activity并实现fragment相关方法

public class CommonWebViewActivity2 extends AppCompatActivity implements CLWebViewFragment.webViewListener {

    CLWebViewFragment webViewFragment;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_comwebview);
        initWebViewFragment();

    }

    public void initWebViewFragment(){
        Bundle bundle =new Bundle();
        bundle.putString("url","http://192.168.16.213/index.html");
        webViewFragment = new CLWebViewFragment();
        webViewFragment.setArguments(bundle);
        getSupportFragmentManager().beginTransaction().replace(R.id.webviewfragment,webViewFragment).commit();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
       //使用此方法处理Android返回按键点击后的处理
        webViewFragment.webviewBack(keyCode,event);
        return super.onKeyDown(keyCode, event);
    }

	//此方法用于识别了网页的title后，activity进行处理
    @Override
    public void setTitle(String title) {

    }
}

>* 此处有两个方法，是activity与fragment进行交互的处理
>* webviewBack(keyCode,event)这个是fragment里定义的方法，用于处理返回点击后的事件，目前是如果有历史页面，就返回历史页面，没有，就后退到上个Activity。
>* setTitle 是CLWebViewFragment.webViewListener监听器里的方法。html页面的title被解析后，回调此方法。