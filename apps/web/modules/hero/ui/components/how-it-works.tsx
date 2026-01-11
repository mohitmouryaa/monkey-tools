import { Upload, Settings, Download, Trash2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Send your file to the tool"
  },
  {
    icon: Settings,
    title: "Configure",
    description: "Adjust the options as needed"
  },
  {
    icon: Download,
    title: "Download",
    description: "Download the result"
  },
  {
    icon: Trash2,
    title: "Insurance",
    description: "We automatically deleted your files"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">How it works</h2>
          <p className="text-muted-foreground">It's that simple. In 4 steps you can complete any mission.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary border border-primary/20 mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
