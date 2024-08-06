import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="flex items-end gap-8">
      <Spinner className="h-12 w-12" />
    </div>
  );
};

Loading.propTypes = {};

export default Loading;
