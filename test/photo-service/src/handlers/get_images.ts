import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from 'itty-router'

/**
 * Handler function for GET /images endpoint
 * Returns all images, with optional count limitation via query parameter
 */
const getImages = (request: IRequest) => {
    // Store all images in a variable to manipulate
    let images = ALL_IMAGES
    
    // If count query parameter exists, limit the number of results
    if (request.query.count) {
        images = images.slice(0, parseInt(request.query.count[0]))
    }

    // Return images as JSON with appropriate content-type header
    // Response class must be used for Cloudflare Workers responses
    return new Response(JSON.stringify(images), {
      headers: { 'content-type': 'application/json' }
    });
};

export default getImages;