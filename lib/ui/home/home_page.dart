import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/ui/battery/battery_plus_page.dart';
import 'package:flutter_gradle_app_playground/ui/camera/camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/camera/camera_simple_page.dart';
import 'package:flutter_gradle_app_playground/ui/chart/chart_page.dart';
import 'package:flutter_gradle_app_playground/ui/connectivity/connectivity_plus_page.dart';
import 'package:flutter_gradle_app_playground/ui/device/device_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/network/network_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/package/package_info_plus_page.dart';
import 'package:flutter_gradle_app_playground/ui/profile/profile_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page2.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page3.dart';
import 'package:flutter_gradle_app_playground/ui/qr_generator/qr_generator_page.dart';
import 'package:flutter_gradle_app_playground/ui/sensors_page/sensors_page.dart';
import 'package:flutter_gradle_app_playground/ui/share/share_page.dart';
import 'package:tuple/tuple.dart';

class DrawerItem extends Tuple3<StatefulWidget, String, IconData> {
  StatefulWidget page;
  String title;
  IconData icon;

  DrawerItem(this.page, this.title, this.icon) : super(page, title, icon);
}

class HomePage extends StatefulWidget {
  static const String title = 'Home Page';
  static const IconData icon = Icons.home;
  static const String route = '/';

  HomePage({Key? key}) : super(key: key);

  // TODO handle saving state individually
  final drawerItems = [
    DrawerItem(
      const HomePage2(),
      HomePage2.title,
      HomePage2.icon,
    ),
    DrawerItem(
      const BatteryPage(),
      BatteryPage.title,
      BatteryPage.icon,
    ),
    DrawerItem(
      const CameraPage(),
      CameraPage.title,
      CameraPage.icon,
    ),
    DrawerItem(
      const CameraSimplePage(),
      CameraSimplePage.title,
      CameraSimplePage.icon,
    ),
    DrawerItem(
      const ChartPage(),
      ChartPage.title,
      ChartPage.icon,
    ),
    DrawerItem(
      const ConnectivityPage(),
      ConnectivityPage.title,
      ConnectivityPage.icon,
    ),
    DrawerItem(
      const DeviceInfoPage(),
      DeviceInfoPage.title,
      DeviceInfoPage.icon,
    ),
    DrawerItem(
      const NetworkInfoPage(),
      NetworkInfoPage.title,
      NetworkInfoPage.icon,
    ),
    DrawerItem(
      const PackageInfoPage(),
      PackageInfoPage.title,
      PackageInfoPage.icon,
    ),
    DrawerItem(
      const ProfilePage(),
      ProfilePage.title,
      ProfilePage.icon,
    ),
    DrawerItem(
      const QrCameraPage(),
      QrCameraPage.title,
      QrCameraPage.icon,
    ),
    DrawerItem(
      const QrCameraPage2(),
      QrCameraPage2.title,
      QrCameraPage2.icon,
    ),
    DrawerItem(
      const QrCameraPage3(),
      QrCameraPage3.title,
      QrCameraPage3.icon,
    ),
    DrawerItem(
      const QrGeneratorPage(),
      QrGeneratorPage.title,
      QrGeneratorPage.icon,
    ),
    DrawerItem(
      const SensorsPage(),
      SensorsPage.title,
      SensorsPage.icon,
    ),
    DrawerItem(
      const SharePage(),
      SharePage.title,
      SharePage.icon,
    ),
  ];

  @override
  State<StatefulWidget> createState() {
    return HomePageState();
  }
}

class HomePageState extends State<HomePage> {
  int _selectedDrawerIndex = 0;

  @override
  Widget build(BuildContext context) {
    List<Widget> drawerOptions = [];

    for (var i = 0; i < widget.drawerItems.length; i++) {
      var drawerItem = widget.drawerItems[i];
      drawerOptions.add(ListTile(
        leading: Icon(drawerItem.item3),
        title: Text(drawerItem.item2),
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

    return Scaffold(
        appBar:
            AppBar(title: Text(widget.drawerItems[_selectedDrawerIndex].title)),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: <Widget>[
              Column(
                children: <Widget>[
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
                  Column(children: drawerOptions)
                ],
              ),
            ],
          ),
        ),
        body: widget.drawerItems[_selectedDrawerIndex].page);
  }

  _onSelectItem(int index) {
    setState(() {
      _selectedDrawerIndex = index;
    });
    Navigator.of(context).pop();
  }
}

class HomePage2 extends StatefulWidget {
  static const String title = 'Home Page';
  static const IconData icon = Icons.home;
  static const String route = '/';

  const HomePage2({Key? key}) : super(key: key);

  @override
  _HomePageState2 createState() => _HomePageState2();
}

class _HomePageState2 extends State<HomePage2> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
