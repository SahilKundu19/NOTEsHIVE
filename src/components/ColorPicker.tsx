import React from 'react';
import { NOTE_COLORS } from '../types/note';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  const isDark = document.documentElement.classList.contains('dark');
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-2">
          <Palette className="h-4 w-4 mr-1" />
          Color
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3">
        <div className="grid grid-cols-4 gap-2">
          {NOTE_COLORS.map((color) => {
            const colorValue = isDark ? color.dark : color.value;
            return (
              <button
                key={color.name}
                onClick={() => onColorChange(color.value)}
                className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedColor === color.value 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border'
                }`}
                style={{ backgroundColor: colorValue }}
                title={color.name}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}