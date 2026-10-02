/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://devurs.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/api/*', '/opengraph-image'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
};
