# CineBase

CineBase is a premium, high-performance React application inspired by the leading movie databases and streaming platforms. It features a fully responsive, visually stunning UI tailored specifically for showcasing movies, tracking box office hits, and curating an immersive browsing experience across all devices.

## Features

- **Premium Design System:** Dark-mode primary interface with glassmorphism effects, crisp gradients, and modern typography.
- **Ultra-Responsive:** Features a tailored mobile experience complete with standard 16:9 uncropped hero images and fluid touch-based carousels mimicking native mobile applications.
- **Visual Admin Dashboard:** A fully custom-built admin panel that allows editors to easily assign local images from the `/IMDBB` directory to the Hero Slider and Carousel categories via an intuitive visual grid layout.
- **Local Asset Management:** All configurations are seamlessly stored via `localStorage`, ensuring fast client-side performance without heavy backend requirements.
- **Zero-Clutter UI:** A streamlined navbar, tightly composed layout, and optimized content delivery focus purely on the visual assets and movie data.

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/imdb-react.git
   cd imdb-react
   ```

2. Install the dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

The application will start locally. By default, it runs on `http://localhost:3002`.

## Asset Management & The Admin Panel

CineBase is designed to handle visual assets quickly and locally. 

- All poster and hero images should be placed in the `public/IMDBB/` folder.
- You can access the **Admin Dashboard** via the hidden route `/admin`. 
- From the dashboard, you can visually select which images belong in the Hero section (prioritizing 16:9 images) and which belong in the Carousels (Fan Favorites & Top Picks). Your layout selections will automatically map the images across the entire website.

## Deployment

This project was bootstrapped with Vite. To build the project for production:

```bash
npm run build
```

This will create an optimized build inside the `dist` folder. You can deploy this directory to any static hosting service like Vercel, Netlify, or Firebase Hosting.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
