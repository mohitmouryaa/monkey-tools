"use client";

import { toast } from "sonner";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Copy, Check, Type, RefreshCw, Search } from "lucide-react";
import { useState, useMemo, useCallback, useDeferredValue } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";

// --- Transformation Logic ---

const BASE_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Helper to create a mapping from a target string
const createMap = (target: string) => {
  const map: Record<string, string> = {};
  // properly split string by code points to handle surrogate pairs (emojis, math symbols)
  const targetChars = [...target];

  for (let i = 0; i < BASE_ALPHABET.length; i++) {
    const char = BASE_ALPHABET[i];
    const targetChar = targetChars[i] ?? char; // Fallback to original
    if (char && targetChar) map[char] = targetChar;
  }
  return map;
};

// Transformation Definitions
const STYLES = [
  {
    id: "bubble",
    name: "Bubble",
    chars: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨",
  },
  {
    id: "bubble-black",
    name: "Bubble (Filled)",
    chars: "🅐🅱🅲🅳🅔🅕🅖🅗🅸🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅱🅲🅳🅔🅕🅖🅗🅸🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩⓿❶❷❸❹❺❻❼❽❾",
  },
  {
    id: "square",
    name: "Square",
    chars: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789",
  },
  {
    id: "bold-script",
    name: "Script (Bold)",
    chars: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  },
  {
    id: "bold-fraktur",
    name: "Gothic (Bold)",
    chars: "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖇𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  },
  {
    id: "double-struck",
    name: "Double Struck",
    chars: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  },
  {
    id: "monospace",
    name: "Monospace",
    chars: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
  },
  {
    id: "bold-serif",
    name: "Bold",
    chars: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  },
  {
    id: "italic-serif",
    name: "Italic",
    chars: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍0123456789",
  },
  {
    id: "bold-italic-sans",
    name: "Bold Italic (Modern)",
    chars: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  },
];

// Precompute maps for performance
const STYLE_MAPS = STYLES.map((style) => ({
  ...style,
  map: createMap(style.chars),
}));

export default function FancyTextGenerator() {
  const [input, setInput] = useState("");
  const deferredInput = useDeferredValue(input);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getTransformedText = useCallback((text: string, map: Record<string, string>) => {
    return text
      .split("")
      .map((char) => map[char] || char)
      .join("");
  }, []);

  const generatedStyles = useMemo(() => {
    if (!deferredInput) return [];

    return STYLE_MAPS.filter((style) => style.name.toLowerCase().includes(searchQuery.toLowerCase())).map((style) => ({
      id: style.id,
      name: style.name,
      text: getTransformedText(deferredInput, style.map),
    }));
  }, [deferredInput, searchQuery, getTransformedText]);

  const handleCopy = async (text: string, id: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Copiado para a área de transferência!");
        setTimeout(() => setCopiedId(null), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopiedId(id);
        toast.success("Copiado para a área de transferência!");
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch {
      toast.error("Falha ao copiar texto");
    }
  };

  const clearText = () => {
    setInput("");
    setSearchQuery("");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Input Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5 text-primary" />
            Texto de Entrada
          </CardTitle>
          <CardDescription>Digite ou cole seu texto abaixo para vê-lo transformado instantaneamente em vários estilos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Digite algo aqui..."
            className="min-h-30 text-lg resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex justify-between items-center bg-muted/30 p-2 rounded-md">
            <div className="text-sm text-muted-foreground pl-2">{input.length} caracteres</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearText}
              disabled={!input}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {input && (
        <div className="space-y-6 slide-in-from-bottom-5 animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Estilos Gerados</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filtrar estilos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedStyles.map((style) => (
              <Card key={style.id} className="group hover:border-primary transition-colors duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">{style.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 relative">
                  <div className="p-3 rounded-md font-medium text-lg min-h-12 break-keep whitespace-pre-wrap font-sans bg-muted/40">
                    {style.text}
                  </div>
                  <div className="absolute right-6 top-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="secondary"
                      className={cn(
                        "h-8 w-8 shadow-sm",
                        copiedId === style.id &&
                          "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 dark:bg-green-900/30 dark:text-green-400",
                      )}
                      onClick={() => handleCopy(style.text, style.id)}
                    >
                      {copiedId === style.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="sr-only">Copiar {style.name}</span>
                    </Button>
                  </div>
                  {/* Mobile Copy Button (Always Visible) */}
                  <div className="md:hidden mt-3 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn("w-full gap-2", copiedId === style.id && "border-green-500 text-green-600")}
                      onClick={() => handleCopy(style.text, style.id)}
                    >
                      {copiedId === style.id ? (
                        <>
                          <Check className="h-4 w-4" /> Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copiar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {generatedStyles.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">Nenhum estilo corresponde ao seu filtro.</div>
          )}
        </div>
      )}

      {/* Empty State / CTA */}
      {!input && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center p-4 bg-muted/30 rounded-full mb-4">
            <Type className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-medium text-muted-foreground">Comece a digitar para gerar texto estilizado</h3>
        </div>
      )}
    </div>
  );
}
