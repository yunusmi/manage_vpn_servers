import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3ConfigService {
  public s3: S3;

  constructor() {
    this.s3 = new S3({
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
    });
  }

  getS3Client(): S3 {
    return this.s3;
  }
}
