#TWActionSheet

#####创建方法
```
 String[] items = {"拍照上传","选择图片"};
                uploadUrl = event.getData().get("uploadUrl").toString();

                currentUploadPort = event.getPort();

                if(twActionSheet==null){
                    twActionSheet = TWActionSheet.create(getContext(), "图片上传方式", items, new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

                            NativeViewChangeMessage nativeViewChangeMessage = new NativeViewChangeMessage();
                            nativeViewChangeMessage.setViewName("TWActionSheet");
                            Map<String,Object>  params = new HashMap<String, Object>();
                            params.put("state","hide");
                            nativeViewChangeMessage.setParams(params);
                            EventBus.getDefault().post(nativeViewChangeMessage);

                            if (i == 0){
                                cameraUri = PhotoUtil.getCaptureSavedUri();
                                PhotoUtil.openCamera(CLWebViewFragment.this,cameraUri);
                            }else if (i == 1){
                                PhotoUtil.openAlbum(CLWebViewFragment.this);
                            }
                        }
                    });
                }

                twActionSheet.show();
                
```

##api

#####show()

显示弹出框

#####hide()
隐藏弹出框


