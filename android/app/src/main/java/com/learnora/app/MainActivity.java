package com.learnora.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.learnora.app.plugins.LearnoraNFCPlugin;
import com.learnora.app.plugins.KioskModePlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(LearnoraNFCPlugin.class);
        registerPlugin(KioskModePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
