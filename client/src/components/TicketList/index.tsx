import * as S from './styles'

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
    <S.Wrapper>
      {data.length >= 1 && (
        <>
          <S.Title>Tickets</S.Title>
          <S.Table>
            <S.Thead>
              <S.Tr>
                <S.Th>Title</S.Th>
                <S.Th>Price</S.Th>
              </S.Tr>
            </S.Thead>
            <S.Body>
              {data.map((ticket) => (
                <>
                  <S.Tr key={ticket.id}>
                    <S.Value>{ticket.title}</S.Value>
                    <S.Value>{ticket.price}</S.Value>
                  </S.Tr>
                </>
              ))}
            </S.Body>
          </S.Table>
        </>
      )}
    </S.Wrapper>
  )
}

export default TicketList
