const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const csorsOptions = {
    origin: "https://127.0.0.1:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
  };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(csorsOptions));

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.post('/api/upload', (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }

  const imageFile = req.files.image;

  // Save the uploaded image to the 'public/uploads' folder
  const uploadPath = path.join(__dirname, 'public', 'uploads', imageFile.name);

  imageFile.mv(uploadPath, (error) => {
    if (error) {
      return res.status(500).json({ error: 'Error saving the image.' });
    }

    res.status(200).json({ message: 'Image uploaded successfully.' });
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});