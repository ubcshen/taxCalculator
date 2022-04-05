export type TaxBracket = {
  lvl: number;
  lvlRate: number;
};

export type CountryTaxInfo = {
  health: number;
  employerSocialSecurity: number;
  employerTaxBrackets: TaxBracket[];
  socialSecurity: number;
  taxBrackets: TaxBracket[];
};

export type taxAttributes = {
  healthInsurance: number;
  employerSocialSecurity: number;
  payrollBracketAmount: number;
  ssAmount: number;
  taxBracketAmount: number;
  employerCost: number;
  netSalary: number;
};

export type countryInfo = {
  countryName: string;
}
