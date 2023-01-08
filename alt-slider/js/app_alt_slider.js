document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

window.onload = function() {
  // -------- BMI value edit script -------- //
  var height_units, weight_units, height, weight

  document.getElementById("height-input").addEventListener("input", calculateBMI);
  document.getElementById("weight-input").addEventListener("input", calculateBMI);

  document.getElementById('cm').addEventListener("click", calculateBMI);
  document.getElementById('in').addEventListener("click", calculateBMI);

  document.getElementById('kg').addEventListener("click", calculateBMI);
  document.getElementById('lbs').addEventListener("click", calculateBMI);


  function calculateBMI() {
    var h, w, bmi
    height = document.getElementById("height-input").value;
    weight = document.getElementById("weight-input").value;

    var units_h = document.getElementsByName("height-unit");
    for (var i = 0; i < units_h.length; i++) {
      if (units_h[i].checked) {
        height_units = units_h[i].value;
      }
    }

    var units_w = document.getElementsByName("weight-unit");
    for (var i = 0; i < units_w.length; i++) {
      if (units_w[i].checked) {
        weight_units = units_w[i].value;
      }
    }


    if (height > 9 && weight > 9) {

      if (height_units == "in") {
        h = height * 2.54
      } else {
        h = height
      }

      if (weight_units == "lbs") {
        w = weight / 2.2
      } else {
        w = weight
      }
      bmi = w / ((h / 100) ** 2)
      bmi = Math.round(bmi * 100) / 100;
      document.getElementById("BMI-input").value = bmi
    }
  }
  // -------- BMI value edit script -------- //
  // ------- LPA change slider unit ------- //
  document.getElementById('lpa-nmol').addEventListener("click", lpaSliderUnits);
  document.getElementById('lpa-mgdL').addEventListener("click", lpaSliderUnits);

  document.getElementById("calculate-risk").addEventListener("click", lpaSliderUnits);

  function lpaSliderUnits() {
    document.getElementById('lpaGraph-risk-box').style.display = 'flex';
    //document.getElementById('lpaGraph-risk-treatment-box').style.display = 'none';
    document.getElementById('lpaGraph-risk-treatment-left-box').style.display = 'none';
    document.getElementById('lpaGraph-risk-treatment-right-box').style.display = 'none';
    var slider = document.getElementById("lpa-slider");
    var lpa_value = document.getElementById("lpa-value");
    slider.value = [20.66, 16.6][sex];
    slider.max = 500;
    document.getElementById('top-tick-lpa').value = 500;
    document.getElementById('top-tick-lpa').label = "500";
    lpa_value.innerHTML = slider.value;

    var selection = document.getElementsByName("sex-value");
    for (var i = 0; i < selection.length; i++) {
      if (selection[i].checked) {
        var sex = selection[i].value;
      }
    }

    var units_lpa = document.getElementsByName("lpa-unit");
    for (var i = 0; i < units_lpa.length; i++) {
      if (units_lpa[i].checked) {
        units_lpa = units_lpa[i].value;
      }
    }

    var top_tick_lpa = document.getElementById("top-tick-lpa");
    if (units_lpa == 'nmol/L') {
      slider.value = [20.66, 16.6][sex];
      slider.max = 500;
      top_tick_lpa.value = 500;
      top_tick_lpa.innerHTML = "500";
    } else {
      slider.value = [20.66, 16.6][sex] / 2.15;
      slider.max = 250;
      top_tick_lpa.value = 250;
      top_tick_lpa.innerHTML = "250";
    }
    lpa_value.innerHTML = slider.value;
  }
  // ------- LPA change slider unit ------- //
  // -------- calculate risk graph  --------//
  document.getElementById("calculate-risk").addEventListener("click", calculateRisk);
  document.getElementById("lpa-slider").addEventListener("change", calculateRisk)
  document.getElementById('lpa-nmol').addEventListener("click", calculateRisk);
  document.getElementById('lpa-mgdL').addEventListener("click", calculateRisk);
  document.getElementById("ldl-slider").addEventListener("change", calculateRisk);
  document.getElementById("sbp-slider").addEventListener("change", calculateRisk);

  function calculateRisk() {
    var age, sex, ldl, ldl_rx, ldl_dec, age_start_rx_ldl, age_stop_rx_ldl, hdl, sbp, sbp_rx, sbp_dec, age_start_rx_sbp, age_stop_rx_sbp, smoke, fmr_tob, prevalent_diabetes_35, bmi, fam_hx_chd

    age = document.getElementById("age-input").value
    //sex = document.getElementById("sex-box").value

    var selection = document.getElementsByName("sex-value");
    for (var i = 0; i < selection.length; i++) {
      if (selection[i].checked) {
        sex = selection[i].value;
      }
    }

    ldl = document.getElementById("LDL-input").value
    ldl_rx = 0
    ldl_dec = 0
    age_start_rx_ldl = age
    age_stop_rx_ldl = 80
    sbp = document.getElementById("SBP-input").value
    sbp_rx = 0
    sbp_dec = 0
    age_start_rx_sbp = age
    age_stop_rx_sbp = 80

    hdl = document.getElementById("HDL-input").value

    var selection = document.getElementsByName("smoke-value");
    for (var i = 0; i < selection.length; i++) {
      if (selection[i].checked) {
        smoke = selection[i].value;
      }
    }

    var selection = document.getElementsByName("fmrtob-value");
    for (var i = 0; i < selection.length; i++) {
      if (selection[i].checked) {
        fmr_tob = selection[i].value;
      }
    }

    var selection = document.getElementsByName("diab-value");
    for (var i = 0; i < selection.length; i++) {
      if (selection[i].checked) {
        diab = selection[i].value;
      }
    }

    var selection = document.getElementsByName("famhx-value");
    for (var i = 0; i < selection.length; i++) {
      if (selection[i].checked) {
        famhx = selection[i].value;
      }
    }

    bmi = document.getElementById("BMI-input").value

    if (age == '' || ldl == '' || sbp == '' || hdl == '' || smoke == '' || fmr_tob == '' || diab == '' || famhx == '' || bmi == '') {
      document.getElementById("alert-box").style.display = 'block';
    } else {
      document.getElementById("alert-box").style.display = 'none';
      var units_chol = document.getElementsByName("chol-unit");
      for (var i = 0; i < units_chol.length; i++) {
        if (units_chol[i].checked) {
          chol_units = units_chol[i].value;
        }
      }
      //console.log("chol_units: ", chol_units)
      if (chol_units == 'mg/dL') {
        ldl = ldl / 38.67
        hdl = hdl / 38.67
      }

      var ages = [];
      for (var i = 30; i <= 80; i++) {
        ages.push(i)
      }

      var risk = calculate(age, sex, ldl, ldl_rx, ldl_dec, age_start_rx_ldl, age_stop_rx_ldl, hdl, sbp, sbp_rx, sbp_dec, age_start_rx_sbp, age_stop_rx_sbp, smoke, fmr_tob, diab, bmi, famhx, Lp_a = null);
      console.log(age, sex, ldl, ldl_rx, ldl_dec, age_start_rx_ldl, age_stop_rx_ldl, hdl, sbp, sbp_rx, sbp_dec, age_start_rx_sbp, age_stop_rx_sbp, smoke, fmr_tob, diab, bmi, famhx);
      console.log(risk);

      risk = risk.map(function(x) {
        return x * 100;
      });

      var regular_line = {
        x: ages,
        y: risk,
        name: 'Your risk without including the effect of Lp(a)',
        mode: "lines",
        type: "scatter",
        hovertemplate: 'age: %{x}' + '<br>risk: %{y:.2f}%<br>',
        line: {
          color: 'rgb(18, 49, 135)',
        }
      };

      var data = [regular_line];
      var total_list = risk;


      // Display using Plotly
      var config = {
        displayModeBar: false,
      };


      var text_lpa = document.getElementById('lpaGraph-risk');
      var value_lpa = document.getElementById('lpaGraph-risk-value');

      var text_lpa_t_1 = document.getElementById('lpaGraph-risk-t-1');
      var value_lpa_t_1 = document.getElementById('lpaGraph-risk-value-t-1');

      var riskValue = Math.round(risk[risk.length - 1] * 100) / 100;
      text_lpa.innerHTML = "Your risk of having a heart attack or stroke up to age 80 is:";
      text_lpa_t_1.innerHTML = text_lpa.innerHTML

      value_lpa.innerHTML = riskValue + "%";
      value_lpa_t_1.innerHTML = value_lpa.innerHTML

      // -------- calculate risk graph  --------//
      var rxGraph_text = document.getElementById('rxGraph-risk');
      var rxGraph_value = document.getElementById('rxGraph-risk-value');

      var rxGraph_text_t_1 = document.getElementById('rxGraph-risk-t-1');
      var rxGraph_value_t_1 = document.getElementById('rxGraph-risk-value-t-1');

      rxGraph_text.innerHTML = text_lpa.innerHTML;
      rxGraph_text_t_1.innerHTML = rxGraph_text.innerHTML;

      rxGraph_value.innerHTML = value_lpa.innerHTML;
      rxGraph_value_t_1.innerHTML = rxGraph_value.innerHTML;

      // ------- slider change risk graph  -------//
      document.getElementById("lpa-after").style.display = 'block';
      document.getElementById("lpaGraph-value-box").style.display = 'block';
      document.getElementById("rxGraph-value-box").style.display = 'block';

      var slideCol = document.getElementById("lpa-slider");
      var y = document.getElementById("lpa-value");

      slideCol.addEventListener("input", changeLpa);
      y.innerHTML = slideCol.value;

      function changeLpa() {
        y.innerHTML = document.getElementById("lpa-slider").value;
      }
      // ------- slider change risk graph  -------//

      var lpaValue = Math.round(y.innerHTML * 100) / 100;
      var units_lpa = document.getElementsByName("lpa-unit");
      for (var i = 0; i < units_lpa.length; i++) {
        if (units_lpa[i].checked) {
          units_lpa = units_lpa[i].value;
        }
      }

      var lpa_correct
      if ((units_lpa == 'nmol/L' && lpaValue != [20.66, 16.6][sex]) || (units_lpa == 'mg/dL' && lpaValue != [9.61, 7.72][sex])) {
        if (units_lpa == 'nmol/L') {
          lpa_correct = y.innerHTML;
          var risk_lpa = calculate(age, sex, ldl, ldl_rx, ldl_dec, age_start_rx_ldl, age_stop_rx_ldl, hdl, sbp, sbp_rx, sbp_dec, age_start_rx_sbp, age_stop_rx_sbp, smoke, fmr_tob, diab, bmi, famhx, lpa_correct);
        } else {
          lpa_correct = y.innerHTML * 2.15;
          var risk_lpa = calculate(age, sex, ldl, ldl_rx, ldl_dec, age_start_rx_ldl, age_stop_rx_ldl, hdl, sbp, sbp_rx, sbp_dec, age_start_rx_sbp, age_stop_rx_sbp, smoke, fmr_tob, diab, bmi, famhx, lpa_correct);
        }
        risk_lpa = risk_lpa.map(function(x) {
          return x * 100;
        });

        var lpa_line = {
          x: ages,
          y: risk_lpa,
          name: 'Your risk including the effect of Lp(a)',
          mode: "lines",
          type: "scatter",
          hovertemplate: 'age: %{x}' + '<br>risk: %{y:.2f}%<br>',
          line: {
            color: 'rgb(214, 14, 14)',
          }
        };

        var data = [lpa_line, regular_line];

        document.getElementById('lpaGraph-risk-box').style.display = 'none';
        //document.getElementById('lpaGraph-risk-treatment-box').style.display = 'flex';
        document.getElementById('lpaGraph-risk-treatment-left-box').style.display = 'flex';
        document.getElementById('lpaGraph-risk-treatment-right-box').style.display = 'flex';

        var text_lpa_t_2 = document.getElementById('lpaGraph-risk-t-2');
        var value_lpa_t_2 = document.getElementById('lpaGraph-risk-value-t-2');

        var riskValue_lpa = Math.round(risk_lpa[risk_lpa.length - 1] * 100) / 100;
        text_lpa_t_2.innerHTML = "With an Lp(a) level of " + lpaValue + " " + units_lpa + ", your estimated risk of having a heart attack or stroke up to age 80 changes from " + riskValue + "% to:";
        value_lpa_t_2.innerHTML = riskValue_lpa + "%";

        rxGraph_text.innerHTML = text_lpa_t_2.innerHTML;
        rxGraph_value.innerHTML = value_lpa_t_2.innerHTML;
        rxGraph_text_t_1.innerHTML = text_lpa_t_2.innerHTML;
        rxGraph_value_t_1.innerHTML = value_lpa_t_2.innerHTML;

        total_list = risk.concat(risk_lpa);
      }

      // --------- ldl/sbp change script --------- //
      var ldl_slider = document.getElementById("ldl-slider");
      var ldl_value = document.getElementById("ldl-value");

      ldl_slider.addEventListener("input", changeLDL);
      ldl_value.innerHTML = ldl_slider.value;

      function changeLDL() {
        ldl_value.innerHTML = document.getElementById("ldl-slider").value;
      }

      var sbp_slider = document.getElementById("sbp-slider");
      var sbp_value = document.getElementById("sbp-value");

      sbp_slider.addEventListener("input", changeSBP);
      sbp_value.innerHTML = sbp_slider.value;

      function changeSBP() {
        sbp_value.innerHTML = document.getElementById("sbp-slider").value;
      }

      var graph2_data;
      if (ldl_value.innerHTML == 0 && sbp_value.innerHTML == 0) {
        graph2_data = data;

        document.getElementById('rxGraph-risk-box').style.display = 'flex';
        //document.getElementById('rxGraph-risk-value').style.display = 'inline-block';
        //document.getElementById('rxGraph-risk-treatment-box').style.display = 'none';
        document.getElementById('rxGraph-risk-treatment-left-box').style.display = 'none';
        document.getElementById('rxGraph-risk-treatment-right-box').style.display = 'none';
      } else {
        ldl_dec = ldl_slider.value * -1;
        sbp_dec = sbp_slider.value * -1;
        ldl_rx = ldl_dec != 0 ? 1 : 0
        sbp_rx = sbp_dec != 0 ? 1 : 0

        if (units_chol == 'mgdL') {
          ldl_dec = ldl_dec / 38.67
        }
        var risk_rx = calculate(age, sex, ldl, ldl_rx, ldl_dec, age_start_rx_ldl, age_stop_rx_ldl, hdl, sbp, sbp_rx, sbp_dec, age_start_rx_sbp, age_stop_rx_sbp, smoke, fmr_tob, diab, bmi, famhx, lpa_correct);

        risk_rx = risk_rx.map(function(x) {
          return x * 100;
        });

        var rx_line = {
          x: ages,
          y: risk_rx,
          name: 'Your risk including the effect of your Lp(a) <br> after lowering your LDL or blood pressure',
          mode: "lines",
          type: "scatter",
          hovertemplate: 'age: %{x}' + '<br>risk: %{y:.2f}%<br>',
          line: {
            color: 'rgb(159, 190, 214)',
          },
        }

        if ((units_lpa == 'nmol/L' && lpaValue != [20.66, 16.6][sex]) || (units_lpa == 'mg/dL' && lpaValue != [9.61, 7.72][sex])) {
          graph2_data = [rx_line, lpa_line, regular_line];
        } else {
          graph2_data = [rx_line, regular_line];
        }

        var curr_risk;
        if ((units_lpa == 'nmol/L' && lpaValue != [20.66, 16.6][sex]) || (units_lpa == 'mg/dL' && lpaValue != [9.61, 7.72][sex])) {
          total_list = risk.concat(risk_lpa).concat(risk_rx);
        } else {
          total_list = risk.concat(risk_rx);
        }
        curr_risk = Math.max.apply(Math, total_list);
        curr_risk = Math.round(curr_risk * 100)/100;

        var rxGraph_text_t_2 = document.getElementById('rxGraph-risk-t-2');
        var rxGraph_value_t_2 = document.getElementById('rxGraph-risk-value-t-2');

        document.getElementById('rxGraph-risk-box').style.display = 'none';
        //document.getElementById('rxGraph-risk-value').style.display = 'none';
        //document.getElementById('rxGraph-risk-treatment-box').style.display = 'inline-flex';
        document.getElementById('rxGraph-risk-treatment-left-box').style.display = 'flex';
        document.getElementById('rxGraph-risk-treatment-right-box').style.display = 'flex';

        var riskValue_rx = Math.round(risk_rx[risk_rx.length - 1] * 100) / 100;

        if (sbp_value.innerHTML != 0 && ldl_value.innerHTML != 0) {
          rxGraph_text_t_2.innerHTML = "With an Lp(a) of " + lpaValue + " " + units_lpa + " and an estimated risk of " + curr_risk + "%, lowering your LDL by " + ldl_value.innerHTML + " " + chol_units + " and your SBP by " + sbp_value.innerHTML + " mmHg beginning at age " + age + " will reduce your risk of having a heart attack or stroke to:";
        } else if (sbp_slider.value != 0 && ldl_slider.value == 0) {
          rxGraph_text_t_2.innerHTML = "With an Lp(a) of " + lpaValue + " " + units_lpa + " and an estimated risk of " + curr_risk + "%, lowering your SBP by " + sbp_value.innerHTML + " mmHg beginning at age " + age + " will reduce your risk of having a heart attack or stroke to:";
        } else {
          rxGraph_text_t_2.innerHTML = "With an Lp(a) of " + lpaValue + " " + units_lpa + " and an estimated risk of " + curr_risk + "%, lowering your LDL by " + ldl_value.innerHTML + " " + chol_units + " beginning at age " + age + " will reduce your risk of having a heart attack or stroke to:";
        }

        rxGraph_value_t_2.innerHTML = riskValue_rx + "%";
      }
      // --------- ldl/sbp change script --------- //

      var layout = {
        xaxis: {
          range: [age, 80],
          fixedrange: true,
          title: {
            text: 'Age (years)',
          }
        },
        yaxis: {
          range: [0, Math.max(total_list) + 0.5],
          fixedrange: true,
          title: {
            text: 'Risk (%)',
          }
        },
        title: "Your risk of having a heart attack or stroke",
        legend: {
          x: 0,
          y: 1,
          traceorder:'reversed'
        //},
        //margin: {
        //  l: 60,
        //  r: 10,
        //  b: 40,
        //  t: 40,
        }
      };

      var lpaGraph = document.getElementById('lpaGraph');
      Plotly.newPlot(lpaGraph, data, layout, config);

      var rxGraph = document.getElementById('rxGraph');
      Plotly.newPlot(rxGraph, graph2_data, layout, config);
    }
  }
  // ---------- unit change script ---------- //
  document.getElementById('mmolL').addEventListener("click", cholUnitChange);
  document.getElementById('mgdL').addEventListener("click", cholUnitChange);

  document.getElementById('cm').addEventListener("click", heightUnitChange);
  document.getElementById('in').addEventListener("click", heightUnitChange);

  document.getElementById('kg').addEventListener("click", weightUnitChange);
  document.getElementById('lbs').addEventListener("click", weightUnitChange);

  function cholUnitChange() {
    var label_TC = document.getElementById("TC-label");
    var label_LDL = document.getElementById("LDL-label");
    var label_HDL = document.getElementById("HDL-label");

    var units = document.getElementsByName("chol-unit");
    for (var i = 0; i < units.length; i++) {
      if (units[i].checked) {
        var unit = units[i].value;
      }
    }

    if (unit == "mmol/L") {
      label_TC.innerHTML = "Total Cholesterol (mmol/L) (range 3.5 - 8.0)"
      label_LDL.innerHTML = "LDL Cholesterol (mmol/L) (range 2.0 - 5.0)"
      label_HDL.innerHTML = "HDL Cholesterol (mmol/L) (range 0.6 - 2.8)"
    } else {
      label_TC.innerHTML = "Total Cholesterol (mg/dL) (range 135 - 300)"
      label_LDL.innerHTML = "LDL Cholesterol (mg/dL) (range 80 - 200)"
      label_HDL.innerHTML = "HDL Cholesterol (mg/dL) (range 25 - 100)"
    }
  }

  function heightUnitChange() {
    var label_height = document.getElementById("height-label");

    var units = document.getElementsByName("height-unit");
    for (var i = 0; i < units.length; i++) {
      if (units[i].checked) {
        var unit = units[i].value;
      }
    }

    if (unit == "cm") {
      label_height.innerHTML = "Height (cm)"
    } else {
      label_height.innerHTML = "Height (in)"
    }
  }

  function weightUnitChange() {
    var label_weight = document.getElementById("weight-label");

    var units = document.getElementsByName("weight-unit");
    for (var i = 0; i < units.length; i++) {
      if (units[i].checked) {
        var unit = units[i].value;
      }
    }

    if (unit == "kg") {
      label_weight.innerHTML = "Weight (kg)"
    } else {
      label_weight.innerHTML = "Weight (lbs)"
    }
  }
  // ---------- unit change script ---------- //
}

