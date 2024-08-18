import { getRequestContext } from '@cloudflare/next-on-pages';

type ImageQueryResult = {
  id: string,
  analysis: string,
  completed: number
}

const retrieveImageAnalysisQuery = async(
  image_ids: string[]
): Promise<Array<ImageQueryResult>> => {
  let imageAnalysis = new Array<ImageQueryResult>();
  const db = getRequestContext().env.DB;

  for (let x = 0; x < image_ids.length; x++) {
    const result = await db.prepare(
      'SELECT id, analysis, completed FROM images WHERE id IN (?1)'
    ).bind(image_ids[x])
     .first() as ImageQueryResult;

    imageAnalysis.push(
      {
        id: result.id,
        analysis: result.analysis,
        completed: result.completed
      }
    );
  }

  return imageAnalysis;
}

export default retrieveImageAnalysisQuery;

