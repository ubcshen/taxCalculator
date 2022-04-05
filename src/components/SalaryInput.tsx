export const SalaryInput = ({
  handleChange,
  value,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
}) => {
  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder="0"
      type="number"
    />
  );
};
