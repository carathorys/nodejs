import { Request, Response } from 'express';
import { Action, Controller } from '../decorators';
import { Parameter } from '../decorators/parameter.decorator';
import { LoggerService } from '../services/logger.service';
import { SchedulerService } from '../services/scheduler.service';

interface postParameters {
  title: string;
  lang: 'hu' | 'en' | 'de';
}

@Controller({
  basePath: 'scheduler',
})
export class SchedulerController {
  constructor(
    private readonly SchedulerService: SchedulerService,
    private readonly logger: LoggerService,
  ) {}

  @Action({
    path: 'start/:id',
    method: 'get',
  })
  public async start(@Parameter({ from: 'path' }) id: string): Promise<any> {
    console.log('ID:', id);
    this.SchedulerService.AddJob({
      id: '1',
      language: 'hu',
      tags: [],
      title: "I Don't know",
    });
    return 'MAYBE OK (?)';
  }

  @Action({
    path: 'show',
    method: 'get',
  })
  public async show(): Promise<any> {
    return this.SchedulerService.FilterJobs((x) => true);
  }
}
