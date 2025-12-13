interface CircleColorProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}
const CircleColor: React.FC<CircleColorProps> = ({ color, ...props }) => {
  return (
    <div {...props}>
      <div
        style={{ background: color }}
        className="size-4 rounded-full opacity-40 forced-color-adjust-none outline outline-offset-1"
      />
    </div>
  );
};

export default CircleColor;
