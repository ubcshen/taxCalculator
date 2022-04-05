import { FormEvent, useState } from "react";
import "./App.css";
import { CalculateButton } from "./components/CalculateButton";
import { SalaryInput } from "./components/SalaryInput";

function App() {
  const [salary, setSalary] = useState(0);
  const [country, setCountry] = useState("CountryA");
  const handleChange = ({ target }: FormEvent<HTMLInputElement>) => {
    const { value } = target as HTMLInputElement;

    setSalary(value.length === 0 ? 0 : parseInt(value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>a simple tax calculator in ReactJS</p>
        <SalaryInput handleChange={handleChange} value={salary} />
        <CalculateButton salary={salary} country={country} />
      </header>
    </div>
  );
}

export default App;
