import 'package:flutter/material.dart';
import 'package:flutter_app_playground/ui/page_info.dart';
import 'package:qr_code_dart_scan/qr_code_dart_scan.dart';

// https://pub.dev/packages/qr_code_dart_scan
// PLATFORM ANDROID IOS WEB
class QrCameraPage3 extends StatefulWidget implements PageInfo {
  const QrCameraPage3({Key? key}) : super(key: key);

  @override
  String title() => 'Qr Camera Page 3';

  @override
  IconData icon() => Icons.camera;

  @override
  String route() => '/qr-camera-page-3';

  @override
  State<QrCameraPage3> createState() => _QrCameraPage3State();
}

class _QrCameraPage3State extends State<QrCameraPage3> {
  Result? _currentResult;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          QRCodeDartScanView(
            scanInvertedQRCode: true,
            onCapture: (Result result) {
              setState(() {
                _currentResult = result;
              });
            },
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.all(20),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Text: ${_currentResult?.text ?? 'Not found'}'),
                  Text(
                      'Format: ${_currentResult?.barcodeFormat ?? 'Not found'}'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
