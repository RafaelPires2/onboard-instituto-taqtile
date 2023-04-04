import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { LIST_USERS_QUERY } from '../../auth-validation/gql-queries';

export function UsersList() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const token = localStorage.getItem('token');

  const { loading, error, data, fetchMore } = useQuery(LIST_USERS_QUERY, {
    context: {
      headers: { authorization: token },
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users.nodes.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
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
        >
          Anterior
        </button>
        <p>
          Página {Math.floor(offset / limit) + 1} de {totalPages}
        </p>
        <button
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
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
