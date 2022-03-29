import 'package:flutter/material.dart';
import 'package:flutter_app_playground/build_config.dart';
import 'package:flutter_app_playground/ui/home/main_page.dart';

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
      home: const MainPage(),
    );
  }
}
