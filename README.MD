Ticketing project for study purpose in microservices with docker, kubernetes, NATS Streaming Server and Node. 

Goals and expectations: 
- A ticketing system with payments and concurrency.
- Production level code.
- Ugly UI.
- A good understanding of microservices.

Microservices:
- Auth - Handle users creation and authentication.
- Client - website to see and purchase tickets.
- Common - Lib that will manage all common functions.
- Tickets - Handle ticket management.
- Orders - Handle order management.
- Expiration - Control when the ticket will expire.
- Payments - Handle ticket payments.