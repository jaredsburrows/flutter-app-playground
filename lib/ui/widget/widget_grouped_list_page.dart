import 'package:flutter/material.dart';
import 'package:flutter_gradle_app_playground/ui/page_info.dart';
import 'package:grouped_list/grouped_list.dart';

// https://pub.dev/packages/grouped_list
// PLATFORM ANDROID IOS LINUX MACOS WEB WINDOWS
class WidgetGroupedListPage extends StatefulWidget implements PageInfo {
  const WidgetGroupedListPage({Key? key}) : super(key: key);

  @override
  String title() => 'Widget - Grouped List Page';

  @override
  IconData icon() => Icons.list;

  @override
  String route() => '/widget-grouped-list-page';

  @override
  _WidgetGroupedListPageState createState() => _WidgetGroupedListPageState();
}

List _elements = [
  {'name': 'John', 'group': 'Team A'},
  {'name': 'Will', 'group': 'Team B'},
  {'name': 'Beth', 'group': 'Team A'},
  {'name': 'Miranda', 'group': 'Team B'},
  {'name': 'Mike', 'group': 'Team C'},
  {'name': 'Danny', 'group': 'Team C'},
];

class _WidgetGroupedListPageState extends State<WidgetGroupedListPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GroupedListView<dynamic, String>(
        elements: _elements,
        groupBy: (element) => element['group'],
        groupComparator: (value1, value2) => value2.compareTo(value1),
        itemComparator: (item1, item2) =>
            item1['name'].compareTo(item2['name']),
        order: GroupedListOrder.DESC,
        useStickyGroupSeparators: true,
        groupSeparatorBuilder: (String value) => Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            value,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
        itemBuilder: (c, element) {
          return Card(
            elevation: 8.0,
            margin: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
            child: ListTile(
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
              leading: const Icon(Icons.account_circle),
              title: Text(element['name']),
              trailing: const Icon(Icons.arrow_forward),
            ),
          );
        },
      ),
    );
  }
}
