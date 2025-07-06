/**
 * Represents the geographical coordinates for an issue.
 */
export interface Location {
  lat: number;
  lng: number;
}

/**
 * Defines the possible states an issue can be in.
 * Using a union type provides type safety and autocompletion.
 */
export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';

/**
 * Represents a single issue reported by a user.
 * This is the core data model for the application.
 */
export interface Issue {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  location: Location;
  imageUrl: string;
  userId: number;   // The ID of the user who reported the issue.
  agencyId: number; // The ID of the agency assigned to resolve the issue.
}

/**
 * Represents an authenticated user or agency.
 * This object is stored in the Pinia auth store.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'agency'; // Defines the user's role and capabilities.
}

/**
 * Defines the data structure for the login form.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Defines the data structure for the user registration form.
 */
export interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'agency';
}

/**
a * Defines the data structure for submitting a new issue form.
 */
export interface NewIssueData {
  title: string;
  description: string;
  location: Location;
  image?: File; // The image is a File object before upload and is optional.
}

/**
 * Represents a successfully completed project for the homepage showcase.
 */
export interface BeforeAfterProject {
  id: number;
  title: string;
  description: string;
  beforeImage: string; // URL to the image before the fix.
  afterImage: string;  // URL to the image after the fix.
}
