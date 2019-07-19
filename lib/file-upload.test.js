const test = require('ava');
const rewire = require('rewire');
const sendImageToVisionApi = require('./send-image-to-vision-api');

test('fileUpload', t=>{
  t.plan(10);

  const predictions = '{"predictions":[]}';

  const filePath = 'test-path.png';
  const fileExt = '.png';
  const request = {
    files:{
      file:{
        path:filePath
      }
    }
  };
  const response = {
    status:function(statusCode){
      t.is(statusCode,200);
      return {
        send:function(v){
          t.is(v,predictions);
        }
      }
    }
  }
  const modelId =
    process.env.CUSTOM_MODEL_ID =
    'xxxxxx-model-id';
  const pvsUrl =
    process.env.EINSTEIN_VISION_URL =
    'https://api.einstein.ai/';
  const accountId =
    process.env.EINSTEIN_VISION_ACCOUNT_ID =
    'sgolwalkar@salesforce.com';
  const privateKey =
    process.env.EINSTEIN_VISION_PRIVATE_KEY =
    'MIIEowIBAAKCAQEAgAcqWWvgkq1wrcv/vl8cFR0ywSnMUJiNrTJS2EzJIjTX8j88
    HQ34yVtf7cuQaT3cw+0Rbs94a6yT88SzM7cQE4wfndd7bf98JDdEvkmHVVBcg7VJ
    91MVXINsD7Kdb/3vQk98Ra5Ot3ZJ89KRs/wykvJ1D2Slk7+6Glr/VDV2Rx4xXFuz
    DLrp9v9bPUAq28OWTjBa3SvXK9d+/4zJFoIjJXI64jMn0VrFnCGMQlxVQz9pgzSL
    qC//iPoRNh2hPN2IeMDQYyhBhtZm778zdj2b/MgPLb/vU7PjGJicWxqaehxiCd+Y
    V+dpJCWOuc4pw063MZN1/8s9J+IEwFJjriiUvQIDAQABAoIBAF8e88QEdpID8tft
    3VFf8MlvLCqAF6E59ulbnlm+kyGrCVaezNb5boKMNTXELMNEhyW6mV0vIFU/n51Z
    45rkxDkBvuvTEY2kaGOv/I80qiwkzNe+dfof7JsTudHf70Ep9f3aeIZ8/1cnt8JE
    DKUhF6I+KeMJ8EtaA7dZLKMwJXSoWKfPJ5wfS9NHE5eQlBS67RN5zV8dF/S/vhZx
    DUrRIDX8EaD/iSQkUnJZOZmbjO83uZJ30nCN6a33vdHfKZ1crpEWwL91SoIfpxOD
    CLZzZsRLop/IuJjTpGo5IGzIarCc/d90bTqU5aVxyKgkDhZk4RnMZFuzkkhqt0JG
    sJC9L4ECgYEAv6mslULFWdzXQGD2yap3UEBvNzfO3RVrW860Tfbm9dW3XDLWuku7
    LqyRQc0fS/kZyRmqZ+UwRYGUC5QWaVMkMaTJSZUxo/Bctv5vbR1OzSAyIMcZKCD5
    /7w9gao7a6F7aJL3I7tXRf1s25lEISJJ5Wd3Holfmd1nBXhxyJ9HFYUCgYEAqwEb
    QaYr8ne5vqEgwFN6JuU8OWhHV35rB2tl6PxTbV+7gLd4+btOQJ0wtYdRfDnS+VZU
    7bu4fF5/eDe8lcnvczr8lc72Si9v8aqOG2Kwsxp8XUECzdXl1akLcvyIqvCQEv4k
    DSYBQd0ums5e45/DL+KlIaVcMPia1qqVJ9ZCK9kCgYEAhz5OduCv67JG/bmuSy2L
    lchx8g/iW+UyZY0dc+pmnVAaW+fP15N62PuSYFFC5VQ4WsxOj5ONFW7TLbxoeBff
    8VvrYY3yglEoy0QNEnzczygJ11FGsida4ZdN+4JI/bDsKSWTWNZoRg4G04p6JbtR
    U5xH1Pdwy10MxjJwb/XcrhUCgYAA/9Wn8Y+qMBbuzURCu3ooRgivETPxh/SaK3+B
    +A+IwRl4bBoR441WhVSmiu7n+fKIsH94kDNIzsiR7El22qJCmyKkwXvg/Rv7XpLM
    CCyeL1ZwuROKHmjkccN2XZFy5ksBQWj2hrVVLDS8hN47GFDss7dhVfUO+DT3cjHC
    9NaYKQKBgEPAkJ0aUTiVuanvFMIaQcv0wBzYqD/AIzWDxFlpaP6+OT7/H9RyVZJH
    +M0mez9Fe2JnUv+iiXcKcZGI4Nqcr8c3UaSxSTMXP+aUAckQTyRNDNSrk1G8YJe7
    e/L1Anje3Zh9e+cECUkONMXLourjuLZ0d6OF7TL0fy0D+NRKL91B';
  const jwtToken =
    process.env.EINSTEIN_VISION_TOKEN =
    'XF5IAC7AJA6J3XSL2ZJGJF5BKATCL5W4ROWSW5G33BQ6O47T7OB6QJRCLPDI3GX3U5UWV3YLXR3EJJNI7SHIQINJG6JXASPQNDQQ4SQ';

  const fileUpload = rewire('./file-upload');
  fileUpload.__set__('Episode7',{
    run: function(...args) {
      t.is(args[0],sendImageToVisionApi);
      t.is(args[1],pvsUrl);
      t.is(args[2],filePath);
      t.is(args[3],'png');
      t.is(args[4],modelId);
      t.is(args[5],accountId);
      t.is(args[6],privateKey);
      t.is(args[7],jwtToken);
      return Promise.resolve(predictions);
    }
  });

  return fileUpload(request, response, function(error) { t.true(false, 'Error should not occur') });
});
