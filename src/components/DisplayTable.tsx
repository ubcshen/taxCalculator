export const DisplayTable = ({
  health,
  employerSS,
  employerTax,
  ss,
  incomeTax,
  employerCost,
  netSalary,
}: {
  health: number;
  employerSS: number;
  employerTax: number;
  ss: number;
  incomeTax: number;
  employerCost: number;
  netSalary: number;
}) => {
  return (
    <div className="countryTaxTable">
      <div className="countryTaxTableContainer">
        <div className="leftTaxTable">
          <h2>Employer taxes</h2>
          <div>Health Insurance: ${health}</div>
          <div>Social Security: ${employerSS}</div>
          <div>Payroll Tax: ${employerTax}</div>
          <div>
            Total Cost: Gross salary + Sum of all employer taxes ($
            {employerCost})
          </div>
        </div>
        <div className="rightTaxTable">
          <h2>Employee taxes</h2>
          <div>Social Security: ${ss}</div>
          <div>Income tax: ${incomeTax}</div>
          <div>
            Net Salary: Gross salary - Sum of all employee taxes ($
            {netSalary})
          </div>
        </div>
      </div>
    </div>
  );
};
