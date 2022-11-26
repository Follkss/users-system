import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      success: true,
      users: [
        {
          name: 'Gabriel',
          age: 23,
        },
        {
          name: 'Andre',
          age: 27,
        },
      ],
    };
  }
}
