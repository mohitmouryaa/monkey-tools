export const ToolsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col w-full h-full mx-auto max-w-7xl">{children}</div>
    </div>
  );
};
