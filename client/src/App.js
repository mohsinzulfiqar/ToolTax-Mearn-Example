import logo from "./logo.svg";
import "./App.css";
import { IMaskInput } from "react-imask";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const dayjs = require("dayjs");
var totalCharges;
function App() {
  const [numberPlate, setNumberPlate] = useState("");
  const [interDate, setDate] = useState("");
  const [interChange, setInterChange] = useState("");
  const [rideStatus, setRideStatus] = useState(true);
  const [allData, setAllData] = useState("");
  const [filterData, setfilterData] = useState("");

  const [exitCarNo, setExitCarNo] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [exitEnterChange, setExitInterChange] = useState("");
  const [exitRideStatus, setExitRideStatus] = useState(true);

  const ref = useRef(null);

  console.log("this is the new generatons", numberPlate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8003/register", {
      numberplate: numberPlate,
      indate: interDate,
      interchange: interChange,
      ridestatus: rideStatus,
    });
    const data = await res.data;
    if (res.status === 404 || !data) {
      alert("error");
      console.log("error");
    } else {
      alert("data added");
      console.log("data added");
    }
  };

  const handleGetData = async () => {
    const res = await axios.get("http://localhost:8003/getdata");

    if (res.status === 404 || !res.data) {
      alert("error");
      console.log("error");
    } else {
      setAllData(res.data);
      console.log("data Get");
    }
  };

  const handlefilterData = async (e, carNo) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:8003/search/`, {
      noplate: carNo,
      status: rideStatus,
    });
    const data = res.data;
    if (res.status === 404 || !data) {
      alert("error");
      console.log("error");
    } else {
      setfilterData(data);
      console.log("data added");
    }
    let baserate = 20;
    let totalDistnac = Math.abs(data?.interchange - exitEnterChange);
    let totalPrice = totalDistnac * 0.2 + baserate;
    var numb = (data?.numberplate).match(/\d/g).join("") % 2;
    let nowDate = dayjs(data?.indate).format("D MMM").toString();
    let day = dayjs(data?.indate).format("ddd").toString();

    if ((numb == 0 && day == "Mon") || day == "Wed") {
      totalCharges = totalPrice - (totalPrice * 10) / 100;
    }
    if ((numb !== 0 && day == "Thu") || day == "Tue") {
      totalCharges = totalPrice - (totalPrice * 10) / 100;
    }

    if (day == "Sat" || day == "Sun") {
      totalCharges = totalPrice * 1.5;
    }

    if (nowDate == "14 Aug" || nowDate == "25 Dec" || nowDate == "23 Mar") {
      totalCharges = Math.round(totalPrice - (totalPrice * 50) / 100);
    }
    // var totalValue = Math.round(totalPrice - (totalPrice * 10/100))
    // we can use Math.round to round the value but due to price we have to how same

    console.log("this is the total price", totalCharges);
  };
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="App">
      <h1>Enter data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <IMaskInput
            mask={"aaa-000"}
            unmask={false}
            name="phone"
            placeholder="Car Number Must be LLL-NNNN"
            onAccept={(value, mask) => setNumberPlate(value)}
          />
        </div>
        <div className="form-group">
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>

        <select
          name="cars"
          id="cars"
          onChange={(e) => setInterChange(e.target.value)}
        >
          <option value="0">zero point</option>
          <option value="5">NS InterChange</option>
          <option value="10">Ph4 InterChange</option>
          <option value="17">Ferozpur InterChange</option>
          <option value="24">Lake City InterChange</option>
          <option value="29">Raiwand InterChange</option>
          <option value="34">Bahria InterChange</option>
        </select>
        <button type="submit">click me</button>
      </form>
      <h1>Exit data</h1>
      <form>
        <div className="form-group">
          <IMaskInput
            mask={"aaa-000"}
            unmask={false}
            name="phone"
            placeholder="Car Number Must be LLL-NNNN"
            onAccept={(value, mask) => setExitCarNo(value)}
          />
        </div>
        <div className="form-group">
          <input type="date" onChange={(e) => setExitDate(e.target.value)} />
        </div>

        <select
          name="cars"
          id="cars"
          onChange={(e) => setExitInterChange(e.target.value)}
        >
          <option value="0">zero point</option>
          <option value="5">NS InterChange</option>
          <option value="10">Ph4 InterChange</option>
          <option value="17">Ferozpur InterChange</option>
          <option value="24">Lake City InterChange</option>
          <option value="29">Raiwand InterChange</option>
          <option value="34">Bahria InterChange</option>
        </select>
        <button
          type="submit"
          onClick={(e) => {
            handlefilterData(e, exitCarNo);
          }}
        >
          click me
        </button>
      </form>
      <h3>ToolTax Detail</h3>

      {totalCharges}
    </div>
  );
}

export default App;