// -------- calculate formula --------//
var Ha_list, Hb_list, avg_bmi, avg_hdl, mean_LDL_list, mean_SBP_list, men_Ha, men_Hb, men_mean_LDL, men_mean_SBP, women_Ha, women_Hb, women_mean_LDL, women_mean_SBP;

men_mean_LDL = [3.3174731188868307, 3.334143838077217, 3.350898329725846, 3.3677370147998453, 3.3846603163817544, 3.4016686596801553, 3.4187624720403567, 3.435942182955132, 3.45320822407551, 3.4705610292216185, 3.4880010343935868, 3.4955003878975948, 3.54100077579519, 3.555500387897595, 3.611998965606413, 3.655001292991983, 3.6629997414016033, 3.6299999999999994, 3.6829997414016034, 3.6814998707008013, 3.695500387897595, 3.68899922420481, 3.700499094905611, 3.724998707008017, 3.7459994828032066, 3.7070002585983968, 3.7089992242048098, 3.714000517196793, 3.721499870700802, 3.714000517196793, 3.718500129299198, 3.69899922420481, 3.6940005171967933, 3.6870002585983968, 3.6940005171967933, 3.6570002585983965, 3.6470002585983967, 3.6449987070080163, 3.631998965606413, 3.613838970778381, 3.595769775924489, 3.5777909270448665, 3.559901972409642, 3.542102462547594, 3.524391950234856, 3.506769990483682, 3.4892361405312635, 3.471789959828607, 3.454431010029464, 3.437158854979317, 3.41997306070442];
women_mean_LDL = [2.861743860038676, 2.8833691285024443, 2.905157812093143, 2.9271111456857857, 2.949230373486938, 2.971516749105227, 2.9939715356223946, 3.016596005664881, 3.03939144147595, 3.062359134988363, 3.085500387897595, 3.0970002585983964, 3.12, 3.162999741401603, 3.1659994828032065, 3.2199999999999998, 3.2514998707008016, 3.3110007757951894, 3.351998965606413, 3.43, 3.497000258598397, 3.5314998707008014, 3.601998965606413, 3.654000517196793, 3.7199999999999998, 3.7695009050943886, 3.7919989656064126, 3.821998965606413, 3.8435014222911814, 3.83899922420481, 3.9010007757951897, 3.9270002585983965, 3.934998707008017, 3.9259994828032063, 3.9440005171967933, 3.9495009050943883, 3.9449987070080166, 3.9380010343935865, 3.9570002585983968, 3.9329997414016034, 3.9529997414016034, 3.9332347426945957, 3.9135685689811224, 3.8940007261362166, 3.8745307225055354, 3.8551580688930076, 3.8358822785485422, 3.8167028671558, 3.797619352820021, 3.7786312560559208, 3.759738099775641];

