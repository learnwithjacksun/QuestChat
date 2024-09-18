import { useState } from "react";
import Icon from "./Icon";
import Props from "prop-types";

const Input = ({
  label,
  id,
  type,
  placeholder,
  value,
  handleChange,
  bg_color = "bg-transparent",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="font-sora font-medium text-sm pl-1">
            {label}:
          </label>
        )}
        <div className="flex items-center gap-2">
          <input
            type={isPasswordVisible ? "text" : type}
            name={id}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            autoComplete="off"
            className={`${bg_color} border-line border placeholder:text-sub text-sm font-medium focus-within:border-sub px-4 h-10 w-full rounded-lg`}
          />

          {type === "password" && (
            <div
              onClick={togglePasswordVisibility}
              className="flex-center border cursor-default border-line bg-lighter h-10 min-w-10 rounded-lg"
            >
              <Icon styles="text-sub text-[19px]">
                {isPasswordVisible ? "visibility" : "visibility_off"}
              </Icon>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Input.propTypes = {
  label: Props.string.isRequired,
  id: Props.string.isRequired,
  type: Props.string.isRequired,
  placeholder: Props.string.isRequired,
  value: Props.string,
  handleChange: Props.func,
  bg_color: Props.string,
};

export default Input;
