import { marqueeItems } from "@/lib/i18n";

function StripItems() {
  return (
    <>
      {marqueeItems.map((item) => (
        <span key={item.he} className="about-strip-item">
          <span className="he">{item.he}</span>
          <span className="en">{item.en}</span>
        </span>
      ))}
    </>
  );
}

export function MarqueeStrip() {
  return (
    <div className="about-strip" aria-hidden>
      <div className="about-strip-inner">
        <StripItems />
        <StripItems />
      </div>
    </div>
  );
}
