import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app_playground/app.dart';
import 'package:url_strategy/url_strategy.dart';

List<CameraDescription> cameras = <CameraDescription>[];

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  setPathUrlStrategy();

  cameras = await availableCameras();

  runApp(const MyApp());
}
