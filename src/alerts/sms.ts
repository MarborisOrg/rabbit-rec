import request from "request"

export function sendSms(phone: string, patternCode: string, vars: any) {
    // let vars = {code: 1252}
    // patternCode: 3e61w8d1wi1vpwe
    console.log('sms send')
    request.post(
      {
        url: configs.EnvConfig.url_sms,
        body: {
          op: "pattern",
          user: configs.EnvConfig.user_sms,
          pass: configs.EnvConfig.pass_sms,
          fromNum: configs.EnvConfig.fromNum_sms,
          toNum: phone,
          patternCode,
          inputData: [vars],
        },
        json: true,
      },
      function (error, response, _body) {
        if (error) {
          console.log(error);
        }
        if (!error && response.statusCode === 200) {
          console.log(response.body);
        }
      }
    );
}
