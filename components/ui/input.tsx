interface InputProps {
  placeholder: string;
}

export const Input = ({ placeholder }: InputProps) => {
  return (
    <input
      className="bg-transparent px-5 py-2 border border-blue w-full text-white placeholder:text-white/60"
      placeholder={placeholder}
    />
  );
};
