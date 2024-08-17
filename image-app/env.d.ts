interface CloudflareEnv {
  IMAGE_APP_UPLOADS: R2Bucket;
  AI: any;
}

interface UserImage {
  filename: string;
  url: string;
  analysis?: Array<Analysis>;
}

interface Analysis {
  label: string;
  score: number;
}
