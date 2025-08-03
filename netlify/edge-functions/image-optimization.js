export default async (request, context) => {
  const { pathname, searchParams } = new URL(request.url);

  // Vérifie que c’est bien une image supportée
  if (!/\.(jpg|jpeg|png|webp|avif|svg)$/i.test(pathname)) {
    return new Response('Unsupported file type', { status: 400 });
  }

  const originalImageUrl = pathname.replace(/^\/images\//, '');
  const encodedImageUrl = encodeURIComponent(originalImageUrl);

  const width = searchParams.get('w') || '800';
  const quality = searchParams.get('q') || '80';
  const format = searchParams.get('fm') || 'webp';

  const transformedUrl = `/.netlify/images?url=${encodedImageUrl}&w=${width}&q=${quality}&fm=${format}`;

  return Response.redirect(transformedUrl, 302);
};
// This function handles image optimization requests by redirecting to the Netlify image transformation service.

// It checks the requested image type, extracts parameters like width, quality, and format,
// and constructs a URL for the Netlify image service to return the optimized image.