export interface Env {
	IMAGE_APP_UPLOADS: R2Bucket;
	DB: D1Database;
	ANALYSIS_QUEUE: Queue;
	AI: any;
}

export default {
  // START:start_func
  async queue(batch: MessageBatch<string>, env: Env): Promise<void> {    
    for (let message of batch.messages) {
      // END:start_func
      // START:retry
      const image_id = message.body
      const image = await env.IMAGE_APP_UPLOADS.get(image_id);
      
      if (image === null) {
        console.log(`Could not find image ID ${image_id}`);
        
        message.retry();
        continue;
      }
      // END:retry
      
      // START:run_ai
      const inputs = {
        image: Array.from(
          new Uint8Array(await image.arrayBuffer())
        )
      };
      
      const analysis = await env.AI.run('@cf/microsoft/resnet-50', inputs);
      
      await env.DB
        .prepare(
          'UPDATE images SET completed = 1, analysis = ?1 WHERE id = ?2'
        )
        .bind(JSON.stringify(analysis), image_id)
        .run();
        
      await env.IMAGE_APP_UPLOADS.delete(image_id);
      
      message.ack();
      // END:run_ai
    }
  },
};

