export default function handler(req, res) {
    // Logika bisnis untuk API route
    const data = {
      message: "Hello, API!"
    };
  
    res.status(200).json(data);
  }
  