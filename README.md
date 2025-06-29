# NASA Data Explorer

A full-stack web application to explore NASA's public APIs. Discover stunning images of space, browse Mars rover photos, and get a daily glimpse of Earth.

## 🌟 Live Demo

* **Frontend:** [https://nasa-frontend-j3ar.onrender.com](https://nasa-frontend-j3ar.onrender.com)
* **Backend:** [https://nasa-explorer-3km1.onrender.com](https://nasa-explorer-3km1.onrender.com)

## Features

* **Astronomy Picture of the Day (APOD)** - Daily stunning space images
* **Mars Rover Photos** - Browse photos from Curiosity, Opportunity, and Spirit rovers
* **Earth Polychromatic Imaging Camera (EPIC)** - View Earth from space
* **Global NASA Image Search** - Search through NASA's vast image collection
* **AI-powered Chatbot** - Get insights about space and NASA missions
* **Responsive Design** - Modern UI that works on all devices
* **Real-time Data** - Live updates from NASA APIs

## Tech Stack

* **Frontend:** React, CSS3, JavaScript
* **Backend:** Node.js, Express, Axios
* **APIs:** NASA Public APIs, OpenAI API
* **Deployment:** Render

## Getting Started

### Prerequisites

* Node.js (v18+)
* npm
* NASA API Key (get one [here](https://api.nasa.gov/))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ncived/NASA-Explorer.git
   cd NASA-Explorer
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with your API keys
   echo "NASA_API_KEY=your_nasa_api_key_here" > .env
   echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/apod` | Astronomy Picture of the Day |
| GET | `/api/mars?date=YYYY-MM-DD&rover=curiosity` | Mars Rover photos |
| POST | `/api/chatbot` | AI-powered chatbot |
| POST | `/api/ai-insight` | AI insights (mock) |

## Environment Variables

Create a `.env` file in the backend directory:

```env
NASA_API_KEY=your_nasa_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

## Project Structure

```
NASA-Explorer/
├── backend/
│   ├── index.js          # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── App.css      # Styles
│   │   └── index.js     # React entry point
│   └── package.json     # Frontend dependencies
└── README.md           # This file
```

## Features in Detail

### 🚀 Astronomy Picture of the Day
- Daily high-resolution space images
- Detailed descriptions and metadata
- Responsive image display

### 🪐 Mars Rover Photos
- Browse photos by date and rover
- Multiple rover support (Curiosity, Opportunity, Spirit)
- Camera filter options

### 🤖 AI Chatbot
- Powered by OpenAI GPT-3.5
- Space and NASA knowledge
- Interactive conversations

### 📱 Responsive Design
- Mobile-first approach
- Modern UI with space theme
- Smooth animations and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NASA APIs](https://api.nasa.gov/) for providing amazing space data
- [OpenAI](https://openai.com/) for AI capabilities
- The space exploration community for inspiration

---

**Star this repo if you found it helpful! ⭐**

## About

This project was created to explore NASA's vast collection of space data and make it accessible to everyone through a beautiful, interactive web interface. 