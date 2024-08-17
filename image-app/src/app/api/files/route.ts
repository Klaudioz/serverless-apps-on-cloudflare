import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge';

export async function POST(request: Request) {
  const bucket = getRequestContext().env.IMAGE_APP_UPLOADS;
  const body = await request.formData();
  const files = body.getAll('files');

  for(let x = 0; x < files.length; x++) {
    const f = files[x] as File;

    const uuid = crypto.randomUUID()
    
    await bucket.put(uuid, f)
  }

  return new Response('Images uploaded', {
    headers: { 'content-type': 'application/json' }
  });
}

