import 'package:flutter/material.dart';
import 'package:flutter_app_playground/ui/page_info.dart';

class HomePage extends StatefulWidget implements PageInfo {
  const HomePage({super.key});

  @override
  String title() => 'Home Page';

  @override
  IconData icon() => Icons.home;

  @override
  String route() => '/';

  @override
  State<HomePage> createState() => _HomePageState();
}

int _counter = 0;

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
}
