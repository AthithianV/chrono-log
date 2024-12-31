const Text = ({ text }:{text:string}) => {
    return (
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={"1.5em"}
        className="fill-current"
      >
        {text}
      </text>
    );
  };

export default Text;