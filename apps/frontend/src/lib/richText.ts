type RichTextNode = {
  children?: RichTextNode[];
  fields?: {
    linkType?: string;
    newTab?: boolean;
    url?: string;
  };
  format?: number;
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

  if (node.format && (node.format & 1) === 1) text = `<strong>${text}</strong>`;
  if (node.format && (node.format & 2) === 2) text = `<em>${text}</em>`;
  if (node.format && (node.format & 8) === 8) text = `<u>${text}</u>`;
  if (node.format && (node.format & 4) === 4) text = `<s>${text}</s>`;

  return text;
}

function renderNode(node?: RichTextNode): string {
  if (!node) return "";

  if (node.type === "text") return formatText(node);
  if (node.type === "linebreak") return "<br />";

  const children = (node.children || []).map((child) => renderNode(child)).join("");

  switch (node.type) {
    case "paragraph":
      return children ? `<p>${children}</p>` : "";
    case "heading":
      return `<${node.tag || "h2"}>${children}</${node.tag || "h2"}>`;
    case "list":
      return node.listType === "number" ? `<ol>${children}</ol>` : `<ul>${children}</ul>`;
    case "listitem":
      return `<li>${children}</li>`;
    case "quote":
      return `<blockquote>${children}</blockquote>`;
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
