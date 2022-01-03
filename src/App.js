import { useState } from "react";
import ListComponent from "./ListComponent";
// import App.css
import "./App.css";
import AnalysisComponent from "./AnalysisComponent";

function App() {
    const [totalTime, setTotalTime] = useState(0);
    const [remainingTimeVelocity, setRemainingTimeVelocity] = useState(0);
    const [selectedResult, setSelectedResult] = useState(null);
    return (
        <div className="App">
            <header className="App-header">
                <h1>Udemy Course</h1>
            </header>
            {/* on the left side show list component and on the right show analysis component */}
            <div className="container">
                <div className="col-md-6">
                    <AnalysisComponent
                        totalTime={totalTime}
                        remainingTimeVelocity={remainingTimeVelocity}
                        setRemainingTimeVelocity={setRemainingTimeVelocity}
                        selectedResult={selectedResult}
                        setSelectedResult={setSelectedResult}
                    />
                </div>
                <div className="col-md-6">
                    <ListComponent
                        setTotalTime={setTotalTime}
                        remainingTimeVelocity={remainingTimeVelocity}
                        selectedResult={selectedResult}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
