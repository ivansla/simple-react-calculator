import React, { useState } from "react";

const Calculator = () => {
  const [operandAState, setOperandAState] = useState(0);
  const [operandBState, setOperandBState] = useState(0);

  const [displayCalculationState, setDisplayCalculationState] = useState(0);
  const [operationCalculationState, setOperationCalculationState] = useState("");

  const appendNumberToDisplayCalculationState = (value:number) => {
    const tempValue:number = displayCalculationState * 10 + value;
    setDisplayCalculationState(tempValue);
    setOperandAState(tempValue);
  }

  const clearCalculationState = () => {
    setOperandAState(0);
    setOperandBState(0);
    setDisplayCalculationState(0);
  }

  const computeCalculationState = () => {
    let result: number = 0;
    switch(operationCalculationState) {
      case "+":
        result = operandBState + operandAState;
        setDisplayCalculationState(result);
        setOperandBState(result);
        break;
      case "-":
        result = operandBState - operandAState;
        setDisplayCalculationState(result);
        setOperandBState(result);
        break;
      case "*":
        result = operandBState * operandAState;
        setDisplayCalculationState(result);
        setOperandBState(result);
        break;
      case "/":
        result = operandBState / operandAState;
        setDisplayCalculationState(result);
        setOperandBState(result);
        break;
    }
  }

  const appendOperationToCalculationState = (operation:string) => {
    setOperandBState(operandAState);
    setDisplayCalculationState(0);
    setOperationCalculationState(operation);
  }

  return (
    <div>
      <div>Hello This Is My Simple Calculator</div>
      <input value={displayCalculationState}/>
      <button onClick={() => appendNumberToDisplayCalculationState(1)}>1</button>
      <button onClick={() => appendNumberToDisplayCalculationState(2)}>2</button>
      <button onClick={() => appendNumberToDisplayCalculationState(3)}>3</button>
      <button onClick={() => appendNumberToDisplayCalculationState(4)}>4</button>
      <button onClick={() => appendOperationToCalculationState("+")}>+</button>
      <button onClick={() => appendOperationToCalculationState("-")}>-</button>
      <button onClick={() => appendOperationToCalculationState("*")}>*</button>
      <button onClick={() => appendOperationToCalculationState("/")}>/</button>
      <button onClick={clearCalculationState}>CE</button>
      <button onClick={computeCalculationState}>=</button>
    </div>
  );
};

export default Calculator;
