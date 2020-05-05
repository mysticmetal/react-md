/* eslint-disable react/no-danger */
import React, {
  FC,
  HTMLAttributes,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import GoogleFont from "components/GoogleFont";

import "./Markdown.scss";
import { markdownToHTML } from "./utils";

function useMarkdownResolver(markdown: MarkdownProps["children"]): string {
  /* eslint-disable react-hooks/rules-of-hooks */
  // i will never swap between strings and promises
  if (typeof markdown === "string") {
    return markdown;
  }

  const [resolved, setResolved] = useState("");
  useEffect(() => {
    markdown().then((md) => {
      if (typeof md === "string") {
        setResolved(md);
      } else if (typeof md.default === "string") {
        setResolved(md.default);
      }
    });
  }, [markdown]);

  return resolved;
}

interface DangerHTML {
  __html: string;
}

function useHTML(children: MarkdownChildren): DangerHTML {
  const markdown = useMarkdownResolver(children);
  const html = useMemo(
    () => ({
      __html: markdownToHTML(markdown),
    }),
    [markdown]
  );

  return html;
}

type RouterArgs = [string] | [string, string];
function getRouterArgs(href: string): RouterArgs {
  const args: RouterArgs = [href];

  const parts = href.split("/");
  const index = parts.findIndex(
    (part) => part === "guides" || part === "packages"
  );
  if (index !== -1) {
    const name = parts[index + 1];
    args.unshift(href.replace(name, "[id]"));
  }

  return args;
}

function useCustomMarkdownBehavior({
  __html: html,
}: DangerHTML): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    const instance = ref.current;
    if (!instance) {
      return;
    }

    const { origin } = window.location;
    const links = Array.from(
      instance.querySelectorAll<HTMLAnchorElement>("a[href]")
    );

    links.forEach((link) => {
      if (link.href.startsWith(origin)) {
        link.onclick = (event) => {
          event.preventDefault();
          const href = link.href.replace(origin, "");

          const [url, as] = getRouterArgs(href);
          if (as) {
            router.push(url, as);
          } else {
            router.push(url);
          }
        };
      }
    });
  }, [html, router]);

  return ref;
}

export type ResolveMarkdown = () => Promise<string | { default: string }>;
export type MarkdownChildren = string | ResolveMarkdown;

export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
  children: ResolveMarkdown | string;
  disableSinglePMargin?: boolean;
}

const Markdown: FC<MarkdownProps> = ({
  className,
  children,
  disableSinglePMargin,
  ...props
}) => {
  const html = useHTML(children);
  const ref = useCustomMarkdownBehavior(html);

  return (
    <>
      <GoogleFont font="Source Code Pro" />
      <div
        {...props}
        ref={ref}
        className={cn(
          "markdown-container",
          { "markdown-container--no-p-margin": disableSinglePMargin },
          className
        )}
        dangerouslySetInnerHTML={html}
      />
    </>
  );
};

export default Markdown;