men_mean_SBP = [127.09770000000009, 127.64270000000009, 128.1877000000001, 128.73270000000008, 129.27770000000007, 129.82270000000005, 130.36770000000004, 130.91270000000003, 131.45770000000002, 132.0027, 132.5477, 132.5595, 133.0417, 133.9244, 133.8602, 134.1759, 134.8107, 135.0133, 136.0058, 136.2948, 136.8521, 137.2601, 137.7067, 138.7961, 139.1646, 139.5142, 140.0917, 140.7533, 141.3936, 142.006, 142.6065, 143.1211, 143.6272, 144.0828, 145.4364, 145.5392, 146.494, 146.6693, 146.9347, 147.3451, 147.8901, 148.43509999999998, 148.98009999999996, 149.52509999999995, 150.07009999999994, 150.61509999999993, 151.16009999999991, 151.7050999999999, 152.2500999999999, 152.79509999999988, 153.34009999999986];
women_mean_SBP = [111.82199999999999, 112.72099999999999, 113.61999999999999, 114.51899999999999, 115.41799999999999, 116.317, 117.216, 118.115, 119.014, 119.913, 120.812, 121.5938, 122.2175, 122.8461, 123.4768, 124.808, 125.45, 126.2387, 127.1368, 128.1205, 129.2104, 130.3305, 131.2608, 132.1755, 132.5652, 133.3094, 134.2712, 135.0678, 136.1804, 137.2556, 137.6882, 139.0932, 140.3054, 141.3204, 142.0509, 142.8775, 144.2726, 145.0231, 145.8587, 146.5092, 145.9757, 146.8747, 147.7737, 148.6727, 149.5717, 150.4707, 151.3697, 152.2687, 153.1677, 154.0667, 154.9657];

