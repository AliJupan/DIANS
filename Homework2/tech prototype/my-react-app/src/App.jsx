import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import HistoricalDataPage from "./HistoricalData";
import TotalProfits from "./TotalProfits";
import TechnicalAnalysis from "./TechnicalAnalysis";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/historicalData" element={<HistoricalDataPage />} />
                    <Route path="/totalProfits" element={<TotalProfits />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;