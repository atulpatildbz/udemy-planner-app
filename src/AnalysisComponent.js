import { useCallback, useEffect, useState } from "react";
import Search from "./Search";
import { udemyData } from "./constants/data";

export const AnalysisComponent = ({
    totalTime,
    remainingTimeVelocity,
    setRemainingTimeVelocity,
    selectedResult,
    setSelectedResult,
}) => {
    // default start date should be 5th Dec 2021
    const [startDate, setStartDate] = useState(new Date("2021-12-05"));
    // default end date should be 15th Jan 2022
    const [endDate, setEndDate] = useState(new Date("2022-01-15"));
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(totalTime);
    const [excludeSundays, setExcludeSundays] = useState(false);
    const convertSecondsToReadableTime = seconds => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - hours * 3600) / 60);
        // show hours only if it's greater than 0
        const hoursString = hours > 0 ? `${hours}h ` : "";
        return `${hoursString}${minutes}m`;
    };
    // convert totalTime from seconds to human readable format
    const readableTime = convertSecondsToReadableTime(totalTime);

    useEffect(() => {
        // when the selectedResult changes, update the remainingTimeInSeconds
        if (selectedResult) {
            setRemainingTimeInSeconds(
                udemyData.results
                    .slice(udemyData.results.indexOf(selectedResult) + 1)
                    .reduce((acc, curr) => {
                        if (curr._class === "lecture" && curr.asset?.time_estimation) {
                            return acc + curr.asset.time_estimation;
                        }
                        return acc;
                    }, 0),
            );
        }
    }, [selectedResult]);

    const getDaysBetweenDates = useCallback(
        (startDate, endDate) => {
            let daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            if (excludeSundays) {
                // get the number of sundays between the start and end dates
                const sundays = [];
                let currentDate = startDate;
                while (currentDate <= endDate) {
                    if (currentDate.getDay() === 0) {
                        sundays.push(currentDate);
                    }
                    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
                }
                // subtract the number of sundays from the number of days between the start and end dates
                daysBetween -= sundays.length;
            }
            return daysBetween;
        },
        [excludeSundays],
    );

    useEffect(() => {
        setRemainingTimeVelocity(remainingTimeInSeconds / getDaysBetweenDates(new Date(), endDate));
    }, [setRemainingTimeVelocity, remainingTimeInSeconds, endDate, getDaysBetweenDates]);

    return (
        <div>
            <h3>Total Time: {readableTime}</h3>
            <Search setSelectedResult={setSelectedResult} />
            {selectedResult && (
                <div>
                    <h4>Remaining Time:</h4>
                    {convertSecondsToReadableTime(remainingTimeInSeconds)}
                </div>
            )}
            <div className="date-input-containers">
                <h4>Time Input</h4>
                {/* start date input. Default value should be 5th dec 2021 */}
                Start Date:{" "}
                <input
                    type="date"
                    onChange={event => setStartDate(new Date(event.target.value))}
                    value={startDate.toISOString().substring(0, 10)}
                />{" "}
                End Date:{" "}
                <input
                    type="date"
                    onChange={event => setEndDate(new Date(event.target.value))}
                    value={endDate.toISOString().substring(0, 10)}
                />{" "}
                {/* checkbox for excluding Sundays */}
                <input
                    type="checkbox"
                    onChange={event => setExcludeSundays(event.target.checked)}
                    checked={excludeSundays}
                />
                <label>Exclude Sundays</label>{" "}
            </div>
            <div className="insights-container">
                <h3>Insights</h3>
                {/* show per day completion for totalTime. */}
                <div className="insight">
                    <h4>Per Day Completion for whole course</h4>
                    For completing the whole course in {getDaysBetweenDates(
                        startDate,
                        endDate,
                    )}{" "}
                    days, you need to do{" "}
                    <b>
                        {convertSecondsToReadableTime(
                            totalTime / getDaysBetweenDates(startDate, endDate),
                        )}
                    </b>{" "}
                    per day
                    <h4>Per Day Completion for remaining lectures</h4>
                    For completing the remaining lectures in{" "}
                    {/* days between current date and end date*/}
                    {getDaysBetweenDates(new Date(), endDate)} days, you need to do{" "}
                    <b>{convertSecondsToReadableTime(remainingTimeVelocity)}</b> per day
                    {/* show current velocity */}
                    <h4>Current Velocity</h4>
                    In the last {getDaysBetweenDates(startDate, new Date())} days, you have
                    completed{" "}
                    <b>
                        {convertSecondsToReadableTime(
                            (totalTime - remainingTimeInSeconds) /
                                getDaysBetweenDates(startDate, new Date()),
                        )}
                    </b>{" "}
                    per day
                </div>
            </div>
        </div>
    );
};
export default AnalysisComponent;
