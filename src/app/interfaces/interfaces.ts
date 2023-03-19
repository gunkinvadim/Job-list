export interface Job {
  id?: number;
  jobNumber: string,
  jobTitle: string,
  jobStartDate: Date,
  jobCloseDate: Date,
  experienceRequired: boolean,
  numberOfOpenings: number,
  jobNotes: string
}
