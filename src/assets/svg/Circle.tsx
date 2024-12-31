
const Circle = ({ color, percentage }: {color:string, percentage?:number}) => {
    const r = 80;
    const circ = 2 * Math.PI * r;
    const strokePct = ((percentage?percentage:0) * circ) / 100;
    return (
      <circle
        r={r}
        cx={100}
        cy={100}
        fill="transparent"
        stroke={strokePct !== circ ? color : ""}
        strokeWidth={"0.2rem"}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
      ></circle>
    );
  };

export default Circle;