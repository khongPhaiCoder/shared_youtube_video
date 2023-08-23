import { htmlTags } from "@/constants";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";

export const parseHtml = (
  htmlString: string,
  isCleanNeeded = true,
  isParseNeeded = true
): string | JSX.Element | JSX.Element[] => {
  let cleanHtmlString = htmlString;

  if (isCleanNeeded) {
    cleanHtmlString = sanitizeHtmlString(htmlString);
  }
  if (isParseNeeded) {
    return parse(cleanHtmlString);
  }

  return cleanHtmlString;
};

export const sanitizeHtmlString = (htmlString: string): string => {
  return sanitizeHtml(htmlString, {
    enforceHtmlBoundary: true,
    allowedAttributes: {
      div: ["style", "class"],
      span: ["style", "class"],
      p: ["style", "class"],
      a: [
        "id",
        "rel",
        "href",
        "class",
        "onclick",
        "style",
        "target",
        "data-end",
        "data-content-type",
        "data-display-type",
        "data-content-id",
        "data-display-properties",
      ],
      img: ["src", "asset_uid", "class"],
    },
    allowedTags: htmlTags,
  });
};
