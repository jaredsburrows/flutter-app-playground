import 'package:flutter/material.dart';

abstract class PageInfo {
  String title() => "";

  IconData icon() => Icons.disabled_by_default_sharp;

  String route() => "";
}
