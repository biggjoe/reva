import React from "react";
interface Prop {
  currency?: any;
  value: string | number;
}
const Curx = (props: any) => {
  const itm = props.val;
  if (!itm) {
    return "₦";
  } else {
    return itm;
  }
};

function Currency(props: Prop) {
  var value = props.value;
  var currency = props.currency;
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    let vls = value;
    vls = typeof vls !== "number" ? parseInt(vls) : vls;
    vls = vls.toFixed(2);
    vls = vls.toString();
    //let Curr = currs ? currs : "₦";
    let resp = vls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setResult(resp);
  }, [currency, value]); //componentDidMount

  return (
    <React.Fragment>
      <span className="inline-flex flex-row align-items-center">
        <Curx val={props.currency} />
        {result}
      </span>
    </React.Fragment>
  );
}

export default React.memo(Currency);
