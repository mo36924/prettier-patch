import { readFileSync, writeFileSync } from "fs";

writeFileSync(
  "node_modules/prettier/index.js",
  readFileSync("node_modules/prettier/index.js", "utf-8").replace(
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
