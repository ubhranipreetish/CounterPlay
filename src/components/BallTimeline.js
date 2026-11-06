"use client";

export default function BallTimeline({ commentary }) {
    if (!commentary || commentary.length === 0) return null;

    const getTypeIcon = (type) => {
        switch (type) {
            case "6": return "💥";
            case "4": return "🏏";
            case "wicket": return "🔴";
            case "wide": return "⚠️";
            case "dot": return "•";
            default: return "▸";
        }
    };

    const getTypeBadge = (type) => {
        switch (type) {
            case "6":
                return "bg-[#ffd700]/15 text-[#ffd700] border-[#ffd700]/30";
            case "4":
                return "bg-[#46b485]/15 text-[#46b485] border-[#46b485]/30";
            case "wicket":
                return "bg-[#c2475c]/15 text-[#c2475c] border-[#c2475c]/30";
            case "wide":
                return "bg-[#5b79ef]/15 text-[#5b79ef] border-[#5b79ef]/30";
            case "dot":
                return "bg-[#7c8696]/10 text-[#7c8696] border-[#7c8696]/20";
            default:
                return "bg-[#9aa3b2]/10 text-[#9aa3b2] border-[#9aa3b2]/20";
        }
    };

    return (
        <div className="w-full">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#7c8696] mb-4 flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#46b485]" />
                Generated Ball-by-Ball Timeline
                <span className="w-3 h-0.5 bg-[#46b485]" />
            </h3>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {commentary.map((ball, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl glass-light 
              hover:border-[rgba(70,180,133,0.15)] transition-all duration-300"
                        style={{
                            animation: `slide-up 0.4s ease-out ${i * 40}ms forwards`,
                            opacity: 0,
                        }}
                    >
                        {/* Ball number */}
                        <div className="flex-shrink-0 w-12 text-center">
                            <span className="text-xs font-mono font-bold text-[#46b485]">
                                {ball.ball}
                            </span>
                        </div>

                        {/* Icon */}
                        <div className="flex-shrink-0 text-sm mt-0.5">
                            {getTypeIcon(ball.type)}
                        </div>

                        {/* Text */}
                        <p className="flex-1 text-sm text-[#cdd3dd] leading-relaxed">
                            {ball.text}
                        </p>

                        {/* Badge */}
                        <div className="flex-shrink-0">
                            <span
                                className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold border ${getTypeBadge(
                                    ball.type
                                )}`}
                            >
                                {ball.type === "dot"
                                    ? "0"
                                    : ball.type === "wicket"
                                        ? "W"
                                        : ball.type === "wide"
                                            ? "WD"
                                            : ball.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
