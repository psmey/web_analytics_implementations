import { Address } from './adress';
import { Contact } from './contact';
import { Engineer } from './engineer';

export interface Task {
  title: string;
  description: string;
  startTime: string;
  durationInMinutes: number;
  contact: Contact;
  location: Address;
  assingedEngineer?: Engineer;
}
