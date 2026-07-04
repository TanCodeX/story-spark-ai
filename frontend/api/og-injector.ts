import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const API_BASE = process.env.VITE_API_URL || process.env.API_URL || 'http://localhost:5000';

  try {
    const apiResponse = await fetch(`${API_BASE}/api/stories/${id}`);
    if (!apiResponse.ok) throw new Error('Story not found');
    const story = await apiResponse.json();

    const filePath = path.resolve(process.cwd(), 'dist', 'index.html');
    let html = fs.readFileSync(filePath, 'utf8');

    const title = story?.title || 'Story Spark AI';
    const description = story?.content ? `${story.content.substring(0, 160)}...` : 'Ignite your imagination.';
    const image = story?.coverImage || 'https://storysparkai.vercel.app/og-image.jpg';
    const url = `https://storysparkai.vercel.app/story/${id}`;

    html = html
      .replace(/<title>.*?<\/title>/, `<title>${title} | Story Spark AI</title>`)
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
      .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`)
      .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); 
    return res.status(200).send(html);
  } catch (error) {
    const filePath = path.resolve(process.cwd(), 'dist', 'index.html');
    return res.status(200).send(fs.readFileSync(filePath, 'utf8'));
  }
}