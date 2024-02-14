document.getElementById('fileInput').addEventListener('change', function() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  if (file) {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');

      var img = new Image();
      img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          document.getElementById('uploadedImage').src = img.src;
          document.getElementById('uploadedImage').style.display = 'block';
      };

      var reader = new FileReader();
      reader.onload = function(e) {
          img.src = e.target.result;
      };
      reader.readAsDataURL(file);
  }
});

document.getElementById('convertButton').addEventListener('click', function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var quality = document.getElementById('qualityBar').value / 100;
  var processingMessage = document.getElementById('processingMessage');

  // Resize the image before converting to JPEG
  var img = new Image();
  img.onload = function() {
      var maxWidth = 800; // Max width for the resized image
      var maxHeight = 600; // Max height for the resized image
      var width = img.width;
      var height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
          var ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      var jpegData = canvas.toDataURL('image/jpeg', quality);
      var link = document.createElement('a');
      link.href = jpegData;
      link.download = 'converted_image.jpg';

      // Show the download button
      document.getElementById('downloadButton').style.display = 'inline-block';

      // Show processing message
      processingMessage.style.display = 'block';
  };
  img.src = document.getElementById('canvas').toDataURL(); // Use the canvas data directly
});

document.getElementById('downloadButton').addEventListener('click', function() {
  var link = document.createElement('a');
  link.href = document.getElementById('canvas').toDataURL('image/jpeg');
  link.download = 'converted_image.jpg';
  link.click();
});

document.getElementById('qualityBar').addEventListener('input', function() {
  var qualityValue = document.getElementById('qualityBarValue');
  var qualityBar = document.getElementById('qualityBar');
  qualityValue.textContent = qualityBar.value + '%';
});
