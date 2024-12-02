import { Adress } from './adress';
import { Contact } from './contact';

export interface Engineer {
  id: string;
  contact: Contact;
  adress: Adress;
  team: string;
  skills: string[];
}
