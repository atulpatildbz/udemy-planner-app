import { useEffect, useMemo, useState } from "react";
import { udemyData } from "./constants/data.js";
import "./ListComponent.css";
export const ListComponent = ({ setTotalTime, remainingTimeVelocity, selectedResult }) => {
    let chapterTitles = useMemo(() => {
        return [];
    }, []);

    const [startingIndex, setStartingIndex] = useState(0);
    const [plan, setPlan] = useState({});
    // plannerStartDate default value should be today's date in localestring format
    const [plannerStartDate, setPlannerStartDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        let totalTime = 0;
        udemyData.results.forEach(course => {
            if (course._class === "chapter") {
                chapterTitles.push(course.title);
            }
            // if course has "asset" and asset has "time_estimation" then add it to totalTime array
            if (course.asset && course.asset.time_estimation) {
                totalTime += course.asset.time_estimation;
            }
        });
        setTotalTime(totalTime);

        // set the starting index to the index of selectedResult in udemyData.results
        if (selectedResult) {
            console.log("setting starting index to: ", udemyData.results.indexOf(selectedResult));
            setStartingIndex(udemyData.results.indexOf(selectedResult) + 1);
        }
    }, [chapterTitles, setTotalTime, selectedResult]);

    useEffect(() => {
        // if selectedResult is not null, then start iterating through the results from the starting index
        if (selectedResult) {
            let plan = {};
            // startDate should be Date object converted from localestring plannerStartDate
            const startDate = new Date(plannerStartDate);
            // const startDate = new Date();
            for (let i = startingIndex; i < udemyData.results.length; i++) {
                // if the _class is not "lecture" then continue
                if (udemyData.results[i]._class !== "lecture") {
                    continue;
                }
                // if startDate key isn't present in plan object, then add it
                if (!plan[startDate]) {
                    plan[startDate] = { totalTime: 0, lectures: [] };
                }
                // if the lecture has a time_estimation, then add it to the totalTime and add the title to the lectures array
                if (udemyData.results[i].asset && udemyData.results[i].asset.time_estimation) {
                    plan[startDate].totalTime += udemyData.results[i].asset.time_estimation;
                    plan[startDate].lectures.push(udemyData.results[i].title);
                }
                // if the totalTime is greater than the remainingTimeVelocity, then increment the startDate by 1 day
                if (plan[startDate].totalTime > remainingTimeVelocity) {
                    startDate.setDate(startDate.getDate() + 1);
                    plan[startDate] = { totalTime: 0, lectures: [] };
                }
            }
            setPlan(plan);
        }
    }, [startingIndex, selectedResult, remainingTimeVelocity, plannerStartDate]);

    return (
        <div className="planner-container">
            <h3>Planner</h3>
            <div className="btn-group">
                Date offset:{" "}
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        // increment the plannerStartDate by 1 day convert the new date to locale string and set it to plannerStartDate
                        const newDate = new Date(plannerStartDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setPlannerStartDate(newDate.toLocaleDateString());
                    }}>
                    -
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        // decrement the plannerStartDate by 1 day convert the new date to locale string and set it to plannerStartDate
                        const newDate = new Date(plannerStartDate);
                        newDate.setDate(newDate.getDate() + 1);
                        setPlannerStartDate(newDate.toLocaleDateString());
                    }}>
                    +
                </button>
            </div>
            {/* for each key in plan, set h4 plan's key and render the lectures below it */}
            {Object.keys(plan).map(key => {
                return (
                    <div key={key}>
                        {/* convert the date to Weekday + Date + Year */}
                        <h4>
                            {new Date(key).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </h4>
                        {plan[key].lectures.map(lecture => {
                            return <p key={lecture}>{lecture}</p>;
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ListComponent;
