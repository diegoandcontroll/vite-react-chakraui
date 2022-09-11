import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthType = {
  __typename?: 'AuthType';
  token: Scalars['String'];
  user: User;
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  photoUrl: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DeleteUser: Scalars['Boolean'];
  createUser: User;
  login: AuthType;
  refreshToken: AuthType;
  updateUser: User;
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationRefreshTokenArgs = {
  oldToken: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  userbyEmail: User;
  users: Array<User>;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type QueryUserbyEmailArgs = {
  email: Scalars['String'];
};

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  photoUrl?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  photoUrl: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthType';
    token: string;
    user: { __typename?: 'User'; id: string; name: string; email: string; photoUrl: string };
  };
};

export type RefreshTokenMutationVariables = Exact<{
  oldToken: Scalars['String'];
}>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken: { __typename?: 'AuthType'; token: string };
};

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    email: string;
    id: string;
    name: string;
    photoUrl: string;
    updatedAt: any;
  };
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'User'; id: string; name: string; email: string; photoUrl: string };
};

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type UserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: 'Query';
  users: Array<{
    __typename?: 'User';
    id: string;
    name: string;
    confirmed: boolean;
    email: string;
    photoUrl: string;
    createdAt: any;
    updatedAt: any;
  }>;
};

export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        id
        name
        email
        photoUrl
      }
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken($oldToken: String!) {
    refreshToken(oldToken: $oldToken) {
      token
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      oldToken: // value for 'oldToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument,
    options,
  );
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      email
      id
      name
      photoUrl
      updatedAt
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: String!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      photoUrl
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const UserDocument = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      name
      email
      photoUrl
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      name
      confirmed
      email
      photoUrl
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
