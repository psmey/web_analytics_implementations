import { Address } from './adress';
import { Contact } from './contact';

export interface Engineer {
  id: string;
  contact: Contact;
  address: Address;
  skills: string[];
}