men_Ha = [0.9999, 0.9999, 0.9998, 0.9999, 0.9998, 0.9997, 0.9997, 0.9997, 0.9995, 0.9994, 0.999, 0.9993, 0.9989, 0.9991, 0.9989, 0.9983, 0.9985, 0.9984, 0.998, 0.9975, 0.997, 0.9974, 0.9966, 0.9966, 0.996, 0.9953, 0.9953, 0.9951, 0.9944, 0.9945, 0.9934, 0.9936, 0.9929, 0.9931, 0.9923, 0.9925, 0.9922, 0.9913, 0.9915, 0.9911, 0.9909, 0.99, 0.9899, 0.9898, 0.9891, 0.9881, 0.9879, 0.9873, 0.9858, 0.987, 0.9855];
men_Hb = [1, 1, 0.9999, 1, 0.9999, 1, 0.9999, 1, 0.9999, 0.9998, 0.9997, 0.9999, 0.9997, 0.9998, 0.9997, 0.9995, 0.9996, 0.9995, 0.9994, 0.9994, 0.9991, 0.9993, 0.9989, 0.9988, 0.9987, 0.9986, 0.9984, 0.9982, 0.9979, 0.9977, 0.9971, 0.9972, 0.9965, 0.9962, 0.9953, 0.9948, 0.9944, 0.9929, 0.9924, 0.991, 0.9901, 0.9885, 0.986, 0.9848, 0.9835, 0.9817, 0.9798, 0.9763, 0.9748, 0.9717, 0.9662];

