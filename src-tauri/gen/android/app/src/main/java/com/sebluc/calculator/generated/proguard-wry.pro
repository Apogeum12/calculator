# THIS FILE IS AUTO-GENERATED. DO NOT MODIFY!!

# Copyright 2020-2023 Tauri Programme within The Commons Conservancy
# SPDX-License-Identifier: Apache-2.0
# SPDX-License-Identifier: MIT

-keep class com.sebluc.calculator.* {
  native <methods>;
}

-keep class com.sebluc.calculator.WryActivity {
  public <init>(...);

  void setWebView(com.sebluc.calculator.RustWebView);
  java.lang.Class getAppClass(...);
  java.lang.String getVersion();
}

-keep class com.sebluc.calculator.Ipc {
  public <init>(...);

  @android.webkit.JavascriptInterface public <methods>;
}

-keep class com.sebluc.calculator.RustWebView {
  public <init>(...);

  void loadUrlMainThread(...);
  void loadHTMLMainThread(...);
  void setAutoPlay(...);
  void setUserAgent(...);
}

-keep class com.sebluc.calculator.RustWebChromeClient,com.sebluc.calculator.RustWebViewClient {
  public <init>(...);
}