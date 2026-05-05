"use client";

import { toast } from "sonner";
import { useState, useCallback } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";
import { Progress } from "@workspace/ui/components/progress";
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert";
import {
  Copy,
  RefreshCw,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  icon: LucideIcon;
}

export default function StrongPasswordGenerator() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  // Generate password
  const generatePassword = useCallback(() => {
    const { length, uppercase, lowercase, numbers, symbols } = options;

    if (!uppercase && !lowercase && !numbers && !symbols) {
      toast.error("Selecione pelo menos um tipo de caractere");
      return;
    }

    const charSets = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    let chars = "";
    if (uppercase) chars += charSets.uppercase;
    if (lowercase) chars += charSets.lowercase;
    if (numbers) chars += charSets.numbers;
    if (symbols) chars += charSets.symbols;

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
    toast.success("Senha gerada com sucesso!");
  }, [options]);

  // Copy password to clipboard
  const copyPassword = useCallback(async () => {
    if (!password) {
      toast.error("Nenhuma senha para copiar");
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast.success("Senha copiada para a área de transferência!");
    } catch {
      toast.error("Falha ao copiar senha");
    }
  }, [password]);

  // Calculate password strength
  const getPasswordStrength = useCallback((pwd: string): PasswordStrength => {
    if (!pwd) return { score: 0, label: "Sem senha", color: "bg-gray-200", icon: ShieldX };

    let score = 0;
    const checks = [
      pwd.length >= 8,
      pwd.length >= 12,
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[^A-Za-z0-9]/.test(pwd),
    ];

    score = checks.filter(Boolean).length;

    if (score <= 2) return { score: 25, label: "Fraca", color: "bg-red-500", icon: ShieldX };
    if (score <= 3) return { score: 50, label: "Razoável", color: "bg-yellow-500", icon: ShieldAlert };
    if (score <= 4) return { score: 75, label: "Boa", color: "bg-blue-500", icon: Shield };
    return { score: 100, label: "Forte", color: "bg-green-500", icon: ShieldCheck };
  }, []);

  const strength = getPasswordStrength(password);

  const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full">
      {/* Options Section */}
      <section aria-labelledby="options-section" className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Password Length */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="length-input" className="text-sm font-medium">
                Tamanho da Senha
              </Label>
              <span className="text-sm text-muted-foreground">{options.length} caracteres</span>
            </div>
            <input
              id="length-input"
              type="range"
              min="4"
              max="32"
              value={options.length}
              onChange={(e) => updateOption("length", parseInt(e.target.value, 10))}
              className="w-full h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>32</span>
            </div>
          </div>

          {/* Character Types */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Tipos de Caractere</Label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-card border-border">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Maiúsculas (A-Z)</span>
                </div>
                <Switch checked={options.uppercase} onCheckedChange={(checked) => updateOption("uppercase", checked)} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-card border-border">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Minúsculas (a-z)</span>
                </div>
                <Switch checked={options.lowercase} onCheckedChange={(checked) => updateOption("lowercase", checked)} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-card border-border">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Números (0-9)</span>
                </div>
                <Switch checked={options.numbers} onCheckedChange={(checked) => updateOption("numbers", checked)} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-card border-border">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Símbolos (!@#$%)</span>
                </div>
                <Switch checked={options.symbols} onCheckedChange={(checked) => updateOption("symbols", checked)} />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generatePassword}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Gerar Nova Senha
          </Button>
        </div>
      </section>

      {/* Security Tips - Always Visible */}
      <Alert className="max-w-2xl mx-auto mt-6 border-blue-500 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
        <CheckCircle className="w-4 h-4 text-blue-600" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">Dicas de Segurança de Senha</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
            <li>Use senhas com pelo menos 12 caracteres</li>
            <li>Inclua uma combinação de maiúsculas, minúsculas, números e símbolos</li>
            <li>Evite usar informações pessoais ou palavras comuns</li>
            <li>Use uma senha única para cada conta</li>
            <li>Considere usar um gerenciador de senhas para armazenar senhas complexas</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Password Display */}
      {password && (
        <section aria-labelledby="password-display" className="max-w-2xl mx-auto mt-8">
          <div className="space-y-6">
            {/* Password Display */}
            <div className="p-6 border rounded-xl bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium">Senha Gerada</Label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)} className="w-8 h-8 p-0">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={copyPassword} className="w-8 h-8 p-0">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Input
                  value={showPassword ? password : "•".repeat(password.length)}
                  readOnly
                  className="pr-12 font-mono text-lg border-2 bg-background"
                />
              </div>
            </div>

            {/* Password Strength */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Força da Senha</Label>
                <div className="flex items-center gap-2">
                  <strength.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{strength.label}</span>
                </div>
              </div>
              <Progress value={strength.score} className="w-full h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fraca</span>
                <span>Razoável</span>
                <span>Boa</span>
                <span>Forte</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Warning for no options selected */}
      {!options.uppercase && !options.lowercase && !options.numbers && !options.symbols && (
        <Alert className="max-w-2xl mx-auto mt-6 text-yellow-800 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <AlertTitle>Configuração Necessária</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            Selecione pelo menos um tipo de caractere para gerar uma senha.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
