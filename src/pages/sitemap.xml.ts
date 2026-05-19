export async function GET() {
  const siteUrl = 'https://wisdombreathes.github.io/frenchwithnaya'
  const lastmod = new Date().toISOString().split('T')[0]

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'monthly' },
    { url: '/privacy/', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms/', priority: '0.3', changefreq: 'yearly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${siteUrl}${p.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  })
}
