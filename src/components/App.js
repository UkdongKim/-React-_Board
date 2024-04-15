import './App.css'
import logo from "../logo.svg"
import Header from "./Header"
import AppContent from "./AppContent";

function App() {

    return(
        <div>
            <Header pageTitle="Frontend authenticated with JWT" logoSrc={logo} />
            <AppContent></AppContent>
        </div>
    )

}

export default App;