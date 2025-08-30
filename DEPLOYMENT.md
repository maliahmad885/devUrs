# Deployment Guide for Nexus Bloom

This guide covers multiple deployment options for your Next.js application.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository set up

## Quick Deploy Options

### 1. Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
npm run deploy:vercel
```

Or simply connect your GitHub repository to Vercel for automatic deployments.

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy to Netlify
npm run deploy:netlify
```

### 3. Docker Deployment

```bash
# Build Docker image
docker build -t nexus-bloom .

# Run container
docker run -p 3000:3000 nexus-bloom
```

## Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
cp env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SITE_URL`: Your production URL
- `NEXT_PUBLIC_SITE_NAME`: Site name
- `NEXT_PUBLIC_SITE_DESCRIPTION`: Site description

## Build Process

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run type checking:**
   ```bash
   npm run type-check
   ```

3. **Lint code:**
   ```bash
   npm run lint
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

## Performance Optimization

The application includes several optimizations:

- **Image optimization** with WebP and AVIF formats
- **Bundle optimization** with tree shaking
- **Security headers** for protection
- **Caching strategies** for static assets
- **SEO optimization** with sitemap generation

## Monitoring

Consider adding monitoring tools:

- **Vercel Analytics** (built-in with Vercel)
- **Google Analytics** (set `NEXT_PUBLIC_GA_ID`)
- **Sentry** for error tracking (set `NEXT_PUBLIC_SENTRY_DSN`)

## Troubleshooting

### Build Errors
- Ensure Node.js version is 18+
- Clear cache: `npm run clean`
- Check TypeScript errors: `npm run type-check`

### Performance Issues
- Analyze bundle: `npm run analyze`
- Check image optimization settings
- Verify caching headers

### Deployment Issues
- Check environment variables
- Verify build output
- Review deployment logs

## Security Checklist

- [ ] Environment variables are set
- [ ] Security headers are configured
- [ ] HTTPS is enabled
- [ ] Dependencies are up to date
- [ ] No sensitive data in client code

## Support

For deployment issues, check:
- Next.js documentation
- Platform-specific guides (Vercel/Netlify)
- GitHub issues for known problems 