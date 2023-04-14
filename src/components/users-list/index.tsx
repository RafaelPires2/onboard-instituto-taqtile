import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { LIST_USERS_QUERY } from '../../auth-validation/gql-queries';
import { HiUserAdd } from 'react-icons/hi';
import { PageAddUser } from '../../pages/add-user';
import { GetToken } from '../../auth-validation/get-token';
import { CustomButton } from '../button';
import { ContainerTable } from './styles';

interface UserListProps {
  onUserClick: (userId: string) => void;
}
interface UserProps {
  id: string;
  name: string;
  email: string;
}

export function UsersList({ onUserClick }: UserListProps) {
  const [activePageAddUser, setActivePageAddUser] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  function onPageAddUser() {
    setActivePageAddUser(true);
  }
  const { loading, error, data, fetchMore } = useQuery(LIST_USERS_QUERY, {
    context: {
      headers: { authorization: GetToken },
    },
    variables: {
      data: {
        offset,
        limit,
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { hasNextPage, hasPreviousPage } = data.users.pageInfo;
  const totalPages = Math.ceil(data.users.count / limit);

  return (
    <ContainerTable>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>
              <CustomButton
                width='50'
                height='50'
                type='button'
                bgButton='white'
                onClick={onPageAddUser}
                content={<HiUserAdd size={25} />}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.users.nodes.map((user: UserProps) => (
            <tr key={user.id} onClick={() => onUserClick(user.id)}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="containerButton">
        <CustomButton
          height='47'
          width='150'
          bgButton='green'
          type='button'
          onClick={() =>
            hasPreviousPage &&
            fetchMore({
              variables: {
                data: {
                  offset: Math.max(offset - limit, 0),
                  limit,
                },
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setOffset(Math.max(offset - limit, 0));
                return fetchMoreResult;
              },
            })
          }
          content='ANTERIOR'
        />

        <p>
          Página {Math.floor(offset / limit) + 1} de {totalPages}
        </p>

        <CustomButton
          height='47'
          width='150'
          bgButton='green'
          type='button'
          onClick={() =>
            hasNextPage &&
            fetchMore({
              variables: {
                data: {
                  offset: offset + limit,
                  limit,
                },
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setOffset(offset + limit);
                return fetchMoreResult;
              },
            })
          }
          content='PRÓXIMO'
        />
      </div>
      {activePageAddUser === true ? (
        <PageAddUser activePageAddUser={activePageAddUser} setActivePageAddUser={setActivePageAddUser} />
      ) : null}
    </ContainerTable>
  );
}
