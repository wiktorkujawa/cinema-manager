import React, { useState
  // , useEffect
 } from "react";
import Paper from "@material-ui/core/Paper";
// import TableCell from "@material-ui/core/TableCell";
import {
  darken,
  fade,
  lighten,
} from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
// import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
// import WbSunny from '@material-ui/icons/WbSunny';
// import FilterDrama from '@material-ui/icons/FilterDrama';
// import Opacity from '@material-ui/icons/Opacity';
import ColorLens from "@material-ui/icons/ColorLens";
import { withStyles } from "@material-ui/core/styles";
import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { useDeleteSessionMutation, useMoveSessionMutation } from "../generated/graphql";
// import { useSessionsQuery } from '../generated/graphql';

const getBorder = (theme: any) =>
  `1px solid ${
    theme.palette.type === "light"
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`;


const MonthScaleCell = (props: any) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

const DayScaleCell = (props: any) => (
  <DayView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

const WeekScaleCell = (props: any) => (
  <WeekView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

const styles: any = (theme: any) => ({
  cell: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-child": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
  text: {
    padding: "0.5em",
    textAlign: "center",
  },
  sun: {
    color: "#FFEE58",
  },
  cloud: {
    color: "#90A4AE",
  },
  rain: {
    color: "#4FC3F7",
  },
  sunBack: {
    backgroundColor: "#FFFDE7",
  },
  cloudBack: {
    backgroundColor: "#ECEFF1",
  },
  rainBack: {
    backgroundColor: "#E1F5FE",
  },
  opacity: {
    opacity: "0.5",
  },
  appointment: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6,
    },
  },
  apptContent: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: "none",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    width: "400px",
  },
  tooltipText: {
    ...theme.typography.body2,
    display: "inline-block",
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: "middle",
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: "super",
  },
  textCenter: {
    textAlign: "center",
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

// const WeatherIcon = (props:any) => {
//   const {classes, id } = props;
//   switch (id) {
//     case 0:
//       return <Opacity className={classes.rain} fontSize="large" />;
//     case 1:
//       return <WbSunny className={classes.sun} fontSize="large" />;
//     case 2:
//       return <FilterDrama className={classes.cloud} fontSize="large" />;
//     default:
//       return null;
//   }
// };

// const CellBase = React.memo((props: any) => {
//   const { classes, startDate, otherMonth, formatDate } = props;
//   const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
//   const isFirstMonthDay = startDate.getDate() === 1;
//   const formatOptions = isFirstMonthDay
//     ? { day: "numeric", month: "long" }
//     : { day: "numeric" };
//   return (
//     <TableCell
//       tabIndex={0}
//       className={classNames({
//         [classes.cell]: true,
//         [classes.rainBack]: iconId === 0,
//         [classes.sunBack]: iconId === 1,
//         [classes.cloudBack]: iconId === 2,
//         [classes.opacity]: otherMonth,
//       })}
//     >
//       {/* <div className={classes.content}>
//         <WeatherIcon classes={classes} id={iconId} />
//       </div> */}
//       <div className={classes.text}>{formatDate(startDate, formatOptions)}</div>
//     </TableCell>
//   );
// });

// const TimeTableCell = withStyles(styles, { name: "Cell" })(CellBase);

const Appointment = withStyles(styles, {
  name: "Appointment",
})(({ classes, ...restProps }: any) => (
  <Appointments.Appointment {...restProps} className={classes.appointment} />
));

const AppointmentContent = withStyles(styles, {
  name: "AppointmentContent",
})(({ classes, ...restProps }: any) => (
  <Appointments.AppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
));

const FlexibleSpace = withStyles(styles, { name: "ToolbarRoot" })(
  ({ classes, ...restProps }: any) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <div className={classes.flexContainer}>
        <ColorLens fontSize="large" htmlColor="#FF7043" />
        <Typography variant="h5" style={{ marginLeft: "10px" }}>
          Art School
        </Typography>
      </div>
    </Toolbar.FlexibleSpace>
  )
);

const Calendar = (props: any) => {
  let { sessions, halls, refetchSessions } = props;

  const [moveSession] = useMoveSessionMutation();

  const [deleteSession] = useDeleteSessionMutation();

  const options = ["Day", "Week", "Month"];

  const [view, setView] = useState('Month');

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Month",
    defaultValue: view,
    onChange: (value:any) => setView(value),
  });

  const group = getRootProps();


  const resources = [
    {
      fieldName: "hallId",
      title: "Halls",
      instances: halls,
    },
  ];
  

  const commitChanges = ({ added, changed, deleted }: any) => {

    if (added) {
      // const startingAddedId =
      //   appointments.length > 0
      //     ? appointments[appointments.length - 1].id + 1
      //     : 0;
      // setAppointments([...appointments, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      console.log(changed);
      
      const id = Object.keys(changed)[0];
      // if(view == "Month"){

      //   const old = sessions.find((session:any) => session.id === parseInt(id));
      //   const difference = old.endDate.getTime() - old.startDate.getTime();
      //   const startTime = old.startDate.getHours()*3600000+old.startDate.getMinutes()*60000;
      //   changed[id].startDate = new Date(changed[id].startDate.getTime()+startTime).toISOString(); 
      //   changed[id].endDate = new Date(changed[id].endDate.getTime()-86400000+startTime+difference).toISOString();
      // }

        return moveSession({variables:{
          input: {
            id: parseInt(id),
            ...changed[id]
          }
        }, refetchQueries: refetchSessions
      })
      // console.log("do something");
    }
    if (deleted !== undefined) {
      deleteSession({
        variables: { id: deleted },
        refetchQueries: refetchSessions,
      })
      // setAppointments(
      //   appointments.filter((appointment: any) => appointment.id !== deleted)
      // );
    }
    //   return { data };
    // });
  };

  return (
    <Paper className="pt-3" >
   
      <Scheduler data={sessions}>

        
        <HStack display="flex" justifyContent="center" zIndex={{md:"2"}} position={{md:"absolute"}} left={{md:"50%"}} transform={{md:"translateX(-50%)"}} {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value } as any)
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
        <EditingState onCommitChanges={commitChanges} />
        <ViewState defaultCurrentDate={Date.now()} currentViewName={view} />


        <MonthView
          // timeTableCellComponent={TimeTableCell as any}
          dayScaleCellComponent={MonthScaleCell}
        /> 
        <WeekView
          dayScaleCellComponent={WeekScaleCell}
        /> 
        <DayView
          dayScaleCellComponent={DayScaleCell}
        /> 



        <Appointments
          appointmentComponent={Appointment as any}
          appointmentContentComponent={AppointmentContent as any}
        />
        <Resources data={resources} />

        <Toolbar flexibleSpaceComponent={FlexibleSpace as any} />
        
        <DateNavigator />

        <EditRecurrenceMenu />
        <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
        <AppointmentForm />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
