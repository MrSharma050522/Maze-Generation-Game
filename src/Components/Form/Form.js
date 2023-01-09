import { useContext, useRef } from "react";
import { DataContext } from "../../Store/Data-Context";
import classes from "./Form.module.css";

const Form = (props) => {
  const nameInputRef = useRef();
  const sizeInputRef = useRef();
  const rowInputRef = useRef();
  const { setSize, setRow, setName, setTitle, name } = useContext(DataContext);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const newSize = sizeInputRef.current.value;
    const newRow = rowInputRef.current.value;
    const newName = nameInputRef.current.value;
    setSize(newSize);
    setRow(newRow);
    setName(newName);
    setTitle(`Hello ${newName} ! Let's Start Playing  `);
    props.setShowMaze(true);

    // console.log(newSize, newRow, newName);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <label htmlFor="name">Name : </label>
      <input
        type="text"
        required
        placeholder="Please Enter Your Name"
        ref={nameInputRef}
        defaultValue={name}
      />
      <br></br>
      <label htmlFor="level">Select your level : </label>
      <select name="level" ref={rowInputRef}>
        <option value="10">Basic</option>
        <option value="20">Easy</option>
        <option value="25">Medium</option>
        <option value="30">Hard</option>
        <option value="40">Challenge</option>
      </select>
      <br></br>
      <label htmlFor="size">Size : </label>
      <input
        type="number"
        required
        placeholder="Plese Enter Size"
        min={200}
        max={900}
        defaultValue={350}
        ref={sizeInputRef}
      />
      <br></br>
      {/* <label htmlFor="row-column">Rows OR Columns : </label>
        <input
          type="number"
          required
          placeholder="Please Enter Row Or Columns"
          min={5}
          max={50}
          ref={rowInputRef}
        /> */}

      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
