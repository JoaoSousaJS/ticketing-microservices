import { Subjects } from "../listener/subjects";

export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete
  data: {
    orderId: string
  }
}