import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import { useHallsQuery } from "../generated/graphql";
const schedule = () => {
  const { data, loading, error, refetch: refetchSessions } = useHallsQuery({pollInterval:2000});

  const [sessions, setSessions] = useState([] as any);

  const [halls, setHalls] = useState([] as any);

  useEffect(() => {
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
      let halls: any = [];
      data?.halls?.map(({ sessions, ...o }, index) => {
        halls.push({ id: o.id, text: o.name, color: colors[index % 10] });
        sessions.map((session: any) => {
          pushSessions.push({
            id: session.id,
            title: session.title,
            notes: session.notes,
            startDate: new Date(session.startDate),
            endDate: new Date(session.endDate),
            hallId: o.id,
          });
        });
      });
      setSessions(pushSessions);
      setHalls(halls);
    }
  }, [loading, data]);

  // const halls = data?.halls?.map(({ name, id }, index) => ({ id, text: name, color: colors[index % 10] })) || []
  // const sessions = data?.halls?.map( ({sessions, id}) => sessions.map( session => ({...session, hallId: id})) ).flat(1) || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>`Error! ${error.message}`</div>;
  // you can check if the currentMovie is undefined and use it to return something

  return (
    <div>
      <Calendar
        sessions={sessions}
        halls={halls}
        refetchSessions={refetchSessions}
      />
    </div>
  );
};

export default schedule;
