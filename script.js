var canvas =    document.getElementById("canvas"), 
                originalImage = null,
                imageGrey = null,
                imageRed = null,
                imageRainbow = null,
                imageBlur = null;

function loadImage(){
    var file =  document.getElementById("file");
    originalImage = new SimpleImage(file);
    imageGrey = new SimpleImage(file);
    imageRed = new SimpleImage(file);
    imageRainbow = new SimpleImage(file);
    imageBlur = new SimpleImage(file);

    originalImage.drawTo(canvas);
}
function filterGrey(){
    for(var pixel of imageGrey.values()){
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        imageGrey.setPixel(pixel.getX(), pixel.getY(), originalPixel);
    }
    for (var p of imageGrey.values()) {
        var avg = (p.getGreen() + p.getRed() + p.getBlue()) / 3;
        p.setRed(avg);
        p.setBlue(avg);
        p.setGreen(avg);
    }
    imageGrey.drawTo(canvas);
}
function printOriginal(img){
    img.drawTo(canvas);
}
function makeGrey(){
    if (imageGrey!= null){
        filterGrey();
    }
}
function makeRed(){
    for(var pixel of imageRed.values()){
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        imageRed.setPixel(pixel.getX(), pixel.getY(), originalPixel)
    }
    for (var pixel of imageRed.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
          pixel.setRed(2 * avg);
          pixel.setGreen(0);
          pixel.setBlue(0);
        } else {
          pixel.setRed(255);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(2 * avg - 255);
        }
    }
      imageRed.drawTo(canvas);
}
function makeRainbow(){
for (var pixel of imageRainbow.values()){
    var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());

    imageRainbow.setPixel(pixel.getX(), pixel.getY(), originalPixel);
}
    var height = imageRainbow.getHeight();
  for (var pixel of imageRainbow.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
  imageRainbow.drawTo(canvas);
}
function resetImage(){
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);
    printOriginal(originalImage);
}
function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}
function getPixelNearby (imageBlur, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, imageBlur.getWidth());
    var ny = ensureInImage(y + dy, imageBlur.getHeight());
    return image.getPixel(nx, ny);
}
function makeBlur(){
    for (var pixel of imageBlur.values()){
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
    
        imageBlur.setPixel(pixel.getX(), pixel.getY(), originalPixel);
    }
    for (var pixel of imageBlur.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        
        if (Math.random() > 0.5) {
            var other = getPixelNearby(imageBlur, x, y, 10);
            output.setPixel(x, y, other);
        }
        else {
            output.setPixel(x, y, pixel);
        }
    }
    imageBlur.drawTo(canvas);
}