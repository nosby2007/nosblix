export type AcademyRole = 'super_admin' | 'admin' | 'manager' | 'learner' | 'proctor' | 'guest';

export interface AcademyProfile {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  role: AcademyRole;
  active?: boolean;
  orgId?: string | null;
  orgType?: string | null;
  accountType?: 'organization' | 'individual' | 'guest';
  permissions?: string[];
}

export interface LessonSummary {
  id: string;
  title: string;
  minutes: number;
  blockTypes: string[];
}

export interface SectionSummary {
  id: string;
  title: string;
  lessons: LessonSummary[];
}

export interface AcademyCourse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  category: string;
  durationMin: number;
  language: string;
  imageUrl?: string;
  lecturer: string;
  tags: string[];
  allowedEmailDomains: string[];
  targetAudience: string[];
  prerequisites: string[];
  sections: SectionSummary[];
  isPublic: boolean;
  active: boolean;
  certification: boolean;
  ceCredit?: number;
}

export interface AcademyEnrollment {
  id: string;
  courseId: string;
  status: string;
  progress: number;
  score?: number;
  certificateId?: string;
  completedAt?: unknown;
  dueDate?: unknown;
}

export interface OrganizationTrainingSummary {
  learners: number;
  enrollments: number;
  completed: number;
  averageProgress: number;
}
