# 🎭 Truth or Dare – Friends

A real-time Truth or Dare party game to play online with your friends.

**🔗 Live Demo:** [https://game-s269.onrender.com](https://game-s269.onrender.com)

---

## 📖 About

Truth or Dare – Friends is a web-based version of the classic party game. Players join from their own devices, and the game is powered by a Node.js server using WebSockets so everyone stays in sync in real time. Truth and dare prompts are kept in a dedicated `prompts.js` file, making them easy to customize.

## ✨ Features

- 🌐 Play in the browser, no install needed for players
- ⚡ Real-time multiplayer over WebSockets
- 🎲 Random truth and dare prompts
- ✏️ Easily editable prompt list (`prompts.js`)
- ☁️ Ready to deploy on Render

## 🕹️ How to Play

1. Open the [live demo](https://game-s269.onrender.com).
2. Share the link with your friends so they can join.
3. When it's your turn, choose **Truth** or **Dare**.
4. Answer honestly or complete the challenge!

> **Note:** On Render's free tier, the app may take 30–60 seconds to wake up after inactivity.

## 🛠️ Tech Stack

- **Runtime:** Node.js (v18 or higher)
- **Real-time communication:** [ws](https://github.com/websockets/ws) (WebSocket library)
- **Frontend:** Static files served from `public/`
- **Hosting:** [Render](https://render.com)

## 📁 Project Structure

```
.
├── public/        # Frontend files served to the browser
├── prompts.js     # Truth and dare prompts
├── server.js      # Node.js + WebSocket server
├── package.json
└── README.md
```

## 🚀 Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/NIKITA0420-coder/game.git

# Move into the project folder
cd game

# Install dependencies
npm install

# Start the server
npm start
```

Then open the local address shown in your terminal (commonly `http://localhost:3000`) in your browser.

## ✏️ Customizing Prompts

Open `prompts.js` and add, edit, or remove truth and dare entries to match your group's style. Restart the server after making changes.

## ☁️ Deployment (Render)

1. Push the project to GitHub.
2. On Render, create a new **Web Service** and connect the repository.
3. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
4. Deploy.

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

[Add your license here, e.g. MIT]

## 👤 Author

**NIKITA0420-coder** – [GitHub](https://github.com/NIKITA0420-coder)
