import 'package:flutter/material.dart';

abstract class PageInfo {
  String title() {
    return "";
  }

  IconData icon() {
    return Icons.disabled_by_default_sharp;
  }

  String route() {
    return "";
  }
}
