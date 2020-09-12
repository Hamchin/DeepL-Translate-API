function doGet(e) {
  const text = e.parameter.text || '';
  const source = e.parameter.source || 'en';
  const target = e.parameter.target || 'ja';
  const translatedText = LanguageApp.translate(text, source, target);

  const body = {
    source: text,
    target: translatedText
  };

  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(body));

  return response;
}
