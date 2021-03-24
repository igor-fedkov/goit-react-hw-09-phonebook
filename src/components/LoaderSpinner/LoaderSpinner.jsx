import Loader from "react-loader-spinner";

import { LoaderContainer } from './LoaderSpinner.css';

const LoaderSpinner = () =>
  <LoaderContainer>
    <Loader
      type="Circles"
      color="#00BFFF"
      height={70}
      width={70}
      timeout={30000} //3 secs
    />
  </LoaderContainer>

export default LoaderSpinner;