import Link from 'next/link'
import {
  Container,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Text,
  Button
} from '@chakra-ui/react'

export type TicketProps = {
  data: {
    title: string
    price: number
    userId: string
    version: number
    id: string
  }[]
}

const TicketList = ({ data }: TicketProps) => {
  console.log('aqui')
  console.log(data)
  return (
    <Container>
      {data.length >= 1 && (
        <Table variant="striped" size="lg" colorScheme="cyan" border="2px">
          <Thead>
            <Tr>
              <Th>
                <Text fontSize="4xl">Title</Text>
              </Th>
              <Th>
                <Text fontSize="4xl">Price</Text>
              </Th>
              <Th>
                <Text fontSize="4xl">Action</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((ticket) => (
              <Tr key={ticket.id}>
                <Td>
                  <Text fontSize="2xl">{ticket.title}</Text>
                </Td>
                <Td isNumeric>
                  <Text fontSize="2xl">{ticket.price}</Text>
                </Td>
                <Td>
                  <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                    <Button colorScheme="blue" variant="outline">
                      Details
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  )
}

export default TicketList
