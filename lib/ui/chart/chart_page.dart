import 'dart:io';

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/ui/chart/line_chart_page.dart';
import 'package:flutter_gradle_app_playground/ui/widget/drawer.dart';

// https://pub.dev/packages/fl_chart
// PLATFORM ANDROID IOS LINUX MACOS WEB WINDOWS
class ChartPage extends StatefulWidget {
  static const String title = 'Chart Page';
  static const IconData icon = Icons.show_chart;
  static const String route = '/chart-page';

  const ChartPage({Key? key}) : super(key: key);

  @override
  _ChartPageState createState() => _ChartPageState();
}

class _ChartPageState extends State<ChartPage> {
  int _currentPage = 0;

  final _controller = PageController(initialPage: 0);
  final _duration = const Duration(milliseconds: 300);
  final _curve = Curves.easeInOutCubic;
  final _pages = const [
    LineChartPage(),
    // BarChartPage(),
    // BarChartPage2(),
    // PieChartPage(),
    // LineChartPage2(),
    // LineChartPage3(),
    // LineChartPage4(),
    // BarChartPage3(),
    // ScatterChartPage(),
    // RadarChartPage(),
  ];

  bool get isDesktopOrWeb => PlatformInfo().isDesktopOrWeb();

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      setState(() {
        _currentPage = _controller.page!.round();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const AppDrawer(),
      body: SafeArea(
        child: PageView(
          physics: isDesktopOrWeb
              ? const NeverScrollableScrollPhysics()
              : const AlwaysScrollableScrollPhysics(),
          controller: _controller,
          children: _pages,
        ),
      ),
      bottomNavigationBar: isDesktopOrWeb
          ? Container(
              padding: const EdgeInsets.all(16),
              color: Colors.transparent,
              child: Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Visibility(
                    visible: _currentPage != 0,
                    child: FloatingActionButton(
                      onPressed: () => _controller.previousPage(
                          duration: _duration, curve: _curve),
                      child: const Icon(Icons.chevron_left_rounded),
                    ),
                  ),
                  const Spacer(),
                  Visibility(
                    visible: _currentPage != _pages.length - 1,
                    child: FloatingActionButton(
                      onPressed: () => _controller.nextPage(
                          duration: _duration, curve: _curve),
                      child: const Icon(Icons.chevron_right_rounded),
                    ),
                  ),
                ],
              ),
            )
          : null,
    );
  }
}

class PlatformInfo {
  bool isDesktopOS() =>
      Platform.isMacOS || Platform.isLinux || Platform.isWindows;

  bool isAppOS() => Platform.isMacOS || Platform.isAndroid;

  bool isWeb() => kIsWeb;

  bool isDesktopOrWeb() => isWeb() || isDesktopOS();

  PlatformType getCurrentPlatformType() {
    if (kIsWeb) {
      return PlatformType.web;
    }
    if (Platform.isMacOS) {
      return PlatformType.macOS;
    }
    if (Platform.isFuchsia) {
      return PlatformType.fuchsia;
    }
    if (Platform.isLinux) {
      return PlatformType.linux;
    }
    if (Platform.isWindows) {
      return PlatformType.windows;
    }
    if (Platform.isIOS) {
      return PlatformType.iOS;
    }
    if (Platform.isAndroid) {
      return PlatformType.android;
    }
    return PlatformType.unknown;
  }
}

enum PlatformType { web, iOS, android, macOS, fuchsia, linux, windows, unknown }
