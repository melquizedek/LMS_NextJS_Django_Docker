export interface JobPosition {
  id: string;
  title: string;
  department: 'Engineering' | 'Credit & Risk' | 'Product & Design' | 'Operations' | 'Compliance & Legal' | 'Sales & Growth';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  workplace: 'Remote' | 'Hybrid' | 'On-site';
  salaryRange: string;
  experience: string;
  postedDate: string;
  featured?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
}

export interface JobApplicationSubmission {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  yearsOfExperience: string;
  submittedAt: string;
}
