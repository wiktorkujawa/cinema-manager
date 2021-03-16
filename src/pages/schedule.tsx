import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import { useHallsQuery } from "../generated/graphql";
const schedule = () => {
  const { data, loading, error, refetch: refetchSessions } = useHallsQuery();

  const [sessions, setSessions] = useState([] as any);

  const [owners, setOwners] = useState([] as any);

  useEffect(() => {
    console.log("change");
    if (loading === false && data) {
      const colors: any = [
        "#FF3333",
        "#3333FF",
        "#FFFF33",
        "#33FF33",
        "#33FFFF",
        "#9933FF",
        "#FF9933",
        "#FF33FF",
        "#FF3399",
        "#A0A0A0",
      ];
      let pushSessions: any = [];
      let owners: any = [];
      data?.halls?.map(({ sessions, ...o }, index) => {
        owners.push({ id: o.id, text: o.name, color: colors[index % 10] });
        sessions.map((session: any) => {
          pushSessions.push({
            id: session.id,
            title: session.title,
            startDate: new Date(session.startDate),
            endDate: new Date(session.endDate),
            ownerId: o.id,
          });
        });
      });
      setSessions(pushSessions);
      setOwners(owners);
    }
  }, [loading, data]);

  // const owners = data?.halls?.map(({ name, id }, index) => ({ id, text: name, color: colors[index % 10] })) || []
  // const sessions = data?.halls?.map( ({sessions, id}) => sessions.map( session => ({...session, ownerId: id})) ).flat(1) || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>`Error! ${error.message}`</div>;
  // you can check if the currentMovie is undefined and use it to return something

  return (
    <div>
      <Calendar
        sessions={sessions}
        owners={owners}
        refetchSessions={refetchSessions}
      />
      {/* <Calendar/> */}
    </div>
  );
};

export default schedule;
