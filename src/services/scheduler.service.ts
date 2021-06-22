import { JobState } from './../models/job.model';
import { Injectable } from '@furystack/inject';
import { Job, Video } from '../models';
import { v4 as UUID } from 'uuid';
import { LoggerService } from './logger.service';

@Injectable({
  lifetime: 'singleton',
})
export class SchedulerService {
  private uuid: string;
  private jobs: Job[];
  constructor(private readonly logger: LoggerService) {
    this.jobs = [];
    this.uuid = UUID();
  }

  public AddJob(video: Video): void {
    this.logger.Debug('[{instance}]: Adding new job to convert video: {video}', video.title, {
      key: 'instance',
      value: this.uuid,
    });
    this.jobs.push({
      film: video,
      id: UUID().toString(),
      jobState: 'scheduled',
      name: 'Convert video',
    });
  }

  public GetJobsByState(jobState: JobState): Job[] {
    return this.FilterJobs((x) => x.jobState == jobState);
  }

  public FilterJobs(predicate: (job: Job) => boolean): Job[] {
    return this.jobs.filter(predicate);
  }
}
