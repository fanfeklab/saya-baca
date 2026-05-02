import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NeoText } from '@/components/atoms/neo-text';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'received' | 'sent';
  avatar?: string;
  name?: string;
  time?: string;
  message: React.ReactNode;
}

export function ChatBubble({
  variant = 'received',
  avatar,
  name,
  time,
  message,
  className,
  ...props
}: ChatBubbleProps) {
  const isSent = variant === 'sent';

  return (
    <div className={cn("flex w-full gap-3", isSent ? "justify-end" : "justify-start", className)} {...props}>
      {!isSent && avatar && (
        <Avatar className="size-10 border-2 mt-auto mb-1 border-border shadow-neo-sm shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("flex flex-col gap-1 max-w-[70%]", isSent ? "items-end" : "items-start")}>
        {name && !isSent && (
          <span className="text-xs font-bold text-muted-foreground ml-1">{name}</span>
        )}
        
        <div 
          className={cn(
            "relative px-4 py-3 border-4 border-border shadow-neo-sm",
            isSent 
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm" 
              : "bg-card text-foreground rounded-2xl rounded-bl-sm"
          )}
        >
          <NeoText variant="body" className={cn("text-sm", isSent && "font-bold tracking-wide")}>
            {message}
          </NeoText>
        </div>
        
        {time && (
          <span className="text-[10px] font-bold text-muted-foreground px-1">{time}</span>
        )}
      </div>

      {isSent && avatar && (
        <Avatar className="size-10 border-2 mt-auto mb-1 border-border shadow-neo-sm shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
