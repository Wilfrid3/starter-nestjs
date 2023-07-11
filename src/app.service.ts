import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World welcome to Kalio.io Auth API!';
  }
}
