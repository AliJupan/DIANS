import TotalProfits from "./TotalProfits";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppBar from "./Components/AppBar"

function App() {
    return (
        <Router>
                    <AppBar/>
        <Routes>
            <Route path="/">
                <Route path="/totalProfits" element={<TotalProfits />} />
            </Route>
        </Routes>
    </Router>
    );
}

export default App;
