"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandardScaler = exports.MinMaxScaler = void 0;

var tf = _interopRequireWildcard(require("@tensorflow/tfjs-node"));

var _series = require("../core/series");

var _frame = require("../core/frame");

var _utils = require("../core/utils");

const utils = new _utils.Utils();

class MinMaxScaler {
  fit(data) {
    let tensor_data = null;

    if (Array.isArray(data)) {
      tensor_data = tf.tensor(data);
    } else if (data instanceof _frame.DataFrame || data instanceof _series.Series) {
      if (data.dtypes.includes("string")) {
        throw Error("Dtype Error: Cannot perform operation on string dtypes");
      }

      tensor_data = tf.tensor(data.values);
    } else {
      throw new Error("data must either be an Array, DataFrame or Series");
    }

    this.max = tensor_data.max(0);
    this.min = tensor_data.min(0);
    let output_data = tensor_data.sub(this.min).div(this.max.sub(this.min)).arraySync();

    if (data instanceof _series.Series || Array.isArray(data)) {
      return new _series.Series(output_data);
    } else {
      return new _frame.DataFrame(output_data);
    }
  }

  transform(data) {
    if (data instanceof _series.Series) {
      if (data.dtypes.includes("string")) {
        throw Error("Dtype Error: Cannot perform operation on string dtypes");
      }

      let tensor_data = tf.tensor(data.values);
      let output_data = tensor_data.sub(this.min).div(this.max.sub(this.min)).arraySync();
      return new _series.Series(output_data);
    } else if (Array.isArray(data)) {
      let tensor_data = tf.tensor(data);
      let output_data = tensor_data.sub(this.min).div(this.max.sub(this.min)).arraySync();

      if (utils.__is_1D_array(data)) {
        return new _series.Series(output_data);
      } else {
        return new _frame.DataFrame(output_data);
      }
    } else if (data instanceof _frame.DataFrame) {
      if (data.dtypes.includes("string")) {
        throw Error("Dtype Error: Cannot perform operation on string dtypes");
      }

      let tensor_data = tf.tensor(data.values);
      let output_data = tensor_data.sub(this.min).div(this.max.sub(this.min)).arraySync();
      return new _frame.DataFrame(output_data);
    } else {
      throw Error("Value Error: Data type not supoorted");
    }
  }

}

exports.MinMaxScaler = MinMaxScaler;

class StandardScaler {
  fit(data) {
    let tensor_data = null;

    if (Array.isArray(data)) {
      tensor_data = tf.tensor(data);
    } else if (data instanceof _frame.DataFrame || data instanceof _series.Series) {
      if (data.dtypes.includes("string")) {
        throw Error("Dtype Error: Cannot perform operation on string dtypes");
      }

      tensor_data = tf.tensor(data.values);
    } else {
      throw new Error("data must either be an Array, DataFrame or Series");
    }

    this.std = tf.moments(tensor_data, 0).variance.sqrt();
    this.mean = tensor_data.mean(0);
    let output_data = tensor_data.sub(this.mean).div(this.std).arraySync();

    if (data instanceof _series.Series || Array.isArray(data)) {
      return new _series.Series(data = output_data);
    } else {
      return new _frame.DataFrame(data = output_data);
    }
  }

  transform(data) {
    if (data instanceof _series.Series) {
      if (data.dtypes.includes("string")) {
        throw Error("Dtype Error: Cannot perform operation on string dtypes");
      }

      let tensor_data = tf.tensor(data.values);
      let output_data = tensor_data.sub(this.mean).div(this.std).arraySync();
      return new _series.Series(output_data);
    } else if (Array.isArray(data)) {
      let tensor_data = tf.tensor(data);
      let output_data = tensor_data.sub(this.mean).div(this.std).arraySync();

      if (utils.__is_1D_array(data)) {
        return new _series.Series(output_data);
      } else {
        return new _frame.DataFrame(output_data);
      }
    } else if (data instanceof _frame.DataFrame) {
      if (data.dtypes.includes("string")) {
        throw Error("Dtype Error: Cannot perform operation on string dtypes");
      }

      let tensor_data = tf.tensor(data.values);
      let output_data = tensor_data.sub(this.mean).div(this.std).arraySync();
      return new _frame.DataFrame(output_data);
    } else {
      throw Error("Value Error: Data type not supoorted");
    }
  }

}

exports.StandardScaler = StandardScaler;