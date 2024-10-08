import { gql, useQuery } from "@apollo/client";

const AUTH = gql`
  query GetCurrentUser {
    viewer {
      sessionToken
      user {
        id
        objectId
        neighborhood
      }
    }
  }
`;

export const useAuthQuery = () => {
  const { data, loading, error } = useQuery(AUTH);

  return {
    data,
    loading,
    error,
  };
};
