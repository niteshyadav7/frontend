import { useState } from "react";

function SearchImage({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    // console.log(input);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} />
      </form>
    </>
  );
}
export default SearchImage;
