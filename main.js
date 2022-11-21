console.log("main.js!!");

const URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/210000.json"; //大垣

$(document).ready(() => {
    console.log("Ready!!");

    let today = new Date();
    let now_day = today.getDay();

    // Axios
    const option = { responseType: "blob" };
    axios
        .get(URL, option)
        .then((res) => {
            // 通信が成功した場合
            res.data.text().then((str) => {
                let arr = JSON.parse(str);
                //console.log(arr);

                //地名
                let area_name = arr[0]["timeSeries"][0]["areas"][0]["area"]["name"];
                $(".area_name").text(area_name);
                //天気分
                let w_name = arr[0]["timeSeries"][0]["areas"][0]["weathers"][0];
                $(".w_text").text(w_name);
                //天気アイコン
                $(".main_2 img").attr("src", "./images/" + arr[0]["timeSeries"][0]["areas"][0]["weatherCodes"][1] + ".svg");
                //気温
                let ic = 0;
                let temp_now;
                let yc = -1;
                let temp1 = -999;
                let temp2;
                for (const elem of arr[0]["timeSeries"][2]["timeDefines"]) {
                    yc++;
                    let tempday = youbi(elem);
                    console.log(now_day, tempday, yc);
                    if (now_day == tempday) {
                        if (temp1 == -999) {
                            temp1 = arr[0]["timeSeries"][2]["areas"][0]["temps"][yc];
                        } else {
                            temp2 = arr[0]["timeSeries"][2]["areas"][0]["temps"][yc];
                        }
                    }
                }
                $(".main_3 .temp_min").text("朝の最低気温  " + Math.min(temp1, temp2) + "°");
                $(".main_3 .temp_max").text("昼の最高気温  " + Math.min(temp1, temp2) + "°");
                //予報
                let i, c, tr, info;
                c = 0;
                const y = ["日", "月", "火", "水", "木", "金", "土"];
                let t = arr[1]["timeSeries"][0]["timeDefines"][1];
                let at = youbi(t);
                console.log(y[at]);
                //対応表読み込み
                axios.get("./trans.JSON", option).then((ress) => {
                    ress.data.text().then((strr) => {
                        tr = JSON.parse(strr);
                        for (i = 0; i <= 5; i++) {
                            c++;
                            //曜日
                            t = arr[1]["timeSeries"][0]["timeDefines"][i];
                            at = youbi(t);
                            info = y[at];
                            $(".w_after .day_" + c + " .date").text(info + "曜日");
                            //降水確率
                            info = arr[1]["timeSeries"][0]["areas"][0]["pops"][i];
                            let sumpop;
                            for (const pop of info) {
                                sumpop += pop;
                            }
                            sumpop /= info.length;
                            if (info == "") {
                                info = arr[0]["timeSeries"][1]["areas"][0]["pops"];
                            }
                            $(".w_after .day_" + c + " .pop").text(info + "%");
                            //天気アイコン
                            info = naitoki(arr[1]["timeSeries"][0]["areas"][0]["weatherCodes"]);
                            $(".w_after .day_" + c + " .w_icon img").attr("src", "./images/" + tr[info]);
                            //最低気温
                            info = arr[1]["timeSeries"][1]["areas"][0]["tempsMin"][i];
                            if (info == "") {
                                info = naitoki(arr[0]["timeSeries"][2]["areas"][0]["temps"]);
                            }
                            $(".w_after .day_" + c + " .temp_min").text(info + "°");
                            //最高気温
                            info = arr[1]["timeSeries"][1]["areas"][0]["tempsMax"][i];
                            $(".w_after .day_" + c + " .temp_max").text(info + "°");
                        }
                    });
                });
            });
        })
        .catch((err) => {
            // 通信が失敗した場合
            console.log(err);
        });

    function youbi(arrdate) {
        arrdate = arrdate.substr(0, 10);
        arrdate = arrdate.replace(/-/g, "/");
        arrdate = new Date(arrdate);
        arrdate = arrdate.getDay();
        return arrdate;
    }

    function naitoki(key) {
        // Axios
        const option = { responseType: "blob" };
        axios.get(URL, option).then((res) => {
            // 通信が成功した場合
            res.data.text().then((str) => {
                let arr = JSON.parse(str);
                let c = -1;
                let res;
                for (const elem of arr[0]["timeSeries"][0]["timeDefines"]) {
                    c++;
                    let elemday = youbi(elem);
                    if (now_day == elemday) {
                        res = key[c];
                    }
                }
                return res;
            });
        });
    }
});
