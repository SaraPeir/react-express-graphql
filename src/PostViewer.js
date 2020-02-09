import React from 'react';
import './styles.scss';

import { useQuery, useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
      isAvailable
    }
  }
`;

const CHANGE_AVAILABILITY = gql`
  mutation MutatePost($id: ID!) {
    mutatedPost(id: $id) {
      id
      author
      body
      isAvailable
    }
  }
`;

export default () => {
const { data, loading, error } = useQuery(GET_POSTS);
const [mutatedPost] = useMutation(CHANGE_AVAILABILITY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Table>
    <thead>
      <tr>
        <th>Author</th>
        <th>Body</th>
        <th>available</th>
      </tr>
    </thead>
    <tbody>
      {data.posts.map(post => (
        <tr key={post.id}>
          <td>{post.author}</td>
          <td>{post.body}</td>
          <td>{post.isAvailable ? 'Si' : 'No'}</td>
          <button 
          onClick={
            () => {
              mutatedPost({variables: {
                id: post.id
              }})
          }
        }>Toggle</button>
        </tr>
      ))}
    </tbody>
  </Table>
  )
}
