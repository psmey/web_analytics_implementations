import { IncomingTimeRestrictions } from '../../../api/models';
import { Address } from '../address';

export interface Call {
  id: string;
  address: Address;
  timeRestrictions: IncomingTimeRestrictions;
}
