import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<Array<Post>>;
  post?: Maybe<Post>;
  users?: Maybe<User>;
  currentUser?: Maybe<User>;
  halls?: Maybe<Array<Hall>>;
  hall?: Maybe<Hall>;
  sessions?: Maybe<Array<Session>>;
  session?: Maybe<Session>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryHallArgs = {
  id: Scalars['Int'];
};


export type QuerySessionArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  content: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  password: Scalars['String'];
  displayName: Scalars['String'];
  image: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  active: Scalars['Boolean'];
  activeToken: Scalars['String'];
  activeExpires: Scalars['Float'];
};

export type Hall = {
  __typename?: 'Hall';
  id: Scalars['Float'];
  name: Scalars['String'];
  sessions: Array<Session>;
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['Float'];
  name: Scalars['String'];
  start_time: Scalars['String'];
  end_time: Scalars['String'];
  hall: Hall;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Scalars['Boolean'];
  updatePost: Post;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createHall: HallResponse;
  deleteHall: HallResponse;
  updateHall: Hall;
  createSession: Session;
  deleteSession: SessionResponse;
  updateSession: Session;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  input: PostInput;
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationCreateHallArgs = {
  input: HallInput;
};


export type MutationDeleteHallArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateHallArgs = {
  input: HallInput;
  id: Scalars['Int'];
};


export type MutationCreateSessionArgs = {
  input: SessionInput;
};


export type MutationDeleteSessionArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateSessionArgs = {
  input: SessionInput;
  id: Scalars['Int'];
};

export type PostInput = {
  content: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type HallResponse = {
  __typename?: 'HallResponse';
  errors?: Maybe<HallError>;
};

export type HallError = {
  __typename?: 'HallError';
  message: Scalars['String'];
};

export type HallInput = {
  name: Scalars['String'];
};

export type SessionInput = {
  name: Scalars['String'];
  hall: Scalars['String'];
  start_time: Scalars['String'];
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  errors?: Maybe<SessionError>;
};

export type SessionError = {
  __typename?: 'SessionError';
  message: Scalars['String'];
};

export type HallsQueryVariables = Exact<{ [key: string]: never; }>;


export type HallsQuery = (
  { __typename?: 'Query' }
  & { halls?: Maybe<Array<(
    { __typename?: 'Hall' }
    & Pick<Hall, 'id' | 'name'>
    & { sessions: Array<(
      { __typename?: 'Session' }
      & Pick<Session, 'id' | 'name'>
    )> }
  )>> }
);

export type CreateHallMutationVariables = Exact<{
  input: HallInput;
}>;


export type CreateHallMutation = (
  { __typename?: 'Mutation' }
  & { createHall: (
    { __typename?: 'HallResponse' }
    & { errors?: Maybe<(
      { __typename?: 'HallError' }
      & Pick<HallError, 'message'>
    )> }
  ) }
);

export type DeleteHallMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteHallMutation = (
  { __typename?: 'Mutation' }
  & { deleteHall: (
    { __typename?: 'HallResponse' }
    & { errors?: Maybe<(
      { __typename?: 'HallError' }
      & Pick<HallError, 'message'>
    )> }
  ) }
);

export type UpdateHallMutationVariables = Exact<{
  id: Scalars['Int'];
  input: HallInput;
}>;


export type UpdateHallMutation = (
  { __typename?: 'Mutation' }
  & { updateHall: (
    { __typename?: 'Hall' }
    & Pick<Hall, 'id' | 'name'>
  ) }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content'>
  )>> }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'content'>
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PostInput;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content'>
  ) }
);

export type SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsQuery = (
  { __typename?: 'Query' }
  & { sessions?: Maybe<Array<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name'>
  )>> }
);

export type CreateSessionMutationVariables = Exact<{
  input: SessionInput;
}>;


