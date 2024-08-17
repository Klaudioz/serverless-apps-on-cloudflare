import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge';

export async function POST(request: Request) {
  const bucket = getRequestContext().env.IMAGE_APP_UPLOADS;
  const body = await request.formData();
  const files = body.getAll('files');
  const ai = getRequestContext().env.AI;
  let imageAnalysis = [];

  for(let x = 0; x < files.length; x++) {
    const f = files[x] as File;
    const uuid = crypto.randomUUID()

    await bucket.put(uuid, f);
    
    const blob = await f.arrayBuffer();

    const inputs = {
      image: Array.from(new Uint8Array(blob))
    };

    imageAnalysis.push(
      {
        id: uuid,
        name: f.name,
        analysis: await ai.run('@cf/microsoft/resnet-50', inputs)
      }
    )
  }

  return new Response(JSON.stringify({results: imageAnalysis}), {
    headers: { 'content-type': 'application/json' }
  });
}

