import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:share_plus/share_plus.dart';

// https://pub.dev/packages/share_plus
// PLATFORM ANDROID IOS LINUX MACOS WEB WINDOWS
class SharePage extends StatefulWidget {
  static const String title = 'Share Page';
  static const IconData icon = Icons.share;
  static const String route = '/share-page';

  const SharePage({Key? key}) : super(key: key);

  @override
  _SharePageState createState() => _SharePageState();
}

class _SharePageState extends State<SharePage> {
  String text = '';
  String subject = '';
  List<String> imagePaths = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
          child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            TextField(
              decoration: const InputDecoration(
                labelText: 'Share text:',
                hintText: 'Enter some text and/or link to share',
              ),
              maxLines: 2,
              onChanged: (String value) => setState(() {
                text = value;
              }),
            ),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Share subject:',
                hintText: 'Enter subject to share (optional)',
              ),
              maxLines: 2,
              onChanged: (String value) => setState(() {
                subject = value;
              }),
            ),
            const Padding(padding: EdgeInsets.only(top: 12.0)),
            ImagePreviews(imagePaths, onDelete: _onDeleteImage),
            ListTile(
              leading: const Icon(Icons.add),
              title: const Text('Add image'),
              onTap: () async {
                final imagePicker = ImagePicker();
                final pickedFile = await imagePicker.pickImage(
                  source: ImageSource.gallery,
                );
                if (pickedFile != null) {
                  setState(() {
                    imagePaths.add(pickedFile.path);
                  });
                }
              },
            ),
            const Padding(padding: EdgeInsets.only(top: 12.0)),
            Builder(
              builder: (BuildContext context) {
                return ElevatedButton(
                  onPressed: text.isEmpty && imagePaths.isEmpty
                      ? null
                      : () => _onShare(context),
                  child: const Text('Share'),
                );
              },
            ),
          ],
        ),
      )),
    );
  }

  void _onDeleteImage(int position) {
    setState(() {
      imagePaths.removeAt(position);
    });
  }

  void _onShare(BuildContext context) async {
    // A builder is used to retrieve the context immediately
    // surrounding the ElevatedButton.
    //
    // The context's `findRenderObject` returns the first
    // RenderObject in its descendent tree when it's not
    // a RenderObjectWidget. The ElevatedButton's RenderObject
    // has its position and size after it's built.
    final box = context.findRenderObject() as RenderBox?;

    if (imagePaths.isNotEmpty) {
      await Share.shareFiles(imagePaths,
          text: text,
          subject: subject,
          sharePositionOrigin: box!.localToGlobal(Offset.zero) & box.size);
    } else {
      await Share.share(text,
          subject: subject,
          sharePositionOrigin: box!.localToGlobal(Offset.zero) & box.size);
    }
  }
}

/// Widget for displaying a preview of images
class ImagePreviews extends StatelessWidget {
  /// The image paths of the displayed images
  final List<String> imagePaths;

  /// Callback when an image should be removed
  final Function(int)? onDelete;

  /// Creates a widget for preview of images. [imagePaths] can not be empty
  /// and all contained paths need to be non empty.
  const ImagePreviews(this.imagePaths, {Key? key, this.onDelete})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (imagePaths.isEmpty) {
      return Container();
    }

    final imageWidgets = <Widget>[];
    for (var i = 0; i < imagePaths.length; i++) {
      imageWidgets.add(_ImagePreview(
        imagePaths[i],
        onDelete: onDelete != null ? () => onDelete!(i) : null,
      ));
    }

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(children: imageWidgets),
    );
  }
}

class _ImagePreview extends StatelessWidget {
  final String imagePath;
  final VoidCallback? onDelete;

  const _ImagePreview(this.imagePath, {Key? key, this.onDelete})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final imageFile = File(imagePath);
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Stack(
        children: <Widget>[
          ConstrainedBox(
            constraints: const BoxConstraints(
              maxWidth: 200,
              maxHeight: 200,
            ),
            child: Image.file(imageFile),
          ),
          Positioned(
            right: 0,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: FloatingActionButton(
                  backgroundColor: Colors.red,
                  onPressed: onDelete,
                  child: const Icon(Icons.delete)),
            ),
          ),
        ],
      ),
    );
  }
}
