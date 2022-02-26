class BuildConfig {
  static const isRelease = bool.fromEnvironment('RELEASE', defaultValue: false);
}
