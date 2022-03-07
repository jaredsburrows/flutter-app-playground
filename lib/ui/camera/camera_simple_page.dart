import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/main.dart';
import 'package:flutter_gradle_app_playground/ui/page_info.dart';

// https://pub.dev/packages/camera
// PLATFORM ANDROID IOS WEB
class CameraSimplePage extends StatefulWidget implements PageInfo {
  const CameraSimplePage({Key? key}) : super(key: key);

  @override
  String title() => 'Camera Simple Page';

  @override
  IconData icon() => Icons.camera;

  @override
  String route() => '/camera-simple-page';

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
