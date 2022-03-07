import 'package:flutter/material.dart';
import 'package:qr_code_dart_scan/qr_code_dart_scan.dart';

// https://pub.dev/packages/qr_code_dart_scan
// PLATFORM ANDROID IOS WEB
class QrCameraPage3 extends StatefulWidget {
  static const String title = 'Qr Camera Page 3';
  static const IconData icon = Icons.camera;
  static const String route = '/qr-camera-page-3';

  const QrCameraPage3({Key? key}) : super(key: key);

  @override
  State<QrCameraPage3> createState() => _QrCameraPage3State();
}

class _QrCameraPage3State extends State<QrCameraPage3> {
  Result? currentResult;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          QRCodeDartScanView(
            scanInvertedQRCode: true,
            onCapture: (Result result) {
              setState(() {
                currentResult = result;
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
                  Text('Text: ${currentResult?.text ?? 'Not found'}'),
                  Text(
                      'Format: ${currentResult?.barcodeFormat ?? 'Not found'}'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
