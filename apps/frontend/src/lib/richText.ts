type RichTextNode = {
  children?: RichTextNode[];
  fields?: {
    linkType?: string;
    newTab?: boolean;
    url?: string;
  };
  format?: number | string;
  listType?: "bullet" | "number";
  tag?: string;
  text?: string;
  type?: string;
};

type RichTextRoot = {
  root?: RichTextNode;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatText(node: RichTextNode) {
  let text = escapeHtml(node.text || "");

  const format = typeof node.format === "number" ? node.format : 0;
  if ((format & 1) === 1) text = `<strong>${text}</strong>`;
  if ((format & 2) === 2) text = `<em>${text}</em>`;
  if ((format & 8) === 8) text = `<u>${text}</u>`;
  if ((format & 4) === 4) text = `<s>${text}</s>`;

  return text;
}

function getAlignmentStyle(node: RichTextNode) {
  if (typeof node.format !== "string") return "";

  const alignment = ["left", "center", "right", "justify", "start", "end"].includes(node.format)
    ? node.format
    : "";

  return alignment ? ` style="text-align:${alignment}"` : "";
}

function renderNode(node?: RichTextNode): string {
  if (!node) return "";

  if (node.type === "text") return formatText(node);
  if (node.type === "linebreak") return "<br />";

  const children = (node.children || []).map((child) => renderNode(child)).join("");
  const alignmentStyle = getAlignmentStyle(node);

  switch (node.type) {
    case "paragraph":
      return children ? `<p${alignmentStyle}>${children}</p>` : "";
    case "heading":
      return `<${node.tag || "h2"}${alignmentStyle}>${children}</${node.tag || "h2"}>`;
    case "list":
      return node.listType === "number" ? `<ol${alignmentStyle}>${children}</ol>` : `<ul${alignmentStyle}>${children}</ul>`;
    case "listitem":
      return `<li>${children}</li>`;
    case "quote":
      return `<blockquote${alignmentStyle}>${children}</blockquote>`;
    case "link": {
      const href = escapeHtml(node.fields?.url || "#");
      const target = node.fields?.newTab ? ` target="_blank" rel="noreferrer"` : "";
      return `<a href="${href}"${target}>${children}</a>`;
    }
    default:
      return children;
  }
}

export function renderRichText(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return `<p>${escapeHtml(value)}</p>`;

  const root = value as RichTextRoot;
  const children = root.root?.children || [];

  return children.map((child) => renderNode(child)).join("");
}
