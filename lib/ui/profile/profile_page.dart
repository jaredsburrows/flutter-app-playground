import 'package:flutter/material.dart';
import 'package:flutter_app_playground/ui/page_info.dart';

class ProfilePage extends StatefulWidget implements PageInfo {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  String title() => 'Profile Page';

  @override
  IconData icon() => Icons.person;

  @override
  String route() => '/profile-page';

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    const user = UserPreferences.myUser;

    return Material(
      child: Builder(
        builder: (context) {
          return Scaffold(
            body: ListView(
              physics: const BouncingScrollPhysics(),
              children: [
                const SizedBox(height: 48),
                ProfileWidget(
                  imagePath: user.imagePath,
                  onClicked: () {
                    // Navigator.of(context).push(
                    //   MaterialPageRoute(builder: (context) => EditProfilePage()),
                    // );
                  },
                ),
                const SizedBox(height: 24),
                _buildName(user),
                const SizedBox(height: 24),
                Center(
                  child: _buildUpgradeButton(),
                ),
                const SizedBox(height: 24),
                const NumbersWidget(),
                const SizedBox(height: 48),
                _buildAbout(user),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildName(User user) {
    return Column(
      children: [
        Text(
          user.name,
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
        ),
        const SizedBox(height: 4),
        Text(
          user.email,
          style: const TextStyle(color: Colors.grey),
        )
      ],
    );
  }

  Widget _buildUpgradeButton() {
    return ButtonWidget(
      text: 'Upgrade To PRO',
      onClicked: () {},
    );
  }

  Widget _buildAbout(User user) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 48),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'About',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Text(
            user.about,
            style: const TextStyle(fontSize: 16, height: 1.4),
          ),
        ],
      ),
    );
  }
}

class ProfileWidget extends StatelessWidget {
  final String imagePath;
  final bool isEdit;
  final VoidCallback onClicked;

  const ProfileWidget({
    Key? key,
    required this.imagePath,
    this.isEdit = false,
    required this.onClicked,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.primary;

    return Center(
      child: Stack(
        children: [
          _buildImage(),
          Positioned(
            bottom: 0,
            right: 4,
            child: _buildEditIcon(color),
          ),
        ],
      ),
    );
  }

  Widget _buildImage() {
    final image = NetworkImage(imagePath);

    return ClipOval(
      child: Material(
        color: Colors.transparent,
        child: Ink.image(
          image: image,
          fit: BoxFit.cover,
          width: 128,
          height: 128,
          child: InkWell(onTap: onClicked),
        ),
      ),
    );
  }

  Widget _buildEditIcon(Color color) {
    return _buildCircle(
      color: Colors.white,
      all: 3,
      child: _buildCircle(
        color: color,
        all: 8,
        child: Icon(
          isEdit ? Icons.add_a_photo : Icons.edit,
          color: Colors.white,
          size: 20,
        ),
      ),
    );
  }

  Widget _buildCircle({
    required Widget child,
    required double all,
    required Color color,
  }) {
    return ClipOval(
      child: Container(
        padding: EdgeInsets.all(all),
        color: color,
        child: child,
      ),
    );
  }
}

class ButtonWidget extends StatelessWidget {
  final String text;
  final VoidCallback onClicked;

  const ButtonWidget({
    Key? key,
    required this.text,
    required this.onClicked,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.white,
        shape: const StadiumBorder(),
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
      ),
      onPressed: onClicked,
      child: Text(text),
    );
  }
}

class User {
  final String imagePath;
  final String name;
  final String email;
  final String about;
  final bool isDarkMode;

  const User({
    required this.imagePath,
    required this.name,
    required this.email,
    required this.about,
    required this.isDarkMode,
  });
}

class NumbersWidget extends StatelessWidget {
  const NumbersWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        _buildButton(context, '4.8', 'Ranking'),
        _buildDivider(),
        _buildButton(context, '35', 'Following'),
        _buildDivider(),
        _buildButton(context, '50', 'Followers'),
      ],
    );
  }

  Widget _buildDivider() {
    return const SizedBox(
      height: 24,
      child: VerticalDivider(),
    );
  }

  Widget _buildButton(BuildContext context, String value, String text) {
    return MaterialButton(
      padding: const EdgeInsets.symmetric(vertical: 4),
      onPressed: () {},
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Text(
            value,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
          const SizedBox(height: 2),
          Text(
            text,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}

class UserPreferences {
  static const myUser = User(
    imagePath: 'https://avatars.githubusercontent.com/u/1739848',
    name: 'Jared Burrows',
    email: 'jaredsburrows@gmail.com',
    about:
        'Jared S. Burrows was a seasoned software engineer who worked at Google from March 2018. He contributed to Android Messages and Google Home for Android, specifically optimizing dependencies in testing and development. His involvement with Android development extended back to 2011, and his work included various applications available on the Google Play Store. Prior to Google, Burrows served as a mobile engineer at Microsoft, where he worked on Yammer for Android, and at Yahoo, where he contributed to the Flurry project.',
    isDarkMode: false,
  );
}