women_Ha = [1, 1, 1, 1, 1, 1, 1, 0.9999, 0.9999, 0.9999, 0.9998, 0.9999, 0.9998, 0.9998, 0.9998, 0.9997, 0.9997, 0.9996, 0.9996, 0.9994, 0.9993, 0.9994, 0.9992, 0.9992, 0.9991, 0.9989, 0.9989, 0.9989, 0.9986, 0.9984, 0.9981, 0.9981, 0.9982, 0.9979, 0.998, 0.9975, 0.997, 0.9969, 0.9968, 0.9964, 0.9961, 0.9956, 0.9955, 0.9951, 0.9944, 0.9939, 0.9934, 0.993, 0.99304, 0.9913, 0.9921];
women_Hb = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9998, 0.9998, 0.9997, 0.9997, 0.9996, 0.9995, 0.9995, 0.9994, 0.9992, 0.9992, 0.9991, 0.9989, 0.9988, 0.9986, 0.9985, 0.9982, 0.9978, 0.9976, 0.9971, 0.9967, 0.9963, 0.9957, 0.995, 0.9941, 0.993, 0.992, 0.9911, 0.9902, 0.9885, 0.9874, 0.985, 0.9832, 0.9821, 0.9797];

Ha_list = [women_Ha, men_Ha];
Hb_list = [women_Hb, men_Hb];

