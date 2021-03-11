import React from 'react';
import AddPost from '../components/Post/CRUDForms/AddPost';
import Item from '../components/Post/Item';

import { usePostsQuery } from '../generated/graphql'


const Posts = () => {

  const {data, refetch: refetchPosts } = usePostsQuery({});

  if(!data?.posts){
    return <div>...loading</div>;
  }
  
  return (
    <>

    <ul>
    {
      data.posts.map(item => {
        return <Item key={item.id} post={item} refetchPosts={refetchPosts}/>
      })
    }
    </ul>
      <AddPost refetchPosts={refetchPosts}/>
    </>
  )
}

export default Posts