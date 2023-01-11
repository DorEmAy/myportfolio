const artifacts = ["flower", "plume", "sands", "goblet", "circlet"];
const sub_num_4 = 20;
const sands_main = {
    HP_p: 0.2668,
    ATK_p: 0.2666,
    DEF_p: 0.2666,
    ER: 0.1,
    EM: 0.1,
};
const goblet_main = {
    HP_p: 0.1925,
    ATK_p: 0.1925,
    DEF_p: 0.19,
    Pyro: 0.05,
    Electro: 0.05,
    Cyro: 0.05,
    Hydro: 0.05,
    Dendro: 0.05,
    Anemo: 0.05,
    Geo: 0.05,
    Physical: 0.05,
    EM: 0.025,
};
const circlet_main = {
    HP_p: 0.22,
    ATK_p: 0.22,
    DEF_p: 0.22,
    CRIT_R: 0.1,
    CRIT_D: 0.1,
    Heal: 0.1,
    EM: 0.04,
};
const flower_plume_sub = {
    real_numbers: 0.3158,
    various: 0.5265,
    crits: 0.1578,
};
const various_sub = {
    real_numbers: 0.45,
    various: 0.4,
    crits: 0.15,
};
const bonus_sub = {
    real_numbers: 0.4092,
    various: 0.4545,
    crits: 0.1364,
};
const crit_sub = {
    real_numbers: 0.4389,
    various: 0.488,
    crits: 0.0732,
};
const real_number_group = ["HP", "ATK", "DEF"];
const various_group = ["HP_p", "ATK_p", "DEF_p", "ER", "EM"];
const bonus_group = ["Pyro", "Electro", "Cyro", "Hydro", "Dendro", "Anemo", "Geo", "Physical", "Heal"];
const crit_group = ["CRIT_R", "CRIT_D"];
const need_percentage = ["HP_p", "ATK_p", "DEF_p", "ER", "Pyro", "Electro", "Cyro", "Hydro", "Dendro", "Anemo", "Geo", "Physical", "Heal", "CRIT_R", "CRIT_D"];
const main_stat_value = {
    HP: "717",
    ATK: "47",
    HP_p: "7.0",
    ATK_p: "7.0",
    DEF_p: "8.7",
    ER: "7.8",
    EM: "28",
    Pyro: "7.0",
    Electro: "7.0",
    Cyro: "7.0",
    Hydro: "7.0",
    Dendro: "7.0",
    Anemo: "7.0",
    Geo: "7.0",
    Physical: "8.7",
    CRIT_R: "4.7",
    CRIT_D: "9.3",
    Heal: "5.4",
};
const sub_stat_value = {
    HP: ["209", "239", "269", "299"],
    ATK: ["14", "16", "18", "19"],
    DEF: ["16", "19", "21", "23"],
    HP_p: ["4.1", "4.7", "5.3", "5.8"],
    ATK_p: ["4.1", "4.7", "5.3", "5.8"],
    DEF_p: ["5.1", "5.8", "6.6", "7.3"],
    ER: ["4.5", "5.2", "5.8", "6.5"],
    EM: ["16", "19", "21", "23"],
    CRIT_R: ["2.7", "3.1", "3.5", "3.9"],
    CRIT_D: ["5.4", "6.2", "7.0", "7.8"],
};
const translate = {
    flower: "生の花",
    plume: "死の羽",
    sands: "時の砂",
    goblet: "空の杯",
    circlet: "理の冠",
    HP: "HP",
    ATK: "攻撃力",
    DEF: "防御力",
    HP_p: "HP",
    ATK_p: "攻撃力",
    DEF_p: "防御力",
    ER: "元素チャージ効率",
    EM: "元素熟知",
    Pyro: "炎元素ダメージ",
    Electro: "雷元素ダメージ",
    Cyro: "氷元素ダメージ",
    Hydro: "水元素ダメージ",
    Dendro: "草元素ダメージ",
    Anemo: "風元素ダメージ",
    Geo: "岩元素ダメージ",
    Physical: "物理ダメージ",
    Heal: "与える治癒効果",
    CRIT_R: "会心率",
    CRIT_D: "会心ダメージ",
};

