export default async (request, context) => {
  const { pathname, searchParams } = new URL(request.url);

  // Vérifie que c’est bien une image supportée
  if (!/\.(jpg|jpeg|png|webp|avif|svg)$/i.test(pathname)) {
    return new Response('Unsupported file type', { status: 400 });
  }

  // Conserver le préfixe /images/ pour que le service Netlify résolve l'URL locale correctement
  const originalImagePath = pathname; // ex: /images/example.jpg
  const encodedImageUrl = encodeURIComponent(originalImagePath);

  const width = searchParams.get('w') || '800';
  const quality = searchParams.get('q') || '80';
  const format = searchParams.get('fm') || 'webp';

  const transformedUrl = `/.netlify/images?url=${encodedImageUrl}&w=${width}&q=${quality}&fm=${format}`;

  return Response.redirect(transformedUrl, 302);
};

// This function handles image optimization requests by redirecting to the Netlify image transformation service.

// It checks the requested image type, extracts parameters like width, quality, and format,
// and constructs a URL for the Netlify image service to return the optimized image.