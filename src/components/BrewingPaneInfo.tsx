import { Input, Statistic } from "antd";
import { Duration } from "luxon";
import React, { FC, useState } from "react";
import { BrewInstructions } from "../types";

const { Countdown } = Statistic;

export const BrewingPaneInfo: FC<BrewInstructions> = ({
  temperature,
  leafAmount,
  duration,
}) => {
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<Duration | undefined>(
    duration
  );
  return (
    <>
      <p>Temperature: {temperature}</p>
      <p>Leaf quantity: {leafAmount}</p>
      {duration && (
        <Input.Search
          type="number"
          inputMode="decimal"
          style={{ maxWidth: "150px" }}
          size="large"
          defaultValue={duration?.as("seconds")}
          min={0}
          step={15}
          enterButton={timerStarted ? "Stop" : "Start"}
          onChange={(event) =>
            setTimerDuration(
              Duration.fromObject({ seconds: Number(event.target.value) })
            )
          }
          onSearch={() => setTimerStarted((previous) => !previous)}
        />
      )}
      <Countdown
        format="mm:ss"
        title="Duration"
        value={
          timerStarted && timerDuration
            ? Date.now() + timerDuration.as("milliseconds")
            : undefined
        }
        onFinish={() => setTimerStarted(false)}
        valueRender={duration ? undefined : () => "Not specified"}
      />
    </>
  );
};
