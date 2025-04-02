import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from 'itty-router'

/**
 * Handler function for GET /images/:id endpoint
 * Returns a single image by its ID
 */
const getSingleImage = (request: IRequest) => {
    // Find the image with the matching ID
    // URL parameters (like :id) are automatically extracted and passed in request.params
    // The find method loops through the array until a match is found or returns undefined if no match
    // Note: Converting IDs to strings is temporary; this will be replaced with a database later
    let image = ALL_IMAGES.find(i => i.id.toString() == request.params.id)
    
    // If no image is found, return a 404 response
    if (!image) {
        return new Response('Not found', { status: 404 })
    }

    // Return the image as JSON with appropriate content-type header
    return new Response(JSON.stringify(image), {
        headers: { 'content-type': 'application/json' }
    });
};

export default getSingleImage;
