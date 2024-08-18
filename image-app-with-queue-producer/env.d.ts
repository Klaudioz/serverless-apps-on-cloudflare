interface CloudflareEnv {
  IMAGE_APP_UPLOADS: R2Bucket;
  ANALYSIS_QUEUE: Queue;
  DB: D1Database;
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
