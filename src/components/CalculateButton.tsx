import { FormEvent, useEffect, useState } from "react";
import { CountryTaxInfo, taxAttributes } from "../types/tax.types";
import { DisplayTable } from "./DisplayTable";

const SALARY_INFO_PATH = "salary.json";
const taxTables: taxAttributes[] = [];
const countryTables: string[] = [];

export const CalculateButton = ({
  salary,
  country,
}: {
  salary: number;
  country: string;
}) => {
  const [data, setData] = useState([]);
  const [selectCountry, setSelectCountry] = useState(country);
  const getData = () => {
    fetch(SALARY_INFO_PATH)
      .then((e) => {
        return e.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, [data]);

  countryTables.length = 0;

  if (data !== null) {
    Object.keys(JSON.parse(JSON.stringify(data))).forEach((i) =>
      countryTables.push(i)
    );
  }

  const handleSelectChange = ({ target }: FormEvent<HTMLSelectElement>) => {
    const { value } = target as HTMLSelectElement;

    setSelectCountry(value);
  };

  const onCalculate = () => {
    let taxAmount = 0;
    let payrollTaxAmount = 0;
    let taxBracketAmount = 0;
    let payrollBracketAmount = 0;
    let healthInsurance = 0;
    let employerSocialSecurity = 0;
    let ssAmount = 0;
    let employerCost = 0;
    let netSalary = 0;

    taxTables.length = 0;

    if (data !== null && salary > 0) {
      const countryTaxInfo = JSON.parse(JSON.stringify(data));

      const select = [selectCountry];

      const filtered = Object.keys(countryTaxInfo)
        .filter((key) => select.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: countryTaxInfo[key],
          };
        }, {});

      Object.values(filtered).map((singleCountryTax) => {
        Object.entries(singleCountryTax as CountryTaxInfo).forEach(
          ([key, value]) => {
            if (key === "HealthInsurance") {
              if (typeof value === "number" && !isNaN(value)) {
                healthInsurance = Math.ceil((value / 100) * salary);
                payrollTaxAmount += Math.ceil((value / 100) * salary);
              }
            }
            if (key === "EmployerSocialSecurity") {
              if (typeof value === "number" && !isNaN(value)) {
                employerSocialSecurity = Math.ceil((value / 100) * salary);
                payrollTaxAmount += Math.ceil((value / 100) * salary);
              }
            }
            if (key === "SocialSecurity") {
              if (typeof value === "number" && !isNaN(value)) {
                ssAmount = Math.ceil((value / 100) * salary);
                taxAmount += Math.ceil((value / 100) * salary);
              }
            }
            if (key === "TaxBrackets") {
              if (typeof value === "object") {
                value.forEach((taxValue, index) => {
                  const netAmount =
                    taxValue.lvl === -1
                      ? salary >= value[index - 1].lvl
                        ? salary - value[index - 1].lvl
                        : 0
                      : salary >= taxValue.lvl && index > 0
                      ? taxValue.lvl - value[index - 1].lvl
                      : 0;
                  const netLvl1Amount =
                    salary < taxValue.lvl ? salary : taxValue.lvl;

                  if (index === 0) {
                    taxAmount += Math.ceil(
                      (netLvl1Amount * taxValue.lvlRate) / 100
                    );
                    taxBracketAmount += Math.ceil(
                      (netLvl1Amount * taxValue.lvlRate) / 100
                    );
                  }
                  if (index > 0) {
                    taxAmount +=
                      netAmount >= 0
                        ? Math.ceil((netAmount * taxValue.lvlRate) / 100)
                        : 0;
                    taxBracketAmount +=
                      netAmount >= 0
                        ? Math.ceil((netAmount * taxValue.lvlRate) / 100)
                        : 0;
                  }
                });
              }
            }
            if (key === "EmployerTaxBrackets") {
              if (typeof value === "object") {
                value.forEach((taxValue, index) => {
                  const netAmount =
                    taxValue.lvl === -1
                      ? salary >= value[index - 1].lvl
                        ? salary - value[index - 1].lvl
                        : 0
                      : salary >= taxValue.lvl && index > 0
                      ? taxValue.lvl - value[index - 1].lvl
                      : 0;

                  const netLvl1Amount =
                    salary < taxValue.lvl ? salary : taxValue.lvl;

                  if (index === 0) {
                    payrollTaxAmount += Math.ceil(
                      (netLvl1Amount * taxValue.lvlRate) / 100
                    );
                    payrollBracketAmount += Math.ceil(
                      (netLvl1Amount * taxValue.lvlRate) / 100
                    );
                  }
                  if (index > 0) {
                    payrollTaxAmount +=
                      netAmount >= 0
                        ? Math.ceil((netAmount * taxValue.lvlRate) / 100)
                        : 0;
                    payrollBracketAmount +=
                      netAmount >= 0
                        ? Math.ceil((netAmount * taxValue.lvlRate) / 100)
                        : 0;
                  }
                });
              }
            }
          }
        );
        employerCost = payrollTaxAmount + salary;
        netSalary = salary - taxAmount;
        taxTables.push({
          healthInsurance,
          employerSocialSecurity,
          payrollBracketAmount,
          ssAmount,
          taxBracketAmount,
          employerCost,
          netSalary,
        });
      });
    }
  };
  return (
    <>
      <select onChange={handleSelectChange} value={selectCountry}>
        {countryTables &&
          countryTables.map((countryName, i) => {
            return (
              <option value={countryName} key={countryName + i}>
                {countryName}
              </option>
            );
          })}
      </select>
      <button onClick={onCalculate}>Calculate</button>
      <div>
        {taxTables &&
          taxTables.map((taxTable, i) => {
            return (
              <DisplayTable
                health={taxTable.healthInsurance}
                employerSS={taxTable.employerSocialSecurity}
                employerTax={taxTable.payrollBracketAmount}
                ss={taxTable.ssAmount}
                incomeTax={taxTable.taxBracketAmount}
                employerCost={taxTable.employerCost}
                netSalary={taxTable.netSalary}
                key={taxTable.ssAmount + i}
              />
            );
          })}
      </div>
    </>
  );
};
