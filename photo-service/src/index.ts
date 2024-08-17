import { Router } from 'itty-router'
import getImages from './handlers/get_images'
import createImage from './handlers/create_image';
import getSingleImage from './handlers/get_single_image';
import { Env } from './env';

const router = Router()

router.get('/images', getImages)
      .get('/images/:id', getSingleImage)
      .post('/images', createImage)
      .get('*', () => new Response('Not found', { status: 404 }));

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const auth_response = await env.AUTH.fetch(request.clone());
    
    if (auth_response.status !== 200) {
      return auth_response;
    }
    
    return router.fetch(request, env);
  },
};
