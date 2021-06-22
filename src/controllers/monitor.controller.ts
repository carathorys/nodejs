import { Action, Controller } from '../decorators';
import { LoggerService } from '../services/logger.service';
import { SchedulerService } from '../services/scheduler.service';

@Controller()
export class MonitorController {
  constructor(
    private readonly SchedulerService: SchedulerService,
    private readonly logger: LoggerService,
  ) {}

  @Action({
    path: '/',
    method: 'get',
  })
  public async index(): Promise<any> {
    return null;
  }
}
