import { useState } from 'react';

function Handle() {
  const [name, setName] = useState("");

  const formStyle = {
    width: "320px",
    margin: "80px auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, Helvetica, sans-serif",
    justifyContent: "center",
    alignItems: "center"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
    fontSize: "14px",
    color: "#333"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px"
  };

  const textStyle = {
    marginTop: "15px",
    fontSize: "14px",
    color: "#007bff"
  };

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form style={formStyle}>
      <label style={labelStyle}>
        Enter your name:
        <input
          type="text"
          value={name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </label>

      <p style={textStyle}>
        Current value: <strong>{name}</strong>
      </p>
    </form>
  );
}

export default Handle;
