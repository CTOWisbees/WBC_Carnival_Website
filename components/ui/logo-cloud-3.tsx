import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src?: string;
  text?: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {logos.map((logo) =>
          logo.text ? (
            <span
              key={`logo-${logo.alt}`}
              className="pointer-events-none select-none text-sm font-bold tracking-widest uppercase text-foreground opacity-40 hover:opacity-80 transition-opacity duration-200 whitespace-nowrap"
            >
              {logo.text}
            </span>
          ) : (
            <img
              alt={logo.alt}
              className="pointer-events-none h-14 select-none md:h-20 opacity-80 hover:opacity-100 transition-opacity duration-200"
              height={logo.height ?? 32}
              key={`logo-${logo.alt}`}
              loading="lazy"
              src={logo.src}
              width={logo.width ?? "auto"}
            />
          )
        )}
      </InfiniteSlider>
    </div>
  );
}
