import uploadImageForAnalysis from "@/lib/upload_image_for_analysis";

export const runtime = 'edge';

interface ImageForAnalysis {
  filename: string;
  id: string;
}

export async function POST(request: Request) {
  const body = await request.formData();
  const files = body.getAll('files');
  let user_images = new Array<ImageForAnalysis>();

  for(let x = 0; x < files.length; x++) {
    const file = files[x] as File;
    const uuid = await uploadImageForAnalysis(file);

    user_images.push(
      {
        filename: file.name,
        id: uuid
      }
    )
  }

  return new Response(JSON.stringify(user_images), {
    headers: { 'content-type': 'application/json' }
  });
}
