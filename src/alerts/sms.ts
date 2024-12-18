import request from "request"

export function sendSms(EnvConfig: Record<string, any>, phone: string, patternCode: string, vars: any) {
    // let vars = {code: 1252}
    // patternCode: 3e61w8d1wi1vpwe
    console.log('sms send')
    request.post(
      {
        url: EnvConfig.url_sms,
        body: {
          op: "pattern",
          user: EnvConfig.user_sms,
          pass: EnvConfig.pass_sms,
          fromNum: EnvConfig.fromNum_sms,
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