$(function () {
    function lottery_artifacts() {
        let rnd1 = Math.floor(Math.random() * artifacts.length);
        let rnd2 = Math.floor(Math.random() * 100);
        let res_artifacts = artifacts[rnd1];
        let res_sub = rnd2 < sub_num_4 ? 4 : 3;
        return [res_artifacts, res_sub];
    }

    function lottery_op(data) {
        let rate = 0;
        let rnd = Math.random();
        for (const prop in data) {
            rate += data[prop];
            if (rnd < rate) {
                return prop;
                break;
            }
        }
    }

    function main_junction(artifact) {
        if (artifact == artifacts[0]) {
            return "ATK";
        } else if (artifact == artifacts[1]) {
            return "HP";
        } else if (artifact == artifacts[2]) {
            return lottery_op(sands_main);
        } else if (artifact == artifacts[3]) {
            return lottery_op(goblet_main);
        } else if (artifact == artifacts[4]) {
            return lottery_op(circlet_main);
        }
    }

    function group_pick(data) {
        let rnd = Math.floor(Math.random() * data.length);
        return data[rnd];
    }

    function sub_op_pick(main_op, sub_num, data) {
        let sub_op = new Array(sub_num);
        let op;
        for (let i = 0; i < sub_num; i++) {
            do {
                let op_candidate = lottery_op(data);
                if (op_candidate == "real_numbers") {
                    op = group_pick(real_number_group);
                } else if (op_candidate == "various") {
                    op = group_pick(various_group);
                } else if (op_candidate == "crits") {
                    op = group_pick(crit_group);
                }
            } while (sub_op.includes(op) || op == main_op);
            sub_op[i] = op;
        }
        return sub_op;
    }

    function sub_junction(artifact, main_op, sub_num) {
        let sub_op = new Array(sub_num);
        if (artifact == artifacts[0] || artifact == artifacts[1]) {
            sub_op = sub_op_pick(main_op, sub_num, flower_plume_sub);
        } else if (various_group.includes(main_op)) {
            sub_op = sub_op_pick(main_op, sub_num, various_sub);
        } else if (bonus_group.includes(main_op)) {
            sub_op = sub_op_pick(main_op, sub_num, bonus_sub);
        } else if (crit_group.includes(main_op)) {
            sub_op = sub_op_pick(main_op, sub_num, crit_sub);
        }
        return sub_op;
    }

    $(".generate").click(function () {
        console.clear();
        let artifact, main_op, sub_num, main_value;
        let sub_op_key = new Array(sub_num);
        let sub_op = {};
        [artifact, sub_num] = lottery_artifacts();
        main_op = main_junction(artifact);
        main_value = main_stat_value[main_op];
        sub_op_key = sub_junction(artifact, main_op, sub_num);
        for (let i = 0; i < sub_num; i++) {
            sub_op[sub_op_key[i]] = sub_stat_value[sub_op_key[i]][Math.floor(Math.random() * 4)];
        }
        console.log(translate[artifact], sub_num);
        console.log("メイン  " + translate[main_op] + "  " + main_value + (need_percentage.includes(main_op) ? "%" : ""));
        console.log("てすと　" + main_stat_value[main_op]);
        for (const op in sub_op) {
            console.log("サブ  " + translate[op] + "  " + sub_op[op] + (need_percentage.includes(op) ? "%" : ""));
        }
        //
        $(".artifact").text(translate[artifact]);
        $(".main_op_name").text(translate[main_op]);
        $(".main_op_value").text(main_value + (need_percentage.includes(main_op) ? "%" : ""));
        for (let i = 0; i < 3; i++) {
            op = Object.keys(sub_op)[i];
            $(".sub_op_" + i).text("・" + translate[op] + "+" + sub_op[op] + (need_percentage.includes(op) ? "%" : ""));
        }
        if (sub_num == 4) {
            op = Object.keys(sub_op)[3];
            $(".sub_op_3").css("display", "initial");
            $(".sub_op_3").text("・" + translate[op] + "+" + sub_op[op] + (need_percentage.includes(op) ? "%" : ""));
        } else {
            $(".sub_op_3").css("display", "none");
        }
        $(".upper").css("padding", "10px 20px");
        $(".lower").css("padding", "20px 20px");
        $(".stars").css("display", "initial");
        $(".plus_zero").css("display", "initial");
    });
});
