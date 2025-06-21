import "./Toggle.css"
const Toggle = ({ ToggleFn, checked }) => {
  return (
    <div className="container">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        onChange={ToggleFn}
        checked={checked}
      />
      <label className="label" htmlFor="checkbox"></label>
    </div>
  );
};

export default Toggle;