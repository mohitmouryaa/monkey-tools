interface ToolHeaderProps {
  title: string;
  introText?: string;
  iconName?: string;
}

export const ToolHeader = ({ title, introText }: ToolHeaderProps) => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h1>
      {introText && <p className="text-lg text-muted-foreground">{introText}</p>}
    </div>
  );
};
