import React from 'react'
import Calendar from '../components/Calendar';
import { useHallsQuery } from '../generated/graphql';
const schedule = () => {

  const { data, loading, error, refetch:refetchHalls } = useHallsQuery();
  
    if (loading) return <div>Loading...</div>
    if (error) return <div>`Error! ${error.message}`</div>

    const colors: any = [
      '#FF3333',
      '#3333FF',
      '#FFFF33',
      '#33FF33',
      '#33FFFF',
      '#9933FF',
      '#FF9933',
      '#FF33FF',
      '#FF3399',
      '#A0A0A0'
    ];
    
    let pushSessions:any = [];
    let owners:any = [];
    data?.halls?.map(({sessions, ...o}, index) =>{
      owners.push({id:o.id,
      text:o.name,
      color: colors[index%10]});
      sessions.map((session:any) => {
        pushSessions.push({...session,
          ownerId: o.id});
      })
  })

  console.log(pushSessions);
  console.log(owners);

  return (
    <div>
      <Calendar sessions={pushSessions as any} owners={owners} refetchSessions={refetchHalls} />
      {/* <Calendar/> */}
    </div>
  )
}

export default schedule

