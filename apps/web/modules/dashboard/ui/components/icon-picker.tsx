"use client";

import { useState, useMemo } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@workspace/ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Button } from "@workspace/ui/components/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import * as Icons from "lucide-react";

// Popular icons for tools
const POPULAR_ICONS = [
  "Upload", "Download", "File", "FileText", "Image", "FolderOpen",
  "Settings", "CheckCircle", "XCircle", "AlertCircle", "Info",
  "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown",
  "Zap", "Sparkles", "Star", "Heart", "ThumbsUp",
  "Edit", "Trash2", "Save", "Share2", "Copy",
  "Eye", "EyeOff", "Lock", "Unlock", "Key",
  "Mail", "Phone", "MessageSquare", "Send", "Inbox",
  "Calendar", "Clock", "Timer", "Stopwatch",
  "Search", "Filter", "SortAsc", "SortDesc",
  "Plus", "Minus", "X", "Maximize2", "Minimize2",
  "RefreshCw", "RotateCw", "RotateCcw", "Repeat",
  "Home", "User", "Users", "UserPlus", "UserMinus",
  "Briefcase", "ShoppingCart", "CreditCard", "DollarSign",
  "Database", "Server", "Cloud", "HardDrive",
  "Code", "Terminal", "Cpu", "Smartphone", "Laptop",
  "Camera", "Video", "Mic", "Volume2", "VolumeX",
  "Map", "MapPin", "Navigation", "Compass",
  "Sun", "Moon", "CloudRain", "CloudSnow",
  "Bookmark", "Tag", "Flag", "Award", "Gift",
  "Bell", "BellOff", "Activity", "TrendingUp", "TrendingDown",
  "BarChart", "PieChart", "LineChart", "Layout",
  "Grid", "List", "Columns", "Rows",
  "Link", "LinkOff", "ExternalLink", "Anchor",
  "Scissors", "Clipboard", "FileEdit", "FilePlus",
  "FolderPlus", "Archive", "Package", "Box",
  "Layers", "Move", "Maximize", "Minimize",
  "ZoomIn", "ZoomOut", "Crosshair", "Focus",
  "MousePointerClick", "Hand", "Grab",
];

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  placeholder?: string;
}

export const IconPicker = ({ value, onChange, placeholder = "Select icon..." }: IconPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    if (!search) return POPULAR_ICONS;
    return POPULAR_ICONS.filter((icon) => 
      icon.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <div className="flex items-center gap-2">
              {renderIcon(value)}
              <span>{value}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search icons..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup>
              {filteredIcons.map((icon) => (
                <CommandItem
                  key={icon}
                  value={icon}
                  onSelect={() => {
                    onChange(icon);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === icon ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {renderIcon(icon)}
                  <span className="ml-2">{icon}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

