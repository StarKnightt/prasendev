# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🌟 Features

- **Responsive Design**: Looks great on all devices
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Blog Support**: MDX-based blog with syntax highlighting
- **Video Gallery**: YouTube video integration
- **Gadgets Shop**: Curated list of recommended products
- **Animations**: Smooth page transitions and micro-interactions
- **GitHub Integration**: Live GitHub contribution graph
- **GitHub Sponsors**: Display your GitHub sponsors with beautiful cards
- **Twitter/X Testimonials**: Showcase tweets about your work in a marquee
- **Command Palette**: Quick navigation with Ctrl+K / Cmd+K
- **Smooth Cursor**: Custom animated cursor effect
- **SEO Optimized**: Meta tags and OpenGraph support
- **Performance Focused**: Optimized for Core Web Vitals
- **Visitor Counter**: Real-time unique visitor tracking with Upstash Redis
- **Social Hover Cards**: Live GitHub profile and Steam status hover cards on social icons

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Content**: [MDX](https://mdxjs.com/)
- **Deployment**: [Vercel](https://vercel.com)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/StarKnightt/prasendev
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

1. Update `src/data/resume.tsx` with your personal information.
2. Add your blog posts in the `content` directory as MDX files.
3. Update `src/data/products.ts` to add your recommended products.
4. Customize theme colors in `tailwind.config.ts`.

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# GitHub Token (Required for GitHub Sponsors)
GITHUB_TOKEN=your_github_personal_access_token

# Upstash Redis (Required for Visitor Counter)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Steam Web API (Required for Steam Hover Card)
STEAM_API_KEY=your_steam_web_api_key
```

### Setting up GitHub Token

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Sponsors")
4. Select the following scopes:
   - `read:user` - Read user profile data
   - `read:org` - Read org membership (if applicable)
5. Click "Generate token" and copy it
6. Add it to your `.env.local` file

> **Note**: The token is used to fetch your GitHub sponsors. Without it, the sponsors section will show an error.

### Setting up Steam Web API Key

1. Go to [Steam Web API Key Registration](https://steamcommunity.com/dev/apikey)
2. Sign in with your Steam account
3. Enter your domain name and register
4. Copy the API key
5. Add it to your `.env.local` file
6. Update `VANITY_URL` in `src/app/api/steam-stats/route.ts` with your Steam vanity URL

> **Note**: The Steam API key is used for the Steam hover card which shows your live profile status, current game, level, and games count. Your Steam profile must be public for this to work.

## 🐦 Twitter/X Testimonials

To add testimonials from Twitter/X:

1. Open `src/components/twitter-testimonials.tsx`
2. Add tweet IDs to the `tweetIds` array:

```typescript
const tweetIds = [
  "1862049464807989608", // @username
  "1868648019119522142", // @another_user
  // Add more tweet IDs here
];
```

**To get a tweet ID:**
- Open the tweet on Twitter/X
- Copy the URL: `https://x.com/username/status/1234567890`
- The ID is the number at the end: `1234567890`

## 👁 Visitor Counter

The portfolio includes a unique visitor counter powered by Upstash Redis. It tracks real visitors without counting refreshes.

### How It Works

```
User visits site → Component fetches API → API checks cookie → Increment or not → Return count
```

1. **Component** (`visitor-counter.tsx`): Fetches count from API on page load
2. **API Route** (`/api/visitor-count`): Checks for cookie, increments count in Redis if new visitor
3. **Upstash Redis**: Stores the visitor count persistently in the cloud

### Key Features

| Feature | How |
|---------|-----|
| No duplicate counting | Cookie prevents re-counting for 24 hours |
| Persists across deploys | Count stored in external Redis database |
| Thread-safe | Redis `incr()` is atomic |
| Fast | Upstash is edge-optimized |

### Setting up Upstash Redis

1. Go to [upstash.com](https://upstash.com) and sign up
2. Click **Create Database** → Name it (e.g., `portfolio-visitors`)
3. Select a region close to your users
4. After creation, go to the **REST API** section
5. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
6. Add them to your `.env.local` file:

```env
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-secret-token
```

7. For Vercel deployment, add these in **Settings → Environment Variables**

> **Note**: Without these environment variables, the visitor counter will show 0.

## 💖 GitHub Sponsors

The portfolio automatically displays your GitHub sponsors. Features include:
- Sponsor avatar, name, and username
- Beautiful card design with hover effects
- "Sponsor me" button linking to your GitHub Sponsors page

To customize, edit `src/components/github-sponsors.tsx`.

## 📁 Project Structure

```
├── content/          # Blog posts (MDX)
├── public/           # Static assets
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # React components
│   ├── data/        # Data files and types
│   └── lib/         # Utility functions
```

## 🎨 Customization

### Theme

The theme can be customized in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...},
    }
  }
}
```

### Content

Update the following files to customize content:

- `src/data/resume.tsx`: Personal information and experience
- `src/data/products.ts`: Recommended products
- `content/*.mdx`: Blog posts

## 📝 Adding Blog Posts

Create a new MDX file in the `content` directory:

```mdx
---
title: "Your Post Title"
publishedAt: "2024-01-01"
summary: "Brief description of your post"
---

Your content here...
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📱 Progressive Web App

This website is PWA-ready with:
- Service Worker support
- Offline functionality
- Install prompt
- App manifest

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=StarKnightt/prasendev&type=Date)](https://www.star-history.com/#StarKnightt/prasendev&Date)


## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework

## 📧 Contact

Your Name - [@Prasenjit](https://twitter.com/Star_Knight12)

Project Link: [Try it here](https://prasen.dev)