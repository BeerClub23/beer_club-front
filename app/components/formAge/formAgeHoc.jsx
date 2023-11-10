import { CheckAge } from "./checkAge.jsx";

const formAgeHoc = (WrappedComponent) => {
  const HOCComponent = (props) => {
    CheckAge();

    return <WrappedComponent {...props} />;
  };

  return HOCComponent;
};

export default formAgeHoc;
