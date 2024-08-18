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

import retrieveImageAnalysisQuery from "@/lib/retrieve_image_analysis_query";

export async function GET(request: Request) {
  // START:start_func
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  let image_ids = searchParams.get("image_ids")?.split(',')

  if (!image_ids) {
    return new Response('Image IDs not provided', {
      status: 404
    });
  }
  // END:start_func

  // START:db_query
  const all_results = await retrieveImageAnalysisQuery(image_ids);

  if (all_results.length === 0) {
    return new Response('Images not found', {
      status: 404
    });
  }
  // END:db_query

  // START:response
  let image_analysis = [];

  for (let x = 0; x < all_results.length; x++) {
    const row = all_results[x];

    image_analysis.push(
      {
        id: row.id,
        analysis: row.analysis ? 
          JSON.parse(row.analysis as string) :
          false
      }
    )
  }

  return new Response(JSON.stringify(image_analysis), {
    headers: { 'content-type': 'application/json' }
  });
  // END:response
}
