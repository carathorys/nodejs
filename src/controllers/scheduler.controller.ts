import { Request, Response } from 'express';
import { stringify } from 'uuid';
import { Action, Controller } from '../decorators';
import { Parameter } from '../decorators/parameter.decorator';
import { LoggerService } from '../services/logger.service';
import { SchedulerService } from '../services/scheduler.service';

interface PostData {
  title: string;
  language: 'hu' | 'en';
}
@Controller({
  basePath: 'scheduler',
})
class SchedulerController {
  constructor(
    private readonly SchedulerService: SchedulerService,
    private readonly logger: LoggerService,
  ) {}

  @Action({
    path: 'start/:id',
    method: 'post',
  })
  public async start(
    @Parameter({ from: 'payload', alias: '', type: 'object' }) payloadData: PostData,
    @Parameter({ from: 'header', alias: 'token', type: 'string' }) token: string,
    @Parameter({ from: 'path', alias: 'id', type: 'number' }) id: string,
    @Parameter({ from: 'query', alias: 'sure', type: 'boolean' }) areYouSure: boolean,
  ): Promise<any> {
    console.log(
      `Invoked with params: {token: "${token}", id: "${id}", areYouSure: ${areYouSure}, payloadData: "${JSON.stringify(
        payloadData,
      )}"}`,
    );
    this.SchedulerService.AddJob({
      id: '1',
      language: 'hu',
      tags: [],
      title: "I Don't know",
    });
    return {
      token,
      id,
      sure: areYouSure === true,
      payloadData,
    };
  }

  @Action({
    path: 'show',
    method: 'get',
  })
  public async show(): Promise<any> {
    return this.SchedulerService.FilterJobs((x) => true);
  }
}
export { SchedulerController };
