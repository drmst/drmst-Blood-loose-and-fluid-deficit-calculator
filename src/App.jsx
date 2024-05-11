import "./App.css";
import Asa from "./components/Asa";
import Fasting from "./components/Fasting";

import Htc from "./components/Htc";
import OperationScale from "./components/OperationScale";
import Sex from "./components/Sex";
import Table from "./components/Table";
import Weight from "./components/Weight";
import { useEffect, useState } from "react";

function App() {
  const [Tekk, setTekk] = useState(0);
  const [weight, setWeight] = useState(70);
  const [sex, setSex] = useState("Erkek");
  const [htcValue, setHtcValue] = useState(30);
  const [asaValue, setAsaValue] = useState(24);
  const [scale, setScale] = useState(3);
  const [fluidDeficitPerHour, setFluidDeficitPerHour] = useState(0);
  const [oneNightLiquidDeficit, setOneNightLiquidDeficit] = useState(0);
  const [fastingTime, setFastingTime] = useState(6);
  const [operationSeverity, setOperationSeverity] = useState(1);
  const [totalFluid, setTotalFluid] = useState([]);

  let cins = 0;
  if (sex === "Erkek") {
    cins = 75;
  } else if (sex === "Kadın") {
    cins = 65;
  } else if (sex == "Cocuk") {
    cins = 80;
  } else if (sex == "YeniDogan") {
    cins = 85;
  }

  useEffect(() => {
    const calculatedTekk = (weight * cins * (htcValue - asaValue) * 3) / 100;
    setTekk(calculatedTekk > 0 ? calculatedTekk : "0, Doktora haber ver!");
    if (weight <= 10) {
      setFluidDeficitPerHour(weight * 4);
    } else if (weight > 10 && weight <= 20) {
      setFluidDeficitPerHour(40 + (weight - 10) * 2);
    } else if (weight > 20) setFluidDeficitPerHour(40 + Number(weight));
    setOneNightLiquidDeficit(fastingTime * fluidDeficitPerHour);
    setOperationSeverity(weight * scale);
    setTotalFluid([ oneNightLiquidDeficit / 2 + fluidDeficitPerHour + operationSeverity,
    oneNightLiquidDeficit / 4 + fluidDeficitPerHour + operationSeverity,
    oneNightLiquidDeficit / 4 + fluidDeficitPerHour + operationSeverity]
     
    );
  }, [
    weight,
    cins,
    htcValue,
    asaValue,
    scale,
    oneNightLiquidDeficit,
    fluidDeficitPerHour,
    fastingTime,
    operationSeverity,
  ]);

  return (
    <>
     
      <Asa asaValue={asaValue} setAsaValue={setAsaValue} />
      <Sex sex={sex} setSex={setSex} />
      <Weight weight={weight} setWeight={setWeight} />
      <Htc htcValue={htcValue} setHtcValue={setHtcValue} />
      <OperationScale scale={scale} setScale={setScale} />
      <Fasting fastingTime={fastingTime} setFastingTime={setFastingTime} />
      <h3>Tolere edilebilir kan kaybı={Tekk}</h3>
      <Table
        fluidDeficitPerHour={fluidDeficitPerHour}
        oneNightLiquidDeficit={oneNightLiquidDeficit}
        operationSeverity={operationSeverity}
        totalFluid={totalFluid}
      />
    </>
  );
}

export default App;