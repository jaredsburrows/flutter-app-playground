import 'dart:async';

import 'package:battery_plus/battery_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/ui/page_info.dart';
import 'package:flutter_gradle_app_playground/ui/widget/drawer.dart';

// https://pub.dev/packages/battery_plus
// ANDROID IOS LINUX MACOS WEB WINDOWS
class BatteryPage extends StatefulWidget implements PageInfo {
  const BatteryPage({Key? key}) : super(key: key);

  @override
  String title() => 'Battery Page';

  @override
  IconData icon() => Icons.battery_full_outlined;

  @override
  String route() => '/battery-page';

  @override
  _BatteryPageState createState() => _BatteryPageState();
}

class _BatteryPageState extends State<BatteryPage> {
  final Battery _battery = Battery();

  BatteryState? _batteryState;
  StreamSubscription<BatteryState>? _batteryStateSubscription;

  @override
  void initState() {
    super.initState();
    _battery.batteryState.then(_updateBatteryState);
    _batteryStateSubscription =
        _battery.onBatteryStateChanged.listen(_updateBatteryState);
  }

  @override
  void dispose() {
    super.dispose();
    if (_batteryStateSubscription != null) {
      _batteryStateSubscription!.cancel();
    }
  }

  void _updateBatteryState(BatteryState state) {
    if (_batteryState == state) return;
    setState(() {
      _batteryState = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const AppDrawer(),
      body: Column(
        children: <Widget>[
          _infoTile('Battery State', '$_batteryState'),
          ElevatedButton(
            onPressed: () async {
              final batteryLevel = await _battery.batteryLevel;
              // ignore: unawaited_futures
              showDialog<void>(
                context: context,
                builder: (_) => AlertDialog(
                  content: Text('Battery: $batteryLevel%'),
                  actions: <Widget>[
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('OK'),
                    )
                  ],
                ),
              );
            },
            child: const Text('Get battery level'),
          ),
          ElevatedButton(
              onPressed: () async {
                final isInPowerSaveMode = await _battery.isInBatterySaveMode;
                // ignore: unawaited_futures
                showDialog<void>(
                  context: context,
                  builder: (_) => AlertDialog(
                    content: Text('Is on low power mode: $isInPowerSaveMode'),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: const Text('OK'),
                      )
                    ],
                  ),
                );
              },
              child: const Text('Is on low power mode'))
        ],
      ),
    );
  }

  Widget _infoTile(String title, String subtitle) {
    return ListTile(
      title: Text(title),
      subtitle: Text(subtitle.isEmpty ? 'Not set' : subtitle),
    );
  }
}
