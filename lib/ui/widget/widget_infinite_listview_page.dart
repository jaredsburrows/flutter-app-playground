import 'package:flutter/material.dart';
import 'package:flutter_app_playground/ui/page_info.dart';
import 'package:infinite_listview/infinite_listview.dart';

// https://pub.dev/packages/infinite_listview
// PLATFORM ANDROID IOS LINUX MACOS WEB WINDOWS
class WidgetInfiniteListviewPage extends StatefulWidget implements PageInfo {
  const WidgetInfiniteListviewPage({Key? key}) : super(key: key);

  @override
  String title() => 'Widget - Infinite Listview Page';

  @override
  IconData icon() => Icons.list;

  @override
  String route() => '/widget-infinite-listview-page';

  @override
  State<WidgetInfiniteListviewPage> createState() =>
      _WidgetInfiniteListviewPageState();
}

class _WidgetInfiniteListviewPageState
    extends State<WidgetInfiniteListviewPage> {
  final InfiniteScrollController _infiniteController = InfiniteScrollController(
    initialScrollOffset: 0.0,
  );

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Example'),
          actions: <Widget>[
            IconButton(
              icon: const Icon(Icons.arrow_downward),
              onPressed: () {
                _infiniteController.animateTo(
                    _infiniteController.offset + 2000.0,
                    duration: const Duration(milliseconds: 250),
                    curve: Curves.easeIn);
              },
            ),
            IconButton(
              icon: const Icon(Icons.arrow_upward),
              onPressed: () {
                _infiniteController.animateTo(
                    _infiniteController.offset - 2000.0,
                    duration: const Duration(milliseconds: 250),
                    curve: Curves.easeIn);
              },
            ),
          ],
          bottom: const TabBar(
            tabs: <Widget>[
              Tab(text: 'First'),
              Tab(text: 'Second'),
              Tab(text: 'Third'),
            ],
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            _buildTab(0),
            _buildTab(1),
            _buildTab(2),
          ],
        ),
      ),
    );
  }

  Widget _buildTab(int tab) {
    return InfiniteListView.separated(
      key: PageStorageKey(tab),
      controller: _infiniteController,
      itemBuilder: (BuildContext context, int index) {
        return Material(
          child: InkWell(
            onTap: () {},
            child: ListTile(
              title: Text('Tab $tab Item #$index'),
              subtitle: Text('Subtitle $index'),
              trailing: const Icon(Icons.chevron_right),
            ),
          ),
        );
      },
      separatorBuilder: (BuildContext context, int index) =>
          const Divider(height: 2.0),
      anchor: 0.5,
    );
  }
}
