import React, { useState } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CopyToClipboard } from "react-copy-to-clipboard";
const checkBoxStyle = {
  color: "rgba(134,134,138,255)",

  "&.Mui-checked": {
    color: "white"
  }
};
const sliderStyle = {
  width: "100%",

  color: "rgba(42,139,139,255)",
  "& .MuiSlider-thumb": {
    color: "white"
  }
};
const GeneatePassword = () => {
  const [length, setLength] = useState(0);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  let [password, setPassword] = useState("");
  const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerSet = "abcdefghijklmnopqrstuvwxyz";
  const numberSet = "0123456789";
  const symbolSet = "!@#$%^&*()_";
  const handleClick = (e) => {
    setLength(e.target.value);
  };
  const generateRandom = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
  };
  function generatePassword() {
    createPassword("");
  }
  const createPassword = (pass) => {
    if (upper) {
      pass += generateRandom(upperSet);
    }
    if (lower) {
      pass += generateRandom(lowerSet);
    }
    if (number) {
      pass += generateRandom(numberSet);
    }
    if (symbol) {
      pass += generateRandom(symbolSet);
    }

    if (pass.length < length) {
      setPassword(pass);
      return createPassword(pass);
    } else if (pass.length >= length) {
      setPassword(pass.substr(0, length));
    }
  };
  const selectParams = (e) => {
    if (e.target.value == "upper") {
      setUpper(true);
    } else if (e.target.value === "lower") {
      setLower(true);
    } else if (e.target.value === "number") {
      setNumber(true);
    } else {
      setSymbol(true);
    }
  };
  return (
    <>
      <div className="container">
        <div className="header">
          <div>{password}</div>
          <div>
            <CopyToClipboard text={password}>
              <ContentCopyRoundedIcon
                style={{ cursor: "pointer", color: "rgba(134,134,138,255)" }}
              />
            </CopyToClipboard>
          </div>
        </div>
        <div>
          <div className="characterLength">
            <div>Characters Length</div>
            <div style={{ textAlign: "center" }}>{length}</div>
          </div>
          <br />
          <Slider
            sx={sliderStyle}
            step={1}
            defaultValue={2}
            value={length}
            aria-label="Disabled slider"
            onChange={handleClick}
            max={20}
            size="small"
          />
        </div>
        <div>
          <FormGroup
            onClick={(e) => selectParams(e)}
            sx={{
              color: "rgba(134,134,138,255)",

              "&.Mui-checked": {
                color: "white"
              }
            }}
          >
            <FormControlLabel
              value="upper"
              control={<Checkbox sx={checkBoxStyle} />}
              label="Include Uppercase Letters"
            />
            <FormControlLabel
              value="lower"
              control={<Checkbox sx={checkBoxStyle} />}
              label="Include Lowercase Letters"
            />
            <FormControlLabel
              value="number"
              control={<Checkbox sx={checkBoxStyle} />}
              label="Include Numbers"
            />
            <FormControlLabel
              value="symbol"
              control={<Checkbox sx={checkBoxStyle} />}
              label="Include Symbols"
            />
          </FormGroup>
        </div>
        <div className="strength">
          <div>Strength</div>
          <div className="strengthSignal">
            <div style={{ fontSize: "11px" }}>Poor</div>
            <div className="indicatorBox">
              <div id="first" className="indicator"></div>
              <div id="second" className="indicator"></div>
              <div id="third" className="indicator"></div>
              <div id="fourth" className="indicator"></div>
              <div id="fifth" className="indicator"></div>
            </div>
          </div>
        </div>

        <div onClick={generatePassword} className="generate">
          <p>GENERATE</p>
        </div>
      </div>
    </>
  );
};
export default GeneatePassword;
