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
                    <Route path="/" element={<HistoricalDataPage />} />
                    <Route path="/totalProfits" element={<TotalProfits />} />
                    <Route path="/technical" element={<TechnicalAnalysis />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;