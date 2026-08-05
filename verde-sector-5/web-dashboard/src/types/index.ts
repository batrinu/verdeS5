export type UserRole = 'CITIZEN' | 'FIELD_WORKER' | 'ADMIN';

export type Neighborhood = 
  | 'GIULESTI'
  | 'CRANGASI'
  | 'DRUMUL_TABEREI'
  | 'FERENTARI'
  | 'RAHOVA'
  | 'PROGRESUL'
  | 'SEPTEMBRIE_13'
  | 'MILITARI';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: UserRole;
  neighborhood?: Neighborhood;
  avatar?: string;
  createdAt: string;
}

export interface GreenSpace {
  id: string;
  name: string;
  type: string;
  location: string;
  area: number;
  description?: string;
  address?: string;
  trees?: Tree[];
  _count?: {
    trees: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Tree {
  id: string;
  species: string;
  speciesOther?: string;
  latitude: number;
  longitude: number;
  plantingDate?: string;
  height?: number;
  trunkDiameter?: number;
  healthStatus: string;
  adoptedById?: string;
  adoptedBy?: User;
  greenSpaceId?: string;
  greenSpace?: GreenSpace;
  notes?: string;
  photos?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Report {
  id: string;
  userId: string;
  user?: User;
  issueType: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  photos: string;
  status: string;
  priority: string;
  assignedToId?: string;
  assignedTo?: User;
  trackingNumber: string;
  adminNotes?: string;
  resolutionNotes?: string;
  rejectionReason?: string;
  submittedAt: string;
  updatedAt?: string;
}

export interface PlantingCampaign {
  id: string;
  name: string;
  description: string;
  latitude?: number;
  longitude?: number;
  locationDesc: string;
  species: string;
  numberOfTrees: number;
  treesPlanted: number;
  startDate: string;
  endDate: string;
  status: string;
  budget?: number;
  responsibleId?: string;
  responsible?: User;
  volunteers?: User[];
  photos?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  notificationType: string;
  relatedObjectId?: string;
  relatedObjectType?: string;
  isRead: boolean;
  sentAt: string;
  readAt?: string;
}

export interface PaginatedResponse<T> {
  trees?: T[];
  reports?: T[];
  campaigns?: T[];
  greenSpaces?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
