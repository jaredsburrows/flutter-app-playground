import 'package:flutter/material.dart';
import 'package:flutter_app_playground/ui/page_info.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

// https://pub.dev/packages/mobile_scanner
// PLATFORM ANDROID IOS MACOS
class QrCameraPage extends StatefulWidget implements PageInfo {
  const QrCameraPage({Key? key}) : super(key: key);

  @override
  String title() => 'Qr Camera Page';

  @override
  IconData icon() => Icons.camera;

  @override
  String route() => '/qr-camera-page';

  @override
  State<QrCameraPage> createState() => _QrCameraPageState();
}

class _QrCameraPageState extends State<QrCameraPage>
    with SingleTickerProviderStateMixin {
  String? _barcode;

  MobileScannerController controller = MobileScannerController(
    torchEnabled: true,
    // formats: [BarcodeFormat.qrCode]
    // facing: CameraFacing.front,
  );

  bool isStarted = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Builder(builder: (context) {
        return Stack(
          children: [
            MobileScanner(
                controller: controller,
                fit: BoxFit.contain,
                // allowDuplicates: true,
                // controller: MobileScannerController(
                //   torchEnabled: true,
                //   facing: CameraFacing.front,
                // ),
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
                    IconButton(
                      color: Colors.white,
                      icon: ValueListenableBuilder(
                        valueListenable: controller.torchState,
                        builder: (context, state, child) {
                          switch (state) {
                            case TorchState.off:
                              return const Icon(Icons.flash_off,
                                  color: Colors.grey);
                            case TorchState.on:
                              return const Icon(Icons.flash_on,
                                  color: Colors.yellow);
                          }
                        },
                      ),
                      iconSize: 32.0,
                      onPressed: () => controller.toggleTorch(),
                    ),
                    IconButton(
                        color: Colors.white,
                        icon: isStarted
                            ? const Icon(Icons.stop)
                            : const Icon(Icons.play_arrow),
                        iconSize: 32.0,
                        onPressed: () => setState(() {
                              isStarted
                                  ? controller.stop()
                                  : controller.start();
                              isStarted = !isStarted;
                            })),
                    Center(
                      child: SizedBox(
                        width: MediaQuery.of(context).size.width - 200,
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
                    IconButton(
                      color: Colors.white,
                      icon: ValueListenableBuilder(
                        valueListenable: controller.cameraFacingState,
                        builder: (context, state, child) {
                          switch (state) {
                            case CameraFacing.front:
                              return const Icon(Icons.camera_front);
                            case CameraFacing.back:
                              return const Icon(Icons.camera_rear);
                          }
                        },
                      ),
                      iconSize: 32.0,
                      onPressed: () => controller.switchCamera(),
                    ),
                    IconButton(
                      color: Colors.white,
                      icon: const Icon(Icons.image),
                      iconSize: 32.0,
                      onPressed: () async {
                        final ImagePicker picker = ImagePicker();
                        // Pick an image
                        final XFile? image =
                            await picker.pickImage(source: ImageSource.gallery);
                        if (image != null) {
                          if (await controller.analyzeImage(image.path)) {
                            ScaffoldMessenger.of(this.context)
                                .showSnackBar(const SnackBar(
                              content: Text('Barcode found!'),
                              backgroundColor: Colors.green,
                            ));
                          } else {
                            ScaffoldMessenger.of(this.context)
                                .showSnackBar(const SnackBar(
                              content: Text('No barcode found!'),
                              backgroundColor: Colors.red,
                            ));
                          }
                        }
                      },
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
