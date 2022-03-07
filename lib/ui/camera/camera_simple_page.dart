import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/main.dart';

// https://pub.dev/packages/camera
// PLATFORM ANDROID IOS WEB
class CameraSimplePage extends StatefulWidget {
  static const String title = 'Camera Simple Page';
  static const IconData icon = Icons.camera;
  static const String route = '/camera-simple-page';

  const CameraSimplePage({Key? key}) : super(key: key);

  @override
  _CameraSimplePageState createState() => _CameraSimplePageState();
}

class _CameraSimplePageState extends State<CameraSimplePage> {
  late CameraController controller;

  @override
  void initState() {
    super.initState();
    controller = CameraController(cameras[0], ResolutionPreset.max);
    controller.initialize().then((_) {
      if (!mounted) {
        return;
      }
      setState(() {});
    });
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!controller.value.isInitialized) {
      return Container();
    }
    return CameraPreview(controller);
  }
}
