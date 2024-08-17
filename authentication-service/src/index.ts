export interface Env {
  API_AUTH_KEY: String;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const api_key = request.headers.get('x-api-auth-key');
        
    if (api_key === env.API_AUTH_KEY) {
      return new Response('Authenticated', { status: 200 });
    }
    
    return new Response('Unauthorized', { status: 401 });
  }
};

