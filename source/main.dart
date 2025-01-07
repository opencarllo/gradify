import 'dart:io';
import 'dart:math';
import 'package:image/image.dart';

void main() {
  const int width = 512;
  const int height = 512;

  final random = Random();
  final topLeft = _randomColor(random);
  final topRight = _randomColor(random);
  final bottomLeft = _randomColor(random);
  final bottomRight = _randomColor(random);

  final image = Image(width: width, height: height);

  for (int y = 0; y < height; y++) {
    for (int x = 0; x < width; x++) {
      final fx = x / (width - 1);
      final fy = y / (height - 1);

      final r = _bilinearInterpolate(topLeft[0], topRight[0], bottomLeft[0], bottomRight[0], fx, fy);
      final g = _bilinearInterpolate(topLeft[1], topRight[1], bottomLeft[1], bottomRight[1], fx, fy);
      final b = _bilinearInterpolate(topLeft[2], topRight[2], bottomLeft[2], bottomRight[2], fx, fy);

      image.setPixel(x, y, ColorInt8.rgb(r, g, b));
    }
  }

  final targetDirectory = Directory('../target');

  if (!targetDirectory.existsSync()) {
    targetDirectory.createSync();
  }

  File('${targetDirectory.absolute.path}/gradient-icon.png').writeAsBytesSync(encodePng(image));
}

List<int> _randomColor(Random random) {
  return [random.nextInt(256), random.nextInt(256), random.nextInt(256)];
}

int _bilinearInterpolate(int topLeft, int topRight, int bottomLeft, int bottomRight, double fx, double fy) {
  final top = topLeft + ((topRight - topLeft) * fx).round();
  final bottom = bottomLeft + ((bottomRight - bottomLeft) * fx).round();

  return top + ((bottom - top) * fy).round();
}