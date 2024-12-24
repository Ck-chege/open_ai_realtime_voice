# Voice Assistant Web Application

A real-time voice assistant web application built with React and Next.js, leveraging WebRTC for audio streaming and OpenAI's GPT-4 model for intelligent conversational capabilities. This project provides a seamless and interactive experience, allowing users to communicate with the assistant through voice commands.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Real-Time Voice Interaction:** Communicate with the assistant using your microphone.
- **WebRTC Integration:** Facilitates real-time audio streaming between the client and server.
- **Connection Status Indicators:** Visual cues to show connection states (connected, connecting, disconnected, failed).
- **Responsive UI:** User-friendly and responsive design compatible with various devices.
- **Error Alerts:** Notifies users of microphone access issues or connection problems.
- **Visual Feedback:** Dynamic icons and animations indicate listening status and connection health.

## Demo

![Voice Assistant Demo](path-to-your-demo-image.gif)

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [lucide-react](https://lucide.dev/) for icons

- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
  - [OpenAI API](https://openai.com/api/) for real-time conversational capabilities

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **OpenAI API Key**

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/voice-assistant.git
   cd voice-assistant
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Running the Application

Start the development server:

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
voice-assistant/
├── components/
│   └── ui/
│       └── alert.tsx
├── pages/
│   ├── api/
│   │   └── session.ts
│   └── index.tsx
├── public/
├── styles/
│   └── globals.css
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

- **components/ui/alert.tsx:** Custom Alert component for displaying error messages.
- **pages/api/session.ts:** API route to initiate a session with OpenAI.
- **pages/index.tsx:** Main React component for the voice assistant UI.
- **styles/globals.css:** Global CSS styles using Tailwind CSS.
- **.env.local:** Environment variables (not committed to version control).

## Usage

1. **Accessing the Application:**

   Navigate to [http://localhost:3000](http://localhost:3000) after starting the development server.

2. **Interacting with the Assistant:**

   - Upon loading, the application will request access to your microphone.
   - Once connected, the status will display "Ready to listen."
   - Speak into your microphone, and the assistant will process and respond in real-time.
   - Visual indicators will show listening status and connection health.

3. **Handling Errors:**

   - If microphone access is denied, an alert will prompt you to enable it.
   - Connection issues will also trigger alerts, informing you of the problem.

## Error Handling

- **Microphone Access Denied:**
  - Displays an alert prompting the user to enable microphone access.
  
- **Connection Errors:**
  - Logs errors to the console.
  - Shows an alert indicating the failure to establish a connection.

- **API Errors:**
  - Handles non-OK responses from the OpenAI API.
  - Displays appropriate error messages to the user.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

   Describe your changes and submit the pull request for review.


