import { getRequestContext } from '@cloudflare/next-on-pages';

const uploadImageForAnalysis = async(file: File): Promise<string> => {
  const uuid = crypto.randomUUID();
  const bucket = getRequestContext().env.IMAGE_APP_UPLOADS;
  const db = getRequestContext().env.DB;
  const queue = getRequestContext().env.ANALYSIS_QUEUE;

  await bucket.put(uuid, file);

  // START:db
  await db
        .prepare('INSERT INTO images (id, completed) VALUES (?1, 0)')
        .bind(uuid)
        .run()
  // END:db
  
  // START:queue
  await queue.send(uuid);
  // END:queue
  return uuid;
}

export default uploadImageForAnalysis;

