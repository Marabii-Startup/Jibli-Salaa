import { Language } from "./Language";
import { ROLE } from "./userRole";

export interface UserInfo {
  createdAt: Date;
  phoneNumber: string;
  spokenLanguages: Language[];
  name: string;
  email: string;
  isAuthenticatedByGoogle: boolean;
  profilePicture: string;
  _id: string;
  role: ROLE;
  contacts: Contact[];
}

export interface Contact {
  contactId: string;
  orderId: string;
  contactName: string;
}
