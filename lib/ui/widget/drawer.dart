import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/ui/battery_info/batter_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/camera/camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/chart/chart_page.dart';
import 'package:flutter_gradle_app_playground/ui/home/home_page.dart';
import 'package:flutter_gradle_app_playground/ui/package_info/package_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/profile/profile_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page2.dart';
import 'package:flutter_gradle_app_playground/ui/qr_generator/qr_generator.dart';

int selectedIndex = 0;
int index = 0;

class AppDrawer extends StatefulWidget {
  const AppDrawer({Key? key}) : super(key: key);

  @override
  _AppDrawerState createState() => _AppDrawerState();
}

class _AppDrawerState extends State<AppDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          _createHeader(),
          PageListTile(
              icon: HomePage.icon,
              pageName: "${HomePage.title} (A/i/W)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => HomePage(),
                ));
              }),
          PageListTile(
              icon: BatteryInfoPage.icon,
              pageName: "${BatteryInfoPage.title} (A/i/W)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const BatteryInfoPage(),
                ));
              }),
          PageListTile(
              icon: CameraPage.icon,
              pageName: "${CameraPage.title} (A/i/W)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const CameraPage(),
                ));
              }),
          PageListTile(
              icon: ChartPage.icon,
              pageName: "${ChartPage.title} (A/i/W)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const ChartPage(),
                ));
              }),
          PageListTile(
              icon: PackageInfoPage.icon,
              pageName: "${PackageInfoPage.title} (A/i/W)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const PackageInfoPage(),
                ));
              }),
          PageListTile(
              icon: ProfilePage.icon,
              pageName: "${ProfilePage.title} (A/i/W)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const ProfilePage(),
                ));
              }),
          PageListTile(
              icon: QrCameraPage.icon,
              pageName: "${QrCameraPage.title} (A/i)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const QrCameraPage(),
                ));
              }),
          PageListTile(
              icon: QrCameraPage2.icon,
              pageName: "${QrCameraPage2.title} (A/i)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const QrCameraPage2(),
                ));
              }),
          PageListTile(
              icon: QrGeneratorPage.icon,
              pageName: "${QrGeneratorPage.title} (A/i/W)",
              isSelected: selectedIndex == index++,
              onTap: () {
                setState(() {
                  selectedIndex = index;
                });

                Navigator.of(context).pop();
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext context) => const QrGeneratorPage(),
                ));
              }),
          const Divider(),
          const AboutListTile(
            child: Text('About'),
            applicationName: 'Flutter Playground',
            applicationVersion: 'v1.0.0',
            applicationIcon: Icon(Icons.adb),
            icon: Icon(Icons.info),
          )
        ],
      ),
    );
  }

  Widget _createHeader() {
    return DrawerHeader(
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
              child: Text('Flutter Step-by-Step',
                  style:
                      TextStyle(fontSize: 20.0, fontWeight: FontWeight.w500))),
        ]));
  }
}

class PageListTile extends StatelessWidget {
  const PageListTile({
    Key? key,
    required this.icon,
    required this.pageName,
    required this.isSelected,
    this.onTap,
  }) : super(key: key);
  final IconData icon;
  final String pageName;
  final bool isSelected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      selected: isSelected,
      leading: Icon(icon),
      title: Text(pageName),
      onTap: onTap,
    );
  }
}
