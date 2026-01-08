"use client";

import { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Extension, type Node as TiptapNode } from "@tiptap/core";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Palette,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const COLORS = [
  "#000000", "#374151", "#6B7280", "#9CA3AF",
  "#DC2626", "#EA580C", "#D97706", "#CA8A04",
  "#65A30D", "#16A34A", "#059669", "#0D9488",
  "#0891B2", "#0284C7", "#2563EB", "#4F46E5",
  "#7C3AED", "#9333EA", "#C026D3", "#DB2777",
];

const FONT_SIZES = [
  { label: "Small", value: "14px" },
  { label: "Normal", value: "16px" },
  { label: "Medium", value: "18px" },
  { label: "Large", value: "24px" },
  { label: "Extra Large", value: "32px" },
  { label: "Huge", value: "48px" },
];

// Custom FontSize extension
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes: { fontSize?: string }) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [showHTML, setShowHTML] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      FontSize,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlContent(html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
      setHtmlContent(value);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const handleHTMLChange = (html: string) => {
    setHtmlContent(html);
    if (editor) {
      editor.commands.setContent(html);
      onChange(html);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Custom styles for lists */}
      <style jsx global>{`
        .ProseMirror {
          font-size: 16px;
          line-height: 1.6;
        }
        .ProseMirror h2 {
          font-size: 1.75em;
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }
        .ProseMirror h3 {
          font-size: 1.4em;
          font-weight: 600;
          margin-top: 1.25em;
          margin-bottom: 0.5em;
          line-height: 1.4;
        }
        .ProseMirror p {
          margin-top: 0.75em;
          margin-bottom: 0.75em;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .ProseMirror li {
          margin: 0.25rem 0;
          display: list-item;
        }
        /* Preserve inline styles */
        .ProseMirror ul[style*="list-style-type"],
        .ProseMirror ol[style*="list-style-type"] {
          list-style-type: inherit !important;
        }
        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .ProseMirror strong {
          font-weight: 700;
        }
        .ProseMirror em {
          font-style: italic;
        }
      `}</style>

      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/30 items-center">
        {/* Font Size Dropdown */}
        <Select
          value={editor.getAttributes("textStyle").fontSize || "16px"}
          onValueChange={(value) => {
            if (value === "unset") {
              editor.chain().focus().unsetFontSize().run();
            } else {
              editor.chain().focus().setFontSize(value).run();
            }
          }}
        >
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder="Font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unset">Reset</SelectItem>
            {FONT_SIZES.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Formatting */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-accent" : ""}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-accent" : ""}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-accent" : ""}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Headings */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Lists */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-accent" : ""}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-accent" : ""}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Alignment */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Color Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              title="Text Color"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="grid grid-cols-10 gap-1">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => editor.chain().focus().setColor(color).run()}
                  title={color}
                />
              ))}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="w-full mt-2"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              Reset Color
            </Button>
          </PopoverContent>
        </Popover>

        {/* Link */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={setLink}
          className={editor.isActive("link") ? "bg-accent" : ""}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Undo/Redo */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* HTML Toggle */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setShowHTML(!showHTML)}
          className={showHTML ? "bg-accent" : ""}
          title="View HTML Source"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Area */}
      {showHTML ? (
        <div className="p-4">
          <Textarea
            value={htmlContent}
            onChange={(e) => handleHTMLChange(e.target.value)}
            className="font-mono text-sm min-h-[300px]"
            placeholder="Edit HTML directly..."
          />
        </div>
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
};

