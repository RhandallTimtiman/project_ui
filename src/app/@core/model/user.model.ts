import { UserDetails } from './user-details.model';

export interface User {
  access_token: string;
  expires_at: string;
  token_type: string;
  user: UserDetails
}