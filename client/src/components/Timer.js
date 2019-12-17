import React, { useEffect, useState } from "react";
import { graphql } from "react-apollo";
import {
  createLoggingMutation,
  updateLoggingMutation,
  deleteLogMutation
} from "../queries/mutation";
import { getLoggingsQuery } from "../queries/queries";
import { flowRight } from "lodash";
import { Button, Table } from "react-bootstrap";

const Timer = props => {
  const { createLoggingMutation } = props;
  let timeLogs = props.getLoggingsQuery.getLogs
    ? props.getLoggingsQuery.getLogs
    : [];
  const [timeLogId, setTimeLogId] = useState("");
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(true);
  const [time, setTime] = useState({
    minutes: 2,
    seconds: 0
  });

  const timeHandler = ({ target }) => {
    const { id } = target;

    if (id === "start") {
      if (paused || over) {
        const { minutes, seconds } = time;

        let newLog = {
          startTime: `${(0)
            .toString()
            .padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        };

        props
          .createLoggingMutation({
            variables: newLog,
            refetchQueries: [
              {
                query: getLoggingsQuery
              }
            ]
          })
          .then(res => setTimeLogId(res.data.createLog.id));
      }

      setPaused(false);
      setOver(false);
    }

    if (id === "stop") {
      const { minutes, seconds } = time;
      if (!paused || over) {
        let newLog = {
          id: timeLogId,
          stopTime: `${(0)
            .toString()
            .padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        };

        props.updateLoggingMutation({
          variables: newLog,
          refetchQueries: [
            {
              query: getLoggingsQuery
            }
          ]
        });
      }
      setPaused(true);
    }
  };

  const tick = () => {
    // props.createTourMutation({
    //   variables: { startTime: time.minutes + ":" + time.seconds }
    // });

    if (paused || over) return;
    if (time.minutes === 0 && time.seconds === 0) {
      setOver(true);
    } else if (time.seconds === 0)
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    else
      setTime({
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
  };

  const reset = () => {
    setTime({
      minutes: 2,
      seconds: 0
    });
    setPaused(false);
    setOver(false);
  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const deleteHandler = e => {
    let deleteLog = {
      id: e.target.id
    };
    props.deleteLogMutation({
      variables: deleteLog,
      refetchQueries: [
        {
          query: getLoggingsQuery
        }
      ]
    });
  };

  return (
    <div>
      <h1>
        Current Count :{" "}
        {`${(0).toString().padStart(2, "0")}:${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
      </h1>
      <Button id="start" className="btn btn-primary" onClick={timeHandler}>
        start
      </Button>
      <Button id="stop" className="btn btn-primary" onClick={timeHandler}>
        stop
      </Button>

      <Table>
        <tbody>
          <tr>
            <th scope="col">start time</th>
            <th scope="col">stop time</th>

            <th scope="col">action</th>
          </tr>
        </tbody>
        <tbody>
          {timeLogs.map((timeLog, index) => {
            const { id, startTime, stopTime } = timeLog;
            return (
              <tr key={index}>
                <td>{startTime}</td>
                <td>{stopTime}</td>

                <td>
                  <Button
                    id={timeLog.id}
                    className="btn btn-danger"
                    onClick={deleteHandler}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default flowRight(
  graphql(getLoggingsQuery, { name: "getLoggingsQuery" }),
  graphql(createLoggingMutation, { name: "createLoggingMutation" }),
  graphql(updateLoggingMutation, { name: "updateLoggingMutation" }),
  graphql(deleteLogMutation, { name: "deleteLogMutation" })
)(Timer);
