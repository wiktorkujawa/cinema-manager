import React from 'react'
import { useRouter } from 'next/router';
const id = () => {
  const router = useRouter();

  console.log(router);
  return (
    <div>
      {router.query.id}
    </div>
  )
}

export default id
