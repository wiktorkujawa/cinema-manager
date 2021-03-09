import { Button, Link } from '@chakra-ui/react';
import React from 'react'
import { useDeletePostMutation } from '../../../generated/graphql';
import UpdatePost from './UpdatePost';
import { useRouter } from 'next/router';

const Item = (props: any) => {

  const base = useRouter();
  console.log(base);
  const { post, refetchPosts } = props;

  const [deletePost] = useDeletePostMutation();

  const onDelete = () => deletePost({ variables: { id: post.id } }).then(() => refetchPosts() )
  return (
    <li className="d-flex">
     <Link href={`${base.asPath}/${post.id}`}> <p className="mx-2">{post.content}</p> </Link>
      <Button colorScheme="red" size="xs" onClick={onDelete} >X</Button>      
      <UpdatePost refetchPosts={refetchPosts} post={post}/>
    </li>
  )
}

export default Item
