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
  mutation changeAvailability($input: PostInput!) {
    mutatedAvailability(input: $input) {
      id
      author
      body
      isAvailable
    }
  }
`;

const CHANGE_CONTENT = gql`
  mutation changeContent($id: ID!) {
    mutatedContent(id: $id) {
      id
      author
      body
      isAvailable
    }
  }
`;

export default () => {
const { data, loading, error } = useQuery(GET_POSTS);
const [changePostAvailavility] = useMutation(CHANGE_AVAILABILITY, {
  update(cache, { data: { mutatedAvailability } }) {
    const newData = cache.readQuery({ query: GET_POSTS });

    const id = parseInt(mutatedAvailability.id, 10);

    // cache.writeQuery({
    //   query: GET_POSTS,
    //   data: data.posts.slice(id, 1, newData.posts[id]),
    // });

    localStorage.setItem('newData', JSON.stringify(newData));
  }
  // refetchQueries: () => [{ query: GET_POSTS }]
});

const [changePostContent] = useMutation(CHANGE_CONTENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const newData = JSON.parse(localStorage.getItem("newData"));
  console.log('newData from localStorage', newData)

  const listData = newData || data   

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
      {listData.posts.map(post => (
        <tr key={post.id}>
          <td>{post.author}</td>
          <td>{post.body}</td>
          <td>{post.isAvailable ? 'Si' : 'No'}</td>
          <button 
          onClick={
            () => {
              changePostAvailavility({
                variables: {input: { id: post.id, author: post.author, body: post.body, isAvailable: post.isAvailable }}
              } )
          }
        }>Toggle</button>

        <button 
          onClick={
            () => {
              changePostContent({variables: 
                { id: post.id }
              })
          }
        }>Change content</button>
        </tr>
      ))}
    </tbody>
  </Table>
  )
}