export type CreateSessionMutation = (
  { __typename?: 'Mutation' }
  & { createSession: (
    { __typename?: 'Session' }
    & Pick<Session, 'name'>
  ) }
);

export type DeleteSessionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSessionMutation = (
  { __typename?: 'Mutation' }
  & { deleteSession: (
    { __typename?: 'SessionResponse' }
    & { errors?: Maybe<(
      { __typename?: 'SessionError' }
      & Pick<SessionError, 'message'>
    )> }
  ) }
);

export type UpdateSessionMutationVariables = Exact<{
  id: Scalars['Int'];
  input: SessionInput;
}>;


export type UpdateSessionMutation = (
  { __typename?: 'Mutation' }
  & { updateSession: (
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name'>
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
);


export const HallsDocument = gql`
    query Halls {
  halls {
    id
    name
    sessions {
      id
      name
    }
  }
}
    `;

/**
 * __useHallsQuery__
 *
 * To run a query within a React component, call `useHallsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHallsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHallsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHallsQuery(baseOptions?: Apollo.QueryHookOptions<HallsQuery, HallsQueryVariables>) {
        return Apollo.useQuery<HallsQuery, HallsQueryVariables>(HallsDocument, baseOptions);
      }
export function useHallsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HallsQuery, HallsQueryVariables>) {
          return Apollo.useLazyQuery<HallsQuery, HallsQueryVariables>(HallsDocument, baseOptions);
        }
export type HallsQueryHookResult = ReturnType<typeof useHallsQuery>;
export type HallsLazyQueryHookResult = ReturnType<typeof useHallsLazyQuery>;
export type HallsQueryResult = Apollo.QueryResult<HallsQuery, HallsQueryVariables>;
export const CreateHallDocument = gql`
    mutation createHall($input: HallInput!) {
  createHall(input: $input) {
    errors {
      message
    }
  }
}
    `;
export type CreateHallMutationFn = Apollo.MutationFunction<CreateHallMutation, CreateHallMutationVariables>;

/**
 * __useCreateHallMutation__
 *
 * To run a mutation, you first call `useCreateHallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHallMutation, { data, loading, error }] = useCreateHallMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHallMutation(baseOptions?: Apollo.MutationHookOptions<CreateHallMutation, CreateHallMutationVariables>) {
        return Apollo.useMutation<CreateHallMutation, CreateHallMutationVariables>(CreateHallDocument, baseOptions);
      }
export type CreateHallMutationHookResult = ReturnType<typeof useCreateHallMutation>;
export type CreateHallMutationResult = Apollo.MutationResult<CreateHallMutation>;
export type CreateHallMutationOptions = Apollo.BaseMutationOptions<CreateHallMutation, CreateHallMutationVariables>;
export const DeleteHallDocument = gql`
    mutation deleteHall($id: Int!) {
  deleteHall(id: $id) {
    errors {
      message
    }
  }
}
    `;
export type DeleteHallMutationFn = Apollo.MutationFunction<DeleteHallMutation, DeleteHallMutationVariables>;

/**
 * __useDeleteHallMutation__
 *
 * To run a mutation, you first call `useDeleteHallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHallMutation, { data, loading, error }] = useDeleteHallMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHallMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHallMutation, DeleteHallMutationVariables>) {
        return Apollo.useMutation<DeleteHallMutation, DeleteHallMutationVariables>(DeleteHallDocument, baseOptions);
      }
export type DeleteHallMutationHookResult = ReturnType<typeof useDeleteHallMutation>;
export type DeleteHallMutationResult = Apollo.MutationResult<DeleteHallMutation>;
export type DeleteHallMutationOptions = Apollo.BaseMutationOptions<DeleteHallMutation, DeleteHallMutationVariables>;
export const UpdateHallDocument = gql`
    mutation updateHall($id: Int!, $input: HallInput!) {
  updateHall(id: $id, input: $input) {
    id
    name
  }
}
    `;
export type UpdateHallMutationFn = Apollo.MutationFunction<UpdateHallMutation, UpdateHallMutationVariables>;

/**
 * __useUpdateHallMutation__
 *
 * To run a mutation, you first call `useUpdateHallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHallMutation, { data, loading, error }] = useUpdateHallMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHallMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHallMutation, UpdateHallMutationVariables>) {
        return Apollo.useMutation<UpdateHallMutation, UpdateHallMutationVariables>(UpdateHallDocument, baseOptions);
      }
export type UpdateHallMutationHookResult = ReturnType<typeof useUpdateHallMutation>;
export type UpdateHallMutationResult = Apollo.MutationResult<UpdateHallMutation>;
export type UpdateHallMutationOptions = Apollo.BaseMutationOptions<UpdateHallMutation, UpdateHallMutationVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    content
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: PostInput!) {
  createPost(input: $input) {
    content
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($id: Int!, $input: PostInput!) {
  updatePost(id: $id, input: $input) {
    id
    content
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const SessionsDocument = gql`
    query Sessions {
  sessions {
    id
    name
  }
}
    `;

/**
 * __useSessionsQuery__
 *
 * To run a query within a React component, call `useSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionsQuery(baseOptions?: Apollo.QueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
        return Apollo.useQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
      }
export function useSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
          return Apollo.useLazyQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
        }
export type SessionsQueryHookResult = ReturnType<typeof useSessionsQuery>;
export type SessionsLazyQueryHookResult = ReturnType<typeof useSessionsLazyQuery>;
export type SessionsQueryResult = Apollo.QueryResult<SessionsQuery, SessionsQueryVariables>;
export const CreateSessionDocument = gql`
    mutation createSession($input: SessionInput!) {
  createSession(input: $input) {
    name
  }
}
    `;
export type CreateSessionMutationFn = Apollo.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
        return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, baseOptions);
      }
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
export const DeleteSessionDocument = gql`
    mutation deleteSession($id: Int!) {
  deleteSession(id: $id) {
    errors {
      message
    }
  }
}
    `;
export type DeleteSessionMutationFn = Apollo.MutationFunction<DeleteSessionMutation, DeleteSessionMutationVariables>;

/**
 * __useDeleteSessionMutation__
 *
 * To run a mutation, you first call `useDeleteSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionMutation, { data, loading, error }] = useDeleteSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSessionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSessionMutation, DeleteSessionMutationVariables>) {
        return Apollo.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(DeleteSessionDocument, baseOptions);
      }
export type DeleteSessionMutationHookResult = ReturnType<typeof useDeleteSessionMutation>;
export type DeleteSessionMutationResult = Apollo.MutationResult<DeleteSessionMutation>;
export type DeleteSessionMutationOptions = Apollo.BaseMutationOptions<DeleteSessionMutation, DeleteSessionMutationVariables>;
export const UpdateSessionDocument = gql`
    mutation updateSession($id: Int!, $input: SessionInput!) {
  updateSession(id: $id, input: $input) {
    id
    name
  }
}
    `;
export type UpdateSessionMutationFn = Apollo.MutationFunction<UpdateSessionMutation, UpdateSessionMutationVariables>;

/**
 * __useUpdateSessionMutation__
 *
 * To run a mutation, you first call `useUpdateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSessionMutation, { data, loading, error }] = useUpdateSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSessionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSessionMutation, UpdateSessionMutationVariables>) {
        return Apollo.useMutation<UpdateSessionMutation, UpdateSessionMutationVariables>(UpdateSessionDocument, baseOptions);
      }
export type UpdateSessionMutationHookResult = ReturnType<typeof useUpdateSessionMutation>;
export type UpdateSessionMutationResult = Apollo.MutationResult<UpdateSessionMutation>;
export type UpdateSessionMutationOptions = Apollo.BaseMutationOptions<UpdateSessionMutation, UpdateSessionMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    errors {
      message
    }
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    errors {
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;