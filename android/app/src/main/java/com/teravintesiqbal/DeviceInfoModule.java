package com.teravintesiqbal;

import android.content.Context;
import android.os.Build;
import android.provider.Settings;
import android.util.DisplayMetrics;
import android.view.WindowManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

public class DeviceInfoModule extends ReactContextBaseJavaModule {
  private ReactApplicationContext reactContext;

  public DeviceInfoModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "DeviceInfo";
  }
  

  @ReactMethod
  public void getDeviceInfo(final Promise promise) {
    try {
      JSONObject info = new JSONObject();
      info.put("deviceName", Build.MODEL);
      info.put("deviceManufacturer", Build.MANUFACTURER);
      info.put("deviceOS", "Android");
      info.put("deviceOSVersion", Build.VERSION.RELEASE);

      DisplayMetrics metrics = new DisplayMetrics();
      WindowManager wm = (WindowManager) reactContext.getSystemService(Context.WINDOW_SERVICE);
      wm.getDefaultDisplay().getMetrics(metrics);

      int heightPixels = metrics.heightPixels;
      int widthPixels = metrics.widthPixels;
      float scaleFactor = metrics.density;
      float widthDp = widthPixels / scaleFactor;
      float heightDp = heightPixels / scaleFactor;

      info.put("deviceScreenHeight", heightDp);
      info.put("deviceScreenWidth", widthDp);

      promise.resolve(info.toString());
    } catch (JSONException e) {
      promise.reject(e);
    }
  }
}
