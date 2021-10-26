let test_case = [
    `151,150,150,153,154,155,149,150,147,147,148,145,146,148,147,147,146,147,150,146`,
    `145,149,147,145,148,143,144,145,167,146,150,145,145,147,147,148,143,147,145,145`,
    `377,130,133,129,126,129,129,125,127,126,127,136,125,127,126,126,126,126,127,127`,
    `126,126,125,126,144,124,125,130,127,128,125,125,125,128,127,126,127,127,127,129`,
    `253,23,20,21,20,20,20,21,20,20,20,20,20,21,20,20,20,20,20,20`,
    `20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20`,
    `328,130,129,139,132,130,131,150,140,131,138,130,130,130,130,130,130,129,130,131`,
    `130,131,129,131,130,132,130,130,130,130,136,132,131,130,132,137,133,138,133,129`,
    `192,151,151,151,151,150,154,153,150,151,154,150,150,153,151,153,160,158,151,153`,
    `151,154,151,156,152,152,152,150,151,153,152,153,151,150,156,151,152,161,150,153`,
    `280,125,125,132,124,126,123,126,123,126,123,125,123,123,123,126,124,124,127,127`,
    `130,123,123,124,134,132,123,124,125,124,129,124,123,125,125,124,125,123,123,127`,
    `98,25,25,25,24,25,24,24,24,24,24,24,25,24,24,24,24,24,24,23`,
    `24,24,24,24,24,25,24,28,24,24,25,24,24,24,24,24,25,24,24,25`,
    `1660,205,210,201,204,198,203,202,200,203,225,208,199,206,200,208,204,198,201,201`,
    `202,204,199,209,201,195,209,199,200,202,199,204,199,200,203,213,202,199,200,197`,
    `678,135,136,132,138,132,133,132,136,132,133,132,130,131,131,132,131,131,132,146`,
    `147,179,182,137,133,131,131,131,134,132,133,131,140,131,133,130,130,130,136,130`,
    `17104,27109,7110,216,214,214,218,215,217,219,215,220,220,224,227,221,217,216,215,211`,
    `212,219,214,214,215,218,213,222,211,212,230,226,216,220,214,216,216,214,225,215`,
    `29,28,28,28,28,28,27,28,28,28,28,28,29,28,28,29,28,29,28,29`,
    `28,28,30,27,28,28,28,28,28,27,28,28,30,59,70,28,28,28,28,28`,
    `2,4,8`,
    `1000,2000,4000`,
    `120,121,114,116,117,115,116,115,117,120`,
    `202,185,194,192,193,194,194,187,186,194`,
    `117,118,116,112,117,119,117,118,119,118`,
    `107,110,104,104,106,111,108,109,109,108`,
    `85,125,127,127,112,122,122,129,135,106`,
    `155,174,212,204,217,171,205,209,181,205`,
    `121,123,123,121,118,118,113,119,124,117`,
    `105,110,75,105,110,109,77,112,99,111`,
];

let cur_idx = -1;

function area_update(e) {
    // console.log(e);
    let value_list = [];
    let work_list = [];
    let weight_list = [];
    let temp_list = [];
    let sum = 0;
    let min = 99999;
    let pre_tar = -99;
    let tgt_idx = -99;
    let diff_list = [];
    let criteria = -999;
    let outlier_index_list = [];

    let target_value = input_textarea.value;
    value_list = target_value.split(",");
    output_textarea.value = "";
    for (let i = 0; i < value_list.length; i++) {
        work_list.push(parseFloat(value_list[i]));
    }

    for (let k = 0; k < work_list.length; k++) {
        temp_list = [];
        for (let r = 0; r < work_list.length; r++) {
            if (k == r) {
                continue;
            }
            temp_list.push(Math.abs(work_list[r] - work_list[k]));
        }
        diff_list.push(temp_list);

        sum = 0;
        for (let j = 0; j < temp_list.length; j++) {
            sum += temp_list[j];
        }
        weight_list.push(sum);
    }

    // output_textarea.value = weight_list;
    // output_textarea.value += "\n";
    // console.log(weight_list);

    min = 99999;
    for (let i = 0; i < weight_list.length; i++) {
        pre_tar = weight_list[i];
        if (min > pre_tar) {
            min = pre_tar;
            tgt_idx = i;
        }
    }

    output_textarea.value += "최소 차이 합 : ";
    output_textarea.value += min;
    output_textarea.value += "\n선정된 기준 값 : ";
    output_textarea.value += work_list[tgt_idx];
    output_textarea.value += "\n차이 값 리스트 : ";
    output_textarea.value += diff_list[tgt_idx];

    criteria = (work_list[tgt_idx] / 100) * 20;

    output_textarea.value += "\n이상치 기준 차이 값 : ±";
    output_textarea.value += criteria;

    diff_list[tgt_idx].splice(tgt_idx, 0, 0);
    for (k = 0; k < diff_list[tgt_idx].length; k++) {
        pre_tar = diff_list[tgt_idx][k];
        // console.log(pre_tar, criteria);
        if (pre_tar > criteria) {
            outlier_index_list.push(k);
        }
    }
    let final_list = [];
    final_list = work_list;
    output_textarea.value += "\n\n선정된 OUTLIER";
    if (outlier_index_list.length <= 0) {
        output_textarea.value += `가 없습니다.`;
    } else {
        for (i = 0; i < outlier_index_list.length; i++) {
            output_textarea.value += `\n${work_list[outlier_index_list[i]]}`;
            final_list.splice(outlier_index_list[i] - i, 1);
        }
    }
    // console.log(`diff_list `, diff_list[tgt_idx]);
    // console.log(`outlier_index_list `, outlier_index_list);
    
    let total = 0;
    let mean = 0;

    output_textarea.value += "\n\nOUTLIER 제외 평균 : ";
    for (i = 0; i < final_list.length; i++) {
        total += final_list[i];
    }
    mean = total / final_list.length;
    output_textarea.value += `${mean}`;
    
    total = 0;
    mean = 0;
    output_textarea.value += "\n기존 평균 : ";
    for (i = 0; i < work_list.length; i++) {
        total += work_list[i];
    }
    mean = total / work_list.length;
    output_textarea.value += `${mean}`;
}

function macro_input(index) {
    cur_idx = parseInt(index);
    input_textarea.value = test_case[parseInt(index)];
    area_update();
}

function select_changed(e) {
    macro_input(e.target.value);
}

function auto_input() {
    if (cur_idx + 1 >= test_case.length) {
        cur_idx = -1;
    }
    auto_input_select.value = cur_idx + 1;
    macro_input(cur_idx + 1);
}

for (let i = 0; i < test_case.length; i++) {
    let tempo = test_case[i].split(",");
    let option_el = document.createElement("option");
    option_el.value = i;
    option_el.innerText = `${tempo[0]} ${tempo[1]} ${tempo[2]}`;
    auto_input_select.appendChild(option_el);
    // console.log(auto_input_select.innerHTML);
}
