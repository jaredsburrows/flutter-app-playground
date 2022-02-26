import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_gradle_app_playground/app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp])
      .then((_) {
    runApp(const MyApp());
  });
}