mean_LDL_list = [women_mean_LDL, men_mean_LDL];
mean_SBP_list = [women_mean_SBP, men_mean_SBP];

Ha_list = [women_Ha, men_Ha];
Hb_list = [women_Hb, men_Hb];

mean_LDL_list = [women_mean_LDL, men_mean_LDL];
mean_SBP_list = [women_mean_SBP, men_mean_SBP];

avg_bmi = [26.98912, 27.85051];
avg_hdl = [1.598386, 1.283341];

function calculate(age, sex, ldl, ldl_rx, ldl_dec, age_start_rx_ldl, age_stop_rx_ldl, hdl, sbp, sbp_rx, sbp_dec, age_start_rx_sbp, age_stop_rx_sbp, smoke, fmr_tob, prevalent_diabetes_35, bmi, fam_hx_chd, Lp_a = null) {
  if (Lp_a === null) {
    Lp_a = [20.66, 16.6][sex];
  }

  var LDL_ES_mmol, SBP_ES_mmol, a_beta, a_sums, a_t, b_beta, b_sums, b_t, c_t, d_t, del_LDL, del_SBP, dm, e_t, f_t, lnRR_a, lnRR_a_list, lnRR_b, lnRR_b_list, m_t, past_a_sums;
  past_a_sums = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  dm = Number.parseInt(prevalent_diabetes_35);
  lnRR_a_list = [];
  lnRR_b_list = [];

  lnRR_a = [];
  lnRR_a.length = (81 - 30);
  lnRR_b = [];
  lnRR_b.length = (81 - 30);
  a_t = [];
  a_t.length = (81 - 30);
  b_t = [];
  b_t.length = (81 - 30);
  c_t = [];
  c_t.length = (81 - 30);
  d_t = [];
  d_t.length = (81 - 30);
  e_t = [];
  e_t.length = (81 - 30);
  f_t = [];
  f_t.length = (81 - 30);
  m_t = [];
  m_t.length = (81 - 30);

  LDL_ES_mmol = [0.610294236200972 / 45, 0.696666480552631 / 40];
  SBP_ES_mmol = [0.596822386208318 / 450, 0.562215263512178 / 400];
  del_LDL = ldl - mean_LDL_list[sex][age - 30];
  del_SBP = sbp - mean_SBP_list[sex][age - 30];
  a_beta = [
    [0.66 * 0.85, 0.5, [0.983679437374588, 0.768813402297644],
      [0.467034851783647, 0.417294201034895], 0.800648203696211, 0.502003018790893, 0.00895775920895248, -0.632265086010107, 0.00305563, 0
    ],
    [0.66 * 0.85, 0.5, [0.641703348526382, 0.4042777367951],
      [0.396454635449883, 0.351011034242294], 0.690752315157672, 0.555861893739954, 0.0109834603573848, -0.612663093385597, 0.00305563, 0
    ]
  ];
  b_beta = [
    [0.00432149552442511, 0.0000196190161699591, [1.11270781170849, 1.23876285117286],
      [0.336045717103265, 0.462419315914295], 0.515257189855812, 0.0179926569543217, 0.0140518092696023, -0.201163272313767, 0
    ],
    [0.00866812947141468, 0.000260041603209642, [1.29162125334208, 0.857058215628963],
      [0.453034845319801, 0.382734719097288], 0.592360632788394, 0.0374768858776153, 0.0148344238334535, 0.00425393915728762, 0
    ]
  ];

  for (var i_a = 30, _pj_a = 81; i_a < _pj_a; i_a += 1) {
    a_sums = [];
    a0 = del_LDL * a_beta[sex][0] * (i_a - 20);
    a1 = ldl_rx === 1 && i_a >= age_start_rx_ldl ? -0.12 : 0;
    a2 = i_a - age_start_rx_ldl >= 0 && age_stop_rx_ldl - i_a >= 0 && ldl_rx === 1 ? (i_a - age_start_rx_ldl + 1) * ldl_dec : past_a_sums.slice(-1)[0][2];
    a3 = a0 + a2;
    a4 = del_SBP * a_beta[sex][1] * (i_a - 20);
    a5 = sbp_rx === 1 && i_a >= age_start_rx_sbp ? -0.1 : 0;
    a6 = i_a - age_start_rx_sbp >= 0 && age_stop_rx_sbp - i_a >= 0 && sbp_rx === 1 ? (i_a - age_start_rx_sbp + 1) * sbp_dec : past_a_sums.slice(-1)[0][6];
    a7 = a4 + a6;
    a8 = LDL_ES_mmol[sex] * a3 + a1;
    a9 = SBP_ES_mmol[sex] * a7 + a5;

    //console.log(a_beta[sex][1])
    //console.log(i_a, a4, a5, a6, a7, a8, a9)

    a_sums.push(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
    a_sums.push(
      smoke * a_beta[sex][2][dm],
      fmr_tob * a_beta[sex][3][dm],
      prevalent_diabetes_35 * a_beta[sex][4],
      fam_hx_chd * a_beta[sex][5],
      (bmi - avg_bmi[sex]) * a_beta[sex][6],
      (hdl - avg_hdl[sex]) * a_beta[sex][7],
      (Lp_a - [20.66, 16.6][sex]) * a_beta[sex][8]
    );

    past_a_sums.push(a_sums)

    b_sums = [
      del_LDL * b_beta[sex][0],
      del_SBP * b_beta[sex][1],
      smoke * b_beta[sex][2][dm],
      fmr_tob * b_beta[sex][3][dm],
      prevalent_diabetes_35 * b_beta[sex][4],
      fam_hx_chd * b_beta[sex][5],
      (bmi - avg_bmi[sex]) * b_beta[sex][6],
      (hdl - avg_hdl[sex]) * b_beta[sex][7]
    ];


    lnRR_a_list.push(a_sums.slice(8).reduce((a, b) => a + b));
    lnRR_b_list.push(b_sums.reduce((a, b) => a + b));
  }

  for (var i = 0, _pj_a = 81 - 30; i < _pj_a; i += 1) {
    lnRR_a[i] = lnRR_a_list[i];
    lnRR_b[i] = lnRR_b_list[i];

    if (i < age - 30) {
      a_t[i] = 0;
      b_t[i] = 0;
      c_t[i] = 0;
      d_t[i] = 0;
      e_t[i] = 0;
      f_t[i] = 0;
      m_t[i] = 0;
    }

    if (i === age - 30) {
      a_t[i] = 1 - Math.pow(Ha_list[sex][i], Math.exp(lnRR_a[i]));
      b_t[i] = 1 - Math.pow(Hb_list[sex][i], Math.exp(lnRR_b[i]));
      c_t[i] = b_t[i];
      d_t[i] = a_t[i];
      e_t[i] = 1 - c_t[i] - d_t[i];
      f_t[i] = 0 + d_t[i];
      m_t[i] = 0 + c_t[i];
    } else {
      a_t[i] = 1 - Math.pow(Ha_list[sex][i], Math.exp(lnRR_a[i]));
      b_t[i] = 1 - Math.pow(Hb_list[sex][i], Math.exp(lnRR_b[i]));
      c_t[i] = e_t[i - 1] * b_t[i];
      d_t[i] = e_t[i - 1] * a_t[i];
      e_t[i] = e_t[i - 1] - c_t[i] - d_t[i];
      f_t[i] = f_t[i - 1] + d_t[i];
      m_t[i] = m_t[i - 1] + c_t[i];
    }
  }

  f_t.unshift(0);
  f_t = f_t.slice(0, -1)
  return (f_t)
}
// -------- calculate formula --------//
