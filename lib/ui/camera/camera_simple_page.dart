import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app_playground/main.dart';
import 'package:flutter_app_playground/ui/page_info.dart';

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
  State<CameraSimplePage> createState() => _CameraSimplePageState();
}

class _CameraSimplePageState extends State<CameraSimplePage> {
  late CameraController _controller;

  @override
  void initState() {
    super.initState();
    _controller = CameraController(cameras[0], ResolutionPreset.max);
    _controller.initialize().then((_) {
      if (!mounted) {
        return;
      }
      setState(() {});
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_controller.value.isInitialized) {
      return Container();
    }
    return CameraPreview(_controller);
  }
}
