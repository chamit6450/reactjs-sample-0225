# Task Board - Web3-Enabled Task Management

A modern, decentralized task management application built with Next.js, Web3, and Tailwind CSS. This application allows users to manage their tasks using their Ethereum wallet, providing a secure and decentralized way to track and organize tasks.

![image](https://github.com/user-attachments/assets/2439d224-b821-4627-bbf9-baf99924d8d2)


## Features

- 🔐 **Web3 Authentication**: Connect your Ethereum wallet to manage tasks
- 📱 **Modern UI**: Clean, responsive interface with dark mode support
- 🎯 **Task Management**: Create, update, and delete tasks
- 📊 **Status Tracking**: Track tasks through different stages (To Do, In Progress, Done)
- 🎨 **Drag and Drop**: Intuitive drag-and-drop interface for task organization
- 🌙 **Dark Mode**: Beautiful dark theme with glassmorphism effects
- 🔄 **Real-time Updates**: Instant updates when tasks are modified
- 🔒 **Decentralized**: Tasks are associated with your wallet address

## Tech Stack

- **Frontend**:
  - Next.js 14 (App Router)
  - React
  - Tailwind CSS
  - Framer Motion
  - React Beautiful DnD
  - Wagmi (Web3)

- **Backend**:
  - Next.js API Routes
  - MongoDB
  - Mongoose

- **Authentication**:
  - Ethereum Wallet (MetaMask)
  - Web3.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or any Ethereum wallet
- MongoDB instance
- Git

### Important Notes

- This project uses React 18.x and is not compatible with React 19
- Make sure to use the exact versions specified in package.json
- If you encounter dependency conflicts, use:
  ```bash
  npm install --legacy-peer-deps
  ```

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-board.git
   cd task-board
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # MongoDB Connection
   MONGO_URI=your_mongodb_connection_string

   # Optional: Configure your preferred network
   NEXT_PUBLIC_NETWORK=sepolia  # or mainnet, goerli, etc.
   ```

4. **Database Setup**:
   - Install MongoDB locally or use MongoDB Atlas
   - For local MongoDB:
     ```bash
     # Ubuntu/Debian
     sudo apt-get install mongodb

     # macOS with Homebrew
     brew tap mongodb/brew
     brew install mongodb-community

     # Start MongoDB service
     sudo service mongodb start  # Ubuntu/Debian
     brew services start mongodb-community  # macOS
     ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Access the application**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Make sure MetaMask is installed and configured
   - Connect your wallet to the application

### Development Workflow

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Run tests** :
   ```bash
   npm test
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

### Common Issues and Solutions

1. **MongoDB Connection Issues**:
   - Ensure MongoDB service is running
   - Check if the connection string in `.env.local` is correct
   - Verify network connectivity to MongoDB instance

2. **Web3 Connection Issues**:
   - Make sure MetaMask is installed and unlocked
   - Check if you're connected to the correct network
   - Clear browser cache if connection issues persist

3. **Build Issues**:
   - Clear Next.js cache: `rm -rf .next`
   - Remove node_modules and reinstall: 
     ```bash
     rm -rf node_modules
     npm install
     ```

### Deployment

1. **Vercel Deployment**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy to Vercel
   vercel
   ```

2. **Environment Variables**:
   Make sure to set these in your Vercel project settings:
   - `MONGO_URI`: Your MongoDB connection string
   - `NEXT_PUBLIC_NETWORK`: Your preferred Ethereum network (e.g., sepolia)

3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install --legacy-peer-deps`

4. **Troubleshooting Deployment**:
   If you encounter build errors:
   - Clear the Vercel cache
   - Ensure all environment variables are set
   - Check the build logs for specific errors
   - Make sure you're using the correct Node.js version

## Usage

1. **Connect Wallet**:
   - Click the "Connect Wallet" button
   - Approve the connection in your MetaMask

2. **Create Task**:
   - Click "Create Task" button
   - Fill in the task details
   - Submit the form

3. **Manage Tasks**:
   - Drag and drop tasks between columns
   - Click the delete icon to remove tasks
   - Tasks are automatically saved

## Project Structure

```
task-board/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── components/     # React components
│   │   └── page.tsx        # Main page
│   ├── lib/                # Utility functions and contexts
│   └── components/         # Shared components
├── public/                 # Static files
└── package.json           # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Wagmi](https://wagmi.sh/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)

