import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const path = join(__dirname, "..", "prettier", "index.js");

writeFileSync(
  path,
  readFileSync(path, "utf-8").replace(
    /function isHtml[\s\S]*?}/,
    `function isHtml(path) {
      return (
        hasLanguageComment(path.getValue(), "HTML") ||
        path.match(
          (node) => node.type === "TemplateLiteral",
          (node, name) =>
          node.type === "TaggedTemplateExpression" &&
          node.tag.type === "Identifier" &&
          node.tag.name === "html" &&
          name === "quasi",
        ) ||
        path.match(
          (node) => node.type === "TemplateLiteral",
          (node, name) =>
          node.type === "TaggedTemplateExpression" &&
          node.tag.type === "MemberExpression" &&
          node.tag.property.type === "Identifier" &&
          node.tag.property.name === "html" &&
          name === "quasi",
        )
      );
    }`,
  ),
);
