import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/build_config.dart';
import 'package:flutter_gradle_app_playground/ui/battery_info/batter_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/home/home_page.dart';
import 'package:flutter_gradle_app_playground/ui/package_info/package_info_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page.dart';
import 'package:flutter_gradle_app_playground/ui/qr_camera/qr_camera_page2.dart';
import 'package:flutter_gradle_app_playground/ui/qr_generator/qr_generator.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: !BuildConfig.isRelease,
      title: 'Flutter Playground',
      theme: ThemeData(
        brightness: Brightness.light,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
      ),
      home: const HomePage(),
      initialRoute: HomePage.route,
      routes: <String, WidgetBuilder>{
        BatteryInfoPage.route: (BuildContext context) =>
            const BatteryInfoPage(),
        HomePage.route: (BuildContext context) => const HomePage(),
        PackageInfoPage.route: (BuildContext context) =>
            const PackageInfoPage(),
        QrCameraPage.route: (BuildContext context) =>
        const QrCameraPage(),
        QrCameraPage2.route: (BuildContext context) =>
        const QrCameraPage2(),
        QrGeneratorPage.route: (BuildContext context) =>
        const QrGeneratorPage(),
      },
    );
  }
}
