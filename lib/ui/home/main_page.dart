import 'package:flutter/material.dart';
import 'package:flutter_app_playground/ui/battery/battery_plus_page.dart';
import 'package:flutter_app_playground/ui/camera/camera_page.dart';
import 'package:flutter_app_playground/ui/camera/camera_simple_page.dart';
import 'package:flutter_app_playground/ui/chart/chart_page.dart';
import 'package:flutter_app_playground/ui/connectivity/connectivity_plus_page.dart';
import 'package:flutter_app_playground/ui/device/device_info_page.dart';
import 'package:flutter_app_playground/ui/gps/gps_page.dart';
import 'package:flutter_app_playground/ui/home/home_page.dart';
import 'package:flutter_app_playground/ui/package/package_info_plus_page.dart';
import 'package:flutter_app_playground/ui/page_info.dart';
import 'package:flutter_app_playground/ui/profile/profile_page.dart';
import 'package:flutter_app_playground/ui/qr_camera/qr_camera_page.dart';
import 'package:flutter_app_playground/ui/qr_camera/qr_camera_page2.dart';
import 'package:flutter_app_playground/ui/qr_generator/qr_generator_page.dart';
import 'package:flutter_app_playground/ui/sensors_page/sensors_page.dart';
import 'package:flutter_app_playground/ui/share/share_page.dart';
import 'package:flutter_app_playground/ui/video/video_page.dart';
import 'package:flutter_app_playground/ui/video/video_page2.dart';
import 'package:flutter_app_playground/ui/widget/widget_grouped_list_page.dart';
import 'package:flutter_app_playground/ui/widget/widget_infinite_listview_page.dart';
import 'package:flutter_app_playground/ui/widget/widget_sticky_headers_page.dart';

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
    PackageInfoPage(),
    ProfilePage(),
    QrCameraPage(),
    QrCameraPage2(),
    QrGeneratorPage(),
    SensorsPage(),
    SharePage(),
    VideoPage(),
    VideoPage2(),
    WidgetGroupedListPage(),
    WidgetInfiniteListviewPage(),
    WidgetStickyHeadersPage(),
  ];

  @override
  State<StatefulWidget> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage>
    with AutomaticKeepAliveClientMixin {
  final GlobalKey<ScaffoldState> _navigatorKey = GlobalKey();
  int _selectedDrawerIndex = 0;

  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);

    List<Widget> drawerOptions = [];
    // Drawer Header
    drawerOptions.add(const DrawerHeader(
        margin: EdgeInsets.zero,
        padding: EdgeInsets.zero,
        decoration: BoxDecoration(
            image: DecorationImage(
                fit: BoxFit.fitWidth,
                image: AssetImage('res/images/Icon-512.png'))),
        child: Stack(children: <Widget>[
          Positioned(
              bottom: 12.0,
              left: 16.0,
              child: Text('Jared Burrows',
                  style: TextStyle(
                      fontSize: 20.0,
                      fontWeight: FontWeight.w500,
                      color: Colors.black))),
        ])));

    // Drawer Items
    for (var i = 0; i < widget.drawerItems.length; i++) {
      var drawerItem = widget.drawerItems[i];
      drawerOptions.add(ListTile(
        leading: Icon(drawerItem.icon()),
        title: Text(drawerItem.title()),
        selected: i == _selectedDrawerIndex,
        onTap: () => _onSelectItem(i),
      ));
    }

    // End of Items
    drawerOptions.add(
      const Divider(),
    );
    drawerOptions.add(const AboutListTile(
      applicationName: 'Flutter Playground',
      applicationVersion: 'v1.0.0',
      applicationIcon: Icon(Icons.adb),
      icon: Icon(Icons.info),
      child: Text('About'),
    ));

    return WillPopScope(
      // Handle back button
      onWillPop: () async {
        if (_navigatorKey.currentState?.isDrawerOpen == true) {
          // If the drawer is open, close it
          Navigator.pop(context);
          return false;
        } else if (widget.drawerItems[_selectedDrawerIndex] is! HomePage) {
          // Go back to the Home page if not there
          setState(() {
            _selectedDrawerIndex = 0;
          });
          return false;
        } else if (widget.drawerItems[_selectedDrawerIndex] is HomePage) {
          // If on the Home page, close the app
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
            // Maintain state of drawer - including the selected item
            key: const PageStorageKey('drawer-state'),
            child: ListView.builder(
                padding: EdgeInsets.zero,
                itemCount: drawerOptions.length,
                itemBuilder: (context, index) {
                  return drawerOptions[index];
                }),
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
