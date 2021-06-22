import { Video } from './video.model';

export type JobState = 'scheduled' | 'running' | 'finished' | 'error';

export interface Job {
  id: string;
  name?: string;
  film: Video;
  jobState: JobState;
}
