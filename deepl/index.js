const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const getResponse = (statusCode, source, target) => {
  const body = { source, target };
  return {
    statusCode: statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body)
  };
};

exports.handler = async (event) => {
  let browser = null;
  let response = null;
  const params = event.queryStringParameters || {};
  const text = params.text || '';
  const source = params.source || 'en';
  const target = params.target || 'ja';

  // Validation
  if (text === '' || text.length > 5000) {
    response = getResponse(400, text, '');
    return response;
  }

  // Translate
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    });
    // Go to DeepL
    const page = await browser.newPage();
    const endpoint = `https://www.deepl.com/translator#${source}/${target}/`;
    await page.goto(endpoint + encodeURIComponent(text));
    // Wait for translation completed
    const getValue = selector => document.querySelector(selector).value;
    const textHandle = await page.waitForFunction(getValue, {}, '.lmt__target_textarea');
    const translatedText = await textHandle.jsonValue();
    response = getResponse(200, text, translatedText);
  }
  catch (error) {
    console.log(error);
    response = getResponse(400, text, '');
  }
  finally {
    if (browser !== null) await browser.close();
  }

  return response;
};
