import 'package:flutter/material.dart';
import 'package:flutter_app_playground/ui/page_info.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

// https://pub.dev/packages/mobile_scanner
// PLATFORM ANDROID IOS MACOS
class QrCameraPage2 extends StatefulWidget implements PageInfo {
  const QrCameraPage2({Key? key}) : super(key: key);

  @override
  String title() => 'Qr Camera Page 2';

  @override
  IconData icon() => Icons.camera;

  @override
  String route() => '/qr-camera-page-2';

  @override
  State<QrCameraPage2> createState() => _QrCameraPageState2();
}

class _QrCameraPageState2 extends State<QrCameraPage2>
    with SingleTickerProviderStateMixin {
  String? _barcode;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Builder(builder: (context) {
        return Stack(
          children: [
            MobileScanner(
                fit: BoxFit.contain,
                // allowDuplicates: false,
                onDetect: (barcodes) {
                  setState(() {
                    _barcode = barcodes.barcodes[0].rawValue;
                  });
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
                            _barcode ?? 'Scan something!',
                            overflow: TextOverflow.fade,
                            style: Theme.of(context)
                                .textTheme
                                .headlineMedium!
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
