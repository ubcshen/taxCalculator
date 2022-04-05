# taxCalculator

In every country, both the employer and employee have to pay taxes on their income. This taxes apply to the Gross Salary of the employee. This is a sample calculator to do this. 

<b>can use reducer ro create a new display object. something like</b>

<code>
Object.values(filtered).map((singleCountryTax) => {
  Object.entries(singleCountryTax as CountryTaxInfo).reduce(
    (object, current) => {
      if (
        current[0] === "HealthInsurance" &&
        typeof current[1] === "number" &&
        !isNaN(current[1])
      ) {
        object.healthInsurance += Math.ceil(
          (current[1] / 100) * salary
        );
      }
      console.log(object);
      return object;
    },
    { healthInsurance: 0 }
  );
});
</code>
