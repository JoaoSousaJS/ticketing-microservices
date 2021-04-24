import { Subjects } from "../listener/subjects";

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled
  data: {
    id: string
    ticket: {
      id: string
    }
  }
}