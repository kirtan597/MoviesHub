# 🎬 KPXHub - Modern Movie Streaming Platform

A stunning, feature-rich movie streaming platform built with React, TypeScript, and modern web technologies. Experience cinema like never before with our sleek interface and powerful features.

![KPXHub Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=KPXHub+Movie+Platform)

## ✨ Features

### 🎭 **Movie Discovery**
- Browse popular, top-rated, upcoming, and now-playing movies
- Advanced search functionality with real-time results
- Genre-based filtering and categorization
- Detailed movie information with ratings and descriptions

### 🔐 **User Authentication**
- Secure user registration and login system
- Themed authentication modals (Volcano 🌋 & Aurora 🌌)
- Persistent user sessions with localStorage
- Custom success/error notifications with explosive animations

### ❤️ **Personal Collections**
- Add movies to favorites with heart animations
- Create watchlist for movies to watch later
- Persistent storage across browser sessions
- Easy access through header navigation

### 🎨 **Modern UI/UX**
- Glassmorphism design with backdrop blur effects
- Dynamic gradient backgrounds with live animations
- Responsive design for all device sizes
- Smooth micro-interactions and hover effects
- Custom toast notifications with bomb-like animations

### 🌙 **Theme System**
- Dark/Light mode toggle
- Dynamic color schemes
- Consistent theming across all components

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: The Movie Database (TMDB)
- **Build Tool**: Vite
- **State Management**: React Hooks + localStorage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kirtan597/MoviesHub.git
   cd MoviesHub/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in project root
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔑 Getting TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key
5. Add it to your `.env` file

## 🎯 Usage

### Authentication Flow
1. **Sign Up**: Create account with name, email, and password
2. **Sign In**: Login with registered credentials
3. **Access Features**: Enjoy favorites and watchlist functionality

### Movie Discovery
1. **Browse Categories**: Popular, Top Rated, Upcoming, Now Playing
2. **Search Movies**: Use the search bar for specific titles
3. **Filter by Genre**: Click genre tags for targeted browsing
4. **View Details**: Click any movie for detailed information

### Personal Collections
1. **Add to Favorites**: Click the heart icon on any movie
2. **Add to Watchlist**: Click the bookmark icon
3. **Access Collections**: Use header navigation to view your lists

## 🏗️ Project Structure

```
project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation with auth
│   │   ├── AuthModal.tsx    # Themed login/signup
│   │   ├── MovieGrid.tsx    # Movie display grid
│   │   ├── Toast.tsx        # Notification system
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   ├── types/               # TypeScript definitions
│   ├── utils/               # Helper functions
│   └── index.css           # Global styles
├── public/                  # Static assets
└── README.md
```

## 🎨 Key Components

- **Header**: Dynamic navigation with auth integration
- **AuthModal**: Themed authentication with volcano/aurora designs
- **MovieGrid**: Responsive movie display with animations
- **CategoryTabs**: Genre and category filtering
- **Toast**: Explosive notification animations
- **UserProfile**: Account management dropdown

## 🌟 Highlights

- **Performance Optimized**: Fast loading with optimized animations
- **Responsive Design**: Works perfectly on all devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern Architecture**: Clean, maintainable React code
- **Type Safety**: Full TypeScript implementation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

## 📞 Contact

**Kirtan** - [@kirtan597](https://github.com/kirtan597)

Project Link: [https://github.com/kirtan597/MoviesHub](https://github.com/kirtan597/MoviesHub)

---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️ and lots of ☕*