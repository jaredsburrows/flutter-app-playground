import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/ui/battery/battery_plus_page.dart';
import 'package:flutter_gradle_app_playground/ui/camera/camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/camera/camera_simple_page.dart';
import 'package:flutter_gradle_app_playground/ui/chart/chart_page.dart';
import 'package:flutter_gradle_app_playground/ui/connectivity/connectivity_plus_page.dart';
import 'package:flutter_gradle_app_playground/ui/device/device_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/gps/gps_page.dart';
import 'package:flutter_gradle_app_playground/ui/home/home_page.dart';
import 'package:flutter_gradle_app_playground/ui/network/network_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/package/package_info_plus_page.dart';
import 'package:flutter_gradle_app_playground/ui/page_info.dart';
import 'package:flutter_gradle_app_playground/ui/profile/profile_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page2.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page3.dart';
import 'package:flutter_gradle_app_playground/ui/qr_generator/qr_generator_page.dart';
import 'package:flutter_gradle_app_playground/ui/sensors_page/sensors_page.dart';
import 'package:flutter_gradle_app_playground/ui/share/share_page.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  // TODO handle saving state individually
  final List<PageInfo> drawerItems = const [
    HomePage(), // "Landing" home state
    BatteryPage(),
    CameraPage(),
    CameraSimplePage(),
    ChartPage(),
    ConnectivityPage(),
    DeviceInfoPage(),
    GpsPage(),
    NetworkInfoPage(),
    PackageInfoPage(),
    ProfilePage(),
    QrCameraPage(),
    QrCameraPage2(),
    QrCameraPage3(),
    QrGeneratorPage(),
    SensorsPage(),
    SharePage(),
  ];

  @override
  State<StatefulWidget> createState() {
    return MainPageState();
  }
}

class MainPageState extends State<MainPage> {
  final GlobalKey<ScaffoldState> _navigatorKey = GlobalKey();
  int _selectedDrawerIndex = 0;

  @override
  Widget build(BuildContext context) {
    List<Widget> drawerOptions = [];

    for (var i = 0; i < widget.drawerItems.length; i++) {
      var drawerItem = widget.drawerItems[i];
      drawerOptions.add(ListTile(
        leading: Icon(drawerItem.icon()),
        title: Text(drawerItem.title()),
        selected: i == _selectedDrawerIndex,
        onTap: () => _onSelectItem(i),
      ));
    }
    drawerOptions.add(
      const Divider(),
    );
    drawerOptions.add(const AboutListTile(
      child: Text('About'),
      applicationName: 'Flutter Playground',
      applicationVersion: 'v1.0.0',
      applicationIcon: Icon(Icons.adb),
      icon: Icon(Icons.info),
    ));

    return WillPopScope(
      // Handle back button
      onWillPop: () async {
        // If the drawer is open, close it
        if (_navigatorKey.currentState?.isDrawerOpen == true) {
          Navigator.pop(context);
          return false;
        }
        // Go back to the Home page if not there
        else if (widget.drawerItems[_selectedDrawerIndex] is! HomePage) {
          setState(() {
            _selectedDrawerIndex = 0;
          });
          return false;
        }
        // If on the Home page, close the app
        else if (widget.drawerItems[_selectedDrawerIndex] is HomePage) {
          return true;
        }

        // Default - exits app
        return true;
      },
      child: Scaffold(
          key: _navigatorKey,
          appBar: AppBar(
              title: Text(widget.drawerItems[_selectedDrawerIndex].title())),
          drawer: Drawer(
            key: const PageStorageKey('drawer-state'),
            // TODO: use ListView.builder?
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                DrawerHeader(
                    margin: EdgeInsets.zero,
                    padding: EdgeInsets.zero,
                    decoration: const BoxDecoration(
                        image: DecorationImage(
                            fit: BoxFit.fitWidth,
                            image: AssetImage('res/images/Icon-512.png'))),
                    child: Stack(children: const <Widget>[
                      Positioned(
                          bottom: 12.0,
                          left: 16.0,
                          child: Text('Jared Burrows',
                              style: TextStyle(
                                  fontSize: 20.0,
                                  fontWeight: FontWeight.w500,
                                  color: Color.fromARGB(255, 0, 0, 0)))),
                    ])),
                Column(children: drawerOptions),
              ],
            ),
          ),
          body: widget.drawerItems[_selectedDrawerIndex] as StatefulWidget),
    );
  }

  _onSelectItem(int index) {
    setState(() {
      _selectedDrawerIndex = index;
    });
    Navigator.pop(context); // closes the drawer if opened
  }
}
