"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plot = void 0;

var _utils = require("../core/utils");

var _series = require("../core/series");

const utils = new _utils.Utils();

try {
  const version = Plotly.version;
  console.info(`Using Plotly version ${version}`);
} catch (error) {
  console.info(`Plotly CDN not found. If you need to make Plots, then add the Plotly CDN to your script`);
}

class Plot {
  constructor(ndframe, div) {
    this.div = div;
    this.ndframe = ndframe;
  }

  line(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];
    let params = ret_params[1];

    if (this.ndframe instanceof _series.Series) {
      let trace = {};
      let y = this.ndframe.values;
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace["y"] = y;
      trace['type'] = "line";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else {
      if (utils.__key_in_object(this_config, 'x') && utils.__key_in_object(this_config, 'y')) {
        if (!this.ndframe.column_names.includes(this_config['x'])) {
          throw Error(`Column Error: ${this_config['x']} not found in columns`);
        }

        if (!this.ndframe.column_names.includes(this_config['y'])) {
          throw Error(`Column Error: ${this_config['y']} not found in columns`);
        }

        let x = this.ndframe[this_config['x']].values;
        let y = this.ndframe[this_config['y']].values;
        let trace = {};
        trace["x"] = x;
        trace['y'] = y;
        let xaxis = {};
        let yaxis = {};
        xaxis['title'] = this_config['x'];
        yaxis['title'] = this_config['y'];
        this_config['layout']['xaxis'] = xaxis;
        this_config['layout']['yaxis'] = yaxis;
        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else if (utils.__key_in_object(this_config, 'x') || utils.__key_in_object(this_config, 'y')) {
        let data = [];
        let cols_to_plot;

        if (utils.__key_in_object(this_config, "columns")) {
          cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
        } else {
          cols_to_plot = this.ndframe.column_names;
        }

        cols_to_plot.forEach(c_name => {
          let trace = {};
          params.forEach(param => {
            trace[param] = config[param];
          });

          if (utils.__key_in_object(this_config, 'x')) {
            trace["x"] = this.ndframe[this_config['x']].values;
            trace["y"] = this.ndframe[c_name].values;
            trace['name'] = c_name;
          } else {
            trace["y"] = this.ndframe[this_config['y']].values;
            trace["x"] = this.ndframe[c_name].values;
            trace['name'] = c_name;
          }

          data.push(trace);
        });
        Plotly.newPlot(this.div, data, this_config['layout'], this_config);
      } else {
        let data = [];
        let cols_to_plot;

        if (utils.__key_in_object(this_config, "columns")) {
          cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
        } else {
          cols_to_plot = this.ndframe.column_names;
        }

        cols_to_plot.forEach(c_name => {
          let trace = {};
          params.forEach(param => {
            trace[param] = config[param];
          });
          trace["x"] = this.ndframe.index;
          trace["y"] = this.ndframe[c_name].values;
          trace['name'] = c_name;
          data.push(trace);
        });
        Plotly.newPlot(this.div, data, this_config['layout'], this_config);
      }
    }
  }

  bar(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];
    let params = ret_params[1];

    if (this.ndframe instanceof _series.Series) {
      let trace = {};
      let y = this.ndframe.values;
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace["y"] = y;
      trace['type'] = "bar";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else {
      if (utils.__key_in_object(this_config, 'x') && utils.__key_in_object(this_config, 'y')) {
        if (!this.ndframe.column_names.includes(this_config['x'])) {
          throw Error(`Column Error: ${this_config['x']} not found in columns`);
        }

        if (!this.ndframe.column_names.includes(this_config['y'])) {
          throw Error(`Column Error: ${this_config['y']} not found in columns`);
        }

        let x = this.ndframe[this_config['x']].values;
        let y = this.ndframe[this_config['y']].values;
        let trace = {};
        trace["x"] = x;
        trace['y'] = y;
        trace['type'] = "bar";
        let xaxis = {};
        let yaxis = {};
        xaxis['title'] = this_config['x'];
        yaxis['title'] = this_config['y'];
        this_config['layout']['xaxis'] = xaxis;
        this_config['layout']['yaxis'] = yaxis;
        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else if (utils.__key_in_object(this_config, 'x') || utils.__key_in_object(this_config, 'y')) {
        let trace = {};
        params.forEach(param => {
          if (!param == "layout") {
            trace[param] = config[param];
          }
        });

        if (utils.__key_in_object(this_config, 'x')) {
          trace['y'] = this.ndframe[this_config['x']].values;
        } else {
          trace['y'] = this.ndframe[this_config['y']].values;
        }

        trace['type'] = "bar";
        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else {
        let data = [];
        let cols_to_plot;

        if (utils.__key_in_object(this_config, "columns")) {
          cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
        } else {
          cols_to_plot = this.ndframe.column_names;
        }

        cols_to_plot.forEach(c_name => {
          let trace = {};
          trace['x'] = this.ndframe.index;
          trace["y"] = this.ndframe[c_name].values;
          trace['name'] = c_name;
          trace['type'] = "bar";
          data.push(trace);
        });
        Plotly.newPlot(this.div, data, this_config['layout'], this_config);
      }
    }
  }

  scatter(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];
    let params = ret_params[1];

    if (this.ndframe instanceof _series.Series) {
      let trace = {};
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace["x"] = this.ndframe.values;
      trace['y'] = this.ndframe.index;
      trace['type'] = "scatter";
      trace['mode'] = "markers";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else {
      if (utils.__key_in_object(this_config, 'x') && utils.__key_in_object(this_config, 'y')) {
        if (!this.ndframe.column_names.includes(this_config['x'])) {
          throw Error(`Column Error: ${this_config['x']} not found in columns`);
        }

        if (!this.ndframe.column_names.includes(this_config['y'])) {
          throw Error(`Column Error: ${this_config['y']} not found in columns`);
        }

        let x = this.ndframe[this_config['x']].values;
        let y = this.ndframe[this_config['y']].values;
        let trace = {};
        trace["x"] = x;
        trace['y'] = y;
        trace['type'] = "scatter";
        trace['mode'] = "markers";
        let xaxis = {};
        let yaxis = {};
        xaxis['title'] = this_config['x'];
        yaxis['title'] = this_config['y'];
        this_config['layout']['xaxis'] = xaxis;
        this_config['layout']['yaxis'] = yaxis;
        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else if (utils.__key_in_object(this_config, 'x') || utils.__key_in_object(this_config, 'y')) {
        let trace = {};
        params.forEach(param => {
          if (!param == "layout") {
            trace[param] = config[param];
          }
        });

        if (utils.__key_in_object(this_config, 'x')) {
          trace['y'] = this.ndframe.index;
          trace['x'] = this.ndframe[this_config['x']].values;
        } else {
          trace['x'] = this.ndframe.index;
          trace['y'] = this.ndframe[this_config['y']].values;
        }

        trace['type'] = "scatter";
        trace['mode'] = "markers";
        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else {
        let data = [];
        let cols_to_plot;

        if (utils.__key_in_object(this_config, "columns")) {
          cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
        } else {
          cols_to_plot = this.ndframe.column_names;
        }

        cols_to_plot.forEach(c_name => {
          let trace = {};
          trace['y'] = this.ndframe.index;
          trace["x"] = this.ndframe[c_name].values;
          trace['name'] = c_name;
          trace['type'] = "scatter";
          trace['mode'] = "markers";
          data.push(trace);
        });
        Plotly.newPlot(this.div, data, this_config['layout'], this_config);
      }
    }
  }

  hist(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];
    let params = ret_params[1];

    if (this.ndframe instanceof _series.Series) {
      let trace = {};
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace["x"] = this.ndframe.values;
      trace['type'] = "histogram";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else if (utils.__key_in_object(this_config, 'x')) {
      let trace = {};
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace['x'] = this.ndframe[this_config['y']].values;
      trace['type'] = "histogram";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else if (utils.__key_in_object(this_config, 'y')) {
      let trace = {};
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace['y'] = this.ndframe[this_config['y']].values;
      trace['type'] = "histogram";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else {
      let data = [];
      let cols_to_plot;

      if (utils.__key_in_object(this_config, "columns")) {
        cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
      } else {
        cols_to_plot = this.ndframe.column_names;
      }

      cols_to_plot.forEach(c_name => {
        let trace = {};
        trace["x"] = this.ndframe[c_name].values;
        trace['name'] = c_name;
        trace['type'] = "histogram";
        data.push(trace);
      });
      Plotly.newPlot(this.div, data, this_config['layout'], this_config);
    }
  }

  pie(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];

    if (this.ndframe instanceof _series.Series) {
      let data = [{
        values: this.ndframe.values,
        labels: this.ndframe.index,
        type: 'pie',
        name: this_config['labels'],
        hoverinfo: 'label+percent+name',
        automargin: true
      }];
      Plotly.newPlot(this.div, data, this_config['layout'], this_config);
    } else if (utils.__key_in_object(this_config, 'values') && utils.__key_in_object(this_config, 'labels')) {
      if (!this.ndframe.column_names.includes(this_config['labels'])) {
        throw Error(`Column Error: ${this_config['labels']} not found in columns. labels name must be one of [ ${this.ndframe.column_names}]`);
      }

      if (!this.ndframe.column_names.includes(this_config['values'])) {
        throw Error(`Column Error: ${this_config['values']} not found in columns. value name must be one of [ ${this.ndframe.column_names}]`);
      }

      let data = [{
        values: this.ndframe[this_config['values']].values,
        labels: this.ndframe[this_config['labels']].values,
        type: 'pie',
        name: this_config['labels'],
        hoverinfo: 'label+percent+name',
        automargin: true
      }];
      Plotly.newPlot(this.div, data, this_config['layout'], this_config);
    } else {
      let cols_to_plot;

      if (utils.__key_in_object(this_config, "columns")) {
        cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
      } else {
        cols_to_plot = this.ndframe.column_names;
      }

      if (utils.__key_in_object(this_config, 'row_pos')) {
        if (this_config['row_pos'].length != cols_to_plot.length - 1) {
          throw Error(`Lenght of row_pos array must be equal to number of columns. Got ${this_config['row_pos'].length}, expected ${cols_to_plot.length - 1}`);
        }
      } else {
        let temp_arr = [];

        for (let i = 0; i < cols_to_plot.length - 1; i++) {
          temp_arr.push(0);
        }

        this_config['row_pos'] = temp_arr;
      }

      if (utils.__key_in_object(this_config, 'col_pos')) {
        if (this_config['col_pos'].length != cols_to_plot.length - 1) {
          throw Error(`Lenght of col_pos array must be equal to number of columns. Got ${this_config['col_pos'].length}, expected ${cols_to_plot.length - 1}`);
        }
      } else {
        let temp_arr = [];

        for (let i = 0; i < cols_to_plot.length - 1; i++) {
          temp_arr.push(i);
        }

        this_config['col_pos'] = temp_arr;
      }

      let data = [];
      cols_to_plot.forEach((c_name, i) => {
        let trace = {};
        trace["values"] = this.ndframe[c_name].values;
        trace['labels'] = this.ndframe[this_config['labels']].values;
        trace['name'] = c_name;
        trace['type'] = "pie";
        trace['domain'] = {
          row: this_config['row_pos'][i],
          column: this_config['col_pos'][i]
        };
        trace["hoverinfo"] = 'label+percent+name';
        trace['textposition'] = "outside";
        trace['automargin'] = true;
        data.push(trace);
      });

      if (!utils.__key_in_object(this_config, "grid")) {
        let size = Number((this.ndframe.shape[1] / 2).toFixed()) + 1;
        this_config['grid'] = {
          rows: size,
          columns: size
        };
      }

      this_config['layout']['grid'] = this_config['grid'];
      Plotly.newPlot(this.div, data, this_config['layout'], this_config);
    }
  }

  box(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];
    let params = ret_params[1];

    if (this.ndframe instanceof _series.Series) {
      let trace = {};
      let y = this.ndframe.values;
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace["y"] = y;
      trace['type'] = "box";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else {
      if (utils.__key_in_object(this_config, 'x') && utils.__key_in_object(this_config, 'y')) {
        if (!this.ndframe.column_names.includes(this_config['x'])) {
          throw Error(`Column Error: ${this_config['x']} not found in columns`);
        }

        if (!this.ndframe.column_names.includes(this_config['y'])) {
          throw Error(`Column Error: ${this_config['y']} not found in columns`);
        }

        let x = this.ndframe[this_config['x']].values;
        let y = this.ndframe[this_config['y']].values;
        let trace = {};
        trace["x"] = x;
        trace['y'] = y;
        trace['type'] = 'box';
        let xaxis = {};
        let yaxis = {};
        xaxis['title'] = this_config['x'];
        yaxis['title'] = this_config['y'];
        this_config['layout']['xaxis'] = xaxis;
        this_config['layout']['yaxis'] = yaxis;
        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else if (utils.__key_in_object(this_config, 'x') || utils.__key_in_object(this_config, 'y')) {
        let trace = {};
        params.forEach(param => {
          if (!param == "layout") {
            trace[param] = config[param];
          }
        });

        if (utils.__key_in_object(this_config, 'x')) {
          trace['x'] = this.ndframe[this_config['x']].values;
          trace['y'] = this.ndframe.index;
          trace['type'] = 'box';
        } else {
          trace['x'] = this.ndframe.index;
          trace['y'] = this_config['y'];
          trace['type'] = 'box';
        }

        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else {
        let data = [];
        let cols_to_plot;

        if (utils.__key_in_object(this_config, "columns")) {
          cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
        } else {
          cols_to_plot = this.ndframe.column_names;
        }

        cols_to_plot.forEach(c_name => {
          let trace = {};
          params.forEach(param => {
            trace[param] = config[param];
          });
          trace["y"] = this.ndframe[c_name].values;
          trace['name'] = c_name;
          trace['type'] = 'box';
          data.push(trace);
        });
        Plotly.newPlot(this.div, data, this_config['layout'], this_config);
      }
    }
  }

  violin(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];
    let params = ret_params[1];

    if (this.ndframe instanceof _series.Series) {
      let trace = {};
      let y = this.ndframe.values;
      params.forEach(param => {
        if (!param == "layout") {
          trace[param] = config[param];
        }
      });
      trace["y"] = y;
      trace['type'] = "violin";
      Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
    } else {
      if (utils.__key_in_object(this_config, 'x') && utils.__key_in_object(this_config, 'y')) {
        if (!this.ndframe.column_names.includes(this_config['x'])) {
          throw Error(`Column Error: ${this_config['x']} not found in columns`);
        }

        if (!this.ndframe.column_names.includes(this_config['y'])) {
          throw Error(`Column Error: ${this_config['y']} not found in columns`);
        }

        let x = this.ndframe[this_config['x']].values;
        let y = this.ndframe[this_config['y']].values;
        let trace = {};
        trace["x"] = x;
        trace['y'] = y;
        trace['type'] = 'violin';
        let xaxis = {};
        let yaxis = {};
        xaxis['title'] = this_config['x'];
        yaxis['title'] = this_config['y'];
        this_config['layout']['xaxis'] = xaxis;
        this_config['layout']['yaxis'] = yaxis;
        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else if (utils.__key_in_object(this_config, 'x') || utils.__key_in_object(this_config, 'y')) {
        let trace = {};
        params.forEach(param => {
          if (!param == "layout") {
            trace[param] = config[param];
          }
        });

        if (utils.__key_in_object(this_config, 'x')) {
          trace['x'] = this.ndframe[this_config['x']].values;
          trace['y'] = this.ndframe.index;
          trace['type'] = 'violin';
        } else {
          trace['x'] = this.ndframe.index;
          trace['y'] = this_config['y'];
          trace['type'] = 'violin';
        }

        Plotly.newPlot(this.div, [trace], this_config['layout'], this_config);
      } else {
        let data = [];
        let cols_to_plot;

        if (utils.__key_in_object(this_config, "columns")) {
          cols_to_plot = this.____check_if_cols_exist(this_config['columns']);
        } else {
          cols_to_plot = this.ndframe.column_names;
        }

        cols_to_plot.forEach(c_name => {
          let trace = {};
          params.forEach(param => {
            trace[param] = config[param];
          });
          trace["y"] = this.ndframe[c_name].values;
          trace['name'] = c_name;
          trace['type'] = 'violin';
          data.push(trace);
        });
        Plotly.newPlot(this.div, data, this_config['layout'], this_config);
      }
    }
  }

  table(config = {}) {
    let ret_params = this.__get_plot_params(config);

    let this_config = ret_params[0];
    let header = {};
    let cells = {};
    let cols_data = [];
    let cols_2_show;

    if (utils.__key_in_object(this_config, 'columns')) {
      this_config['columns'].forEach(cname => {
        if (!this.ndframe.column_names.includes(cname)) {
          throw Error(`Column Error: ${cname} not found in columns. Columns should be one of [ ${this.ndframe.column_names} ]`);
        }

        let idx = this.ndframe.column_names.indexOf(cname);
        cols_data.push(this.ndframe.col_data[idx]);
      });
      cols_2_show = this_config['columns'];
    } else {
      cols_2_show = this.ndframe.column_names;
      cols_data = this.ndframe.col_data;
    }

    header['values'] = cols_2_show;
    cells['values'] = cols_data;

    if (this_config['header_style']) {
      Object.keys(this_config['header_style']).forEach(param => {
        header[param] = this_config['header_style'][param];
      });
    }

    if (this_config['cell_style']) {
      Object.keys(this_config['cell_style']).forEach(param => {
        cells[param] = this_config['cell_style'][param];
      });
    }

    var data = [{
      type: 'table',
      header: header,
      cells: cells
    }];
    Plotly.newPlot(this.div, data, this_config['layout'], this_config);
  }

  __get_plot_params(config) {
    let params = Object.keys(config);
    let this_config = {};
    params.forEach(param => {
      this_config[param] = config[param];
    });

    if (!utils.__key_in_object(config, "layout")) {
      this_config['layout'] = {};
    }

    return [this_config, params];
  }

  ____check_if_cols_exist(cols) {
    cols.forEach(col => {
      if (!this.ndframe.column_names.includes(col)) {
        throw Error(`Column Error: ${col} not found in columns. Columns should be one of [ ${this.ndframe.column_names} ]`);
      }
    });
    return cols;
  }

}

exports.Plot = Plot;