import "./App.css";
import Layout from "./components/Header";
import BasicDateCalendar from "./components/Calendar/Calendar";

function App() {
  return (
    <>
    <Layout/>
    <BasicDateCalendar className="dateCalendar"/>
    </>
  );
}

export default App;
