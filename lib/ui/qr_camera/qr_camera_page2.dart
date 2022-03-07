import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

// https://pub.dev/packages/mobile_scanner
// PLATFORM ANDROID IOS MACOS
class QrCameraPage2 extends StatefulWidget {
  static const String title = 'Qr Camera Page 2';
  static const IconData icon = Icons.camera;
  static const String route = '/qr-camera-page-2';

  const QrCameraPage2({Key? key}) : super(key: key);

  @override
  State<QrCameraPage2> createState() => _QrCameraPageState2();
}

class _QrCameraPageState2 extends State<QrCameraPage2>
    with SingleTickerProviderStateMixin {
  String? barcode;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Builder(builder: (context) {
        return Stack(
          children: [
            MobileScanner(
                fit: BoxFit.contain,
                onDetect: (barcode, args) {
                  if (this.barcode != barcode.rawValue) {
                    setState(() {
                      this.barcode = barcode.rawValue;
                    });
                  }
                }),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                alignment: Alignment.bottomCenter,
                height: 100,
                color: Colors.black.withOpacity(0.4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Center(
                      child: SizedBox(
                        width: MediaQuery.of(context).size.width - 120,
                        height: 50,
                        child: FittedBox(
                          child: Text(
                            barcode ?? 'Scan something!',
                            overflow: TextOverflow.fade,
                            style: Theme.of(context)
                                .textTheme
                                .headline4!
                                .copyWith(color: Colors.white),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}
