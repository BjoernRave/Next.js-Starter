import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  createDraft: Post,
  deletePost?: Maybe<Post>,
  login: AuthPayload,
  publish?: Maybe<Post>,
  signup: AuthPayload,
};


export type MutationCreateDraftArgs = {
  content?: Maybe<Scalars['String']>,
  title: Scalars['String']
};


export type MutationDeletePostArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationPublishArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationSignupArgs = {
  email: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  password: Scalars['String']
};

export type Post = {
   __typename?: 'Post',
  author?: Maybe<User>,
  content?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  published: Scalars['Boolean'],
  title: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  feed: Array<Post>,
  filterPosts: Array<Post>,
  me?: Maybe<User>,
  post?: Maybe<Post>,
};


export type QueryFilterPostsArgs = {
  searchString?: Maybe<Scalars['String']>
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['ID']>
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  posts: Array<Post>,
};

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { feed: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title'>
  )> }
);

