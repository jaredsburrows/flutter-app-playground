import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/build_config.dart';
import 'package:flutter_gradle_app_playground/ui/home/home_page.dart';
import 'package:flutter_gradle_app_playground/ui/package_info/package_info_page.dart';

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
      initialRoute: HomePage.routeName,
      routes: <String, WidgetBuilder>{
        HomePage.routeName: (BuildContext context) => const HomePage(),
        PackageInfoPage.routeName: (BuildContext context) =>
            const PackageInfoPage(),
      },
    );
  }
}
