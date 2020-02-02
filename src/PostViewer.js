import React from 'react';
import LOGO from './images/campania-logo.jpg';
import './styles.scss';

import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`;

export default () => {
const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Table>
    <thead>
      <tr>
        <th>Author</th>
        <th>Body</th>
      </tr>
    </thead>
    <tbody>
      {data.posts.map(post => (
        <tr key={post.id}>
          <td>{post.author}</td>
          <td>{post.body}</td>
        </tr>
      ))}
    </tbody>
  </Table>
  )
}
