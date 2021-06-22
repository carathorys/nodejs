import { Request, Response } from 'express';
import { Action, Controller } from '../decorators';
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
    path: 'start',
    method: 'get',
  })
  public async start(): Promise<any> {
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
  public async show(req: Request, res: Response): Promise<any> {
    let jobsFound = this.SchedulerService.FilterJobs((x) => true);
    if (!jobsFound || jobsFound.length === 0) {
      this.logger.Info('There were no jobs found; {jobs}', {
        key: 'jobs',
        value: JSON.stringify(jobsFound),
      });
      res.statusCode = 404;
      res.send();
    } else {
      res.send(jobsFound);
    }
  }
}
