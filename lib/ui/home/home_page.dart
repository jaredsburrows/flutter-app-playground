import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/ui/battery_info/batter_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/camera/camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/chart/chart_page.dart';
import 'package:flutter_gradle_app_playground/ui/package_info/package_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/profile/profile_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page2.dart';
import 'package:flutter_gradle_app_playground/ui/qr_generator/qr_generator.dart';
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
  final Map<int, DrawerItem> drawerMap = {
    0: DrawerItem(const HomePage2(), HomePage2.title, HomePage2.icon),
    1: DrawerItem(
        const BatteryInfoPage(), BatteryInfoPage.title, BatteryInfoPage.icon),
    2: DrawerItem(const CameraPage(), CameraPage.title, CameraPage.icon),
    3: DrawerItem(const ChartPage(), ChartPage.title, ChartPage.icon),
    4: DrawerItem(
        const PackageInfoPage(), PackageInfoPage.title, PackageInfoPage.icon),
    5: DrawerItem(const ProfilePage(), ProfilePage.title, ProfilePage.icon),
    6: DrawerItem(const QrCameraPage(), QrCameraPage.title, QrCameraPage.icon),
    7: DrawerItem(
        const QrCameraPage2(), QrCameraPage2.title, QrCameraPage2.icon),
    8: DrawerItem(
        const QrGeneratorPage(), QrGeneratorPage.title, QrGeneratorPage.icon),
  };

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

    for (final entry in widget.drawerMap.entries) {
      final drawerPosition = entry.key;
      final drawerItem = entry.value;
      drawerOptions.add(ListTile(
        leading: Icon(drawerItem.item3),
        title: Text(drawerItem.item2),
        selected: drawerPosition == _selectedDrawerIndex,
        onTap: () => _onSelectItem(drawerPosition),
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
            AppBar(title: Text(widget.drawerMap[_selectedDrawerIndex]!.title)),
        drawer: Drawer(
          child: Column(
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
        ),
        body: widget.drawerMap[_selectedDrawerIndex]!.page);
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
