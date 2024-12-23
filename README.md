# OpenSauce 🚀

OpenSauce is a modern GitHub project discovery platform that helps developers find and explore open-source projects. Built with Next.js, Tailwind CSS, and the GitHub API, it provides an intuitive interface to search and filter through GitHub repositories.

## Features ✨

### Smart Search Filters
- **🔍 Best Match**: GitHub's intelligent search ranking
- **⭐ Most Stars**: Popular and well-established projects
- **🌱 Beginner Friendly**: Projects with good first issues, perfect for new contributors
- **🔥 Recently Active**: Projects with recent updates and active maintenance
- **📈 Trending**: New projects gaining traction in 2024

### Project Insights
For each repository, you can see:
- Star count and language
- Number of forks and watchers
- Open issues count
- Last update date
- Direct links to GitHub

### User Experience
- **Dark Mode**: Built-in dark/light theme support
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Instant search results
- **Load More**: Pagination for exploring more projects
- **Tooltips**: Helpful descriptions for each filter

## Tech Stack 💻

- [Next.js 14](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [GitHub REST API](https://docs.github.com/en/rest) - Data Source
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark Mode

## Getting Started 🚀

1. Clone the repository:
```bash
git clone https://github.com/Nevil844/opensauce.git
cd opensauce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
GITHUB_TOKEN=your_github_token_here  # Optional but recommended
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## GitHub Token (Optional) 🔑

While OpenSauce works without a GitHub token, adding one provides:
- Higher API rate limits (5,000 vs 60 requests/hour)
- Additional repository information
- Better search capabilities

To create a GitHub token:
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate a new token with `public_repo` scope
3. Add the token to your `.env.local` file

## Search Filters Explained 🔎

- **Best Match**: Uses GitHub's default search algorithm
- **Most Stars**: Shows repositories sorted by star count
- **Beginner Friendly**: Finds repositories that:
  - Have 50-1000 stars (active but not overwhelming)
  - Contain good-first-issues
  - Are actively maintained
  - Are public and not archived
- **Recently Active**: Shows repositories:
  - Updated in the last month
  - With more than 100 stars
  - Sorted by recent activity
- **Trending**: Displays repositories:
  - Created in the last 3 months
  - With more than 50 stars
  - Gaining popularity

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


