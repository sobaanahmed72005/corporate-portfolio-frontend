import type { ReactNode } from "react";

/**
 * Small dependency-free renderer for the CMS richtext field — covers what
 * Strapi's richtext editor toolbar actually produces (headings, bold,
 * italic, links, unordered lists). Renders real React elements, never raw
 * HTML/dangerouslySetInnerHTML, so CMS content can't inject markup.
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;
  let buffer = "";

  const flushBuffer = () => {
    if (buffer) {
      nodes.push(buffer);
      buffer = "";
    }
  };

  while (i < text.length) {
    const rest = text.slice(i);

    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)/.exec(rest);
    if (linkMatch) {
      flushBuffer();
      nodes.push(
        <a
          key={`${keyPrefix}-${key++}`}
          href={linkMatch[2]}
          className="text-brand-600 underline hover:text-brand-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkMatch[1]}
        </a>,
      );
      i += linkMatch[0].length;
      continue;
    }

    const boldMatch = /^\*\*(.+?)\*\*/.exec(rest);
    if (boldMatch) {
      flushBuffer();
      nodes.push(<strong key={`${keyPrefix}-${key++}`}>{boldMatch[1]}</strong>);
      i += boldMatch[0].length;
      continue;
    }

    const italicMatch = /^\*(.+?)\*/.exec(rest);
    if (italicMatch) {
      flushBuffer();
      nodes.push(<em key={`${keyPrefix}-${key++}`}>{italicMatch[1]}</em>);
      i += italicMatch[0].length;
      continue;
    }

    buffer += text[i];
    i += 1;
  }

  flushBuffer();
  return nodes;
}

export function renderMarkdown(body: string): ReactNode[] {
  const blocks = body.split(/\n{2,}/);
  const elements: ReactNode[] = [];

  blocks.forEach((block, blockIndex) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={blockIndex} className="text-lg font-semibold text-contentCardText-950">
          {renderInline(trimmed.slice(4), `b${blockIndex}`)}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={blockIndex} className="text-xl font-bold text-contentCardText-950">
          {renderInline(trimmed.slice(3), `b${blockIndex}`)}
        </h2>,
      );
      return;
    }

    const lines = trimmed.split("\n");
    const isList = lines.every((line) => /^[-*]\s+/.test(line.trim()));
    if (isList) {
      elements.push(
        <ul key={blockIndex} className="list-disc space-y-1.5 pl-5">
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>
              {renderInline(line.trim().replace(/^[-*]\s+/, ""), `b${blockIndex}-${lineIndex}`)}
            </li>
          ))}
        </ul>,
      );
      return;
    }

    elements.push(<p key={blockIndex}>{renderInline(trimmed, `b${blockIndex}`)}</p>);
  });

  return elements;
}
