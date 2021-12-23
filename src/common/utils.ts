import { JSONPath } from "jsonpath-plus";
const convert = require("xml-js");

function parseXmlToJson(body: any) {
  const json = convert.xml2json(body, { compact: true });
  return json;
}

function parseJsonToXML(body: any) {
  const result = convert.json2xml(body, { compact: true });
  return result;
}

function getValueFromJsonByPath(path: string, obj: any) {
  const value = JSONPath({
    path: path,
    json: obj,
  });
  return value;
}

const utils = {
  parseXmlToJson,
  parseJsonToXML,
  getValueFromJsonByPath,
};

export default utils;
