import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import avatar from "@/assets/pic.png";

type Message = { sender: "user" | "bot"; text: string };

const WEBHOOK_URL =
  "https://shahzaibawan.app.n8n.cloud/webhook/9689b61c-f812-4d02-84f1-aa3f7d9c1a92/chat";

const TEASERS = [
  "Hello! 👋",
  "Hi, how are you?",
  "I'm Shahzaib's AI assistant",
  "Have a question? I'm right here 😊",
];

// Site ka dark mode detect karta hai
const useIsDark = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const check = () =>
      setDark(
        el.classList.contains("dark") ||
          el.getAttribute("data-theme") === "dark" ||
          el.style.colorScheme === "dark"
      );
    check();
    const obs = new MutationObserver(check);
    obs.observe(el, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
    return () => obs.disconnect();
  }, []);
  return dark;
};

// Mobile screen detect karta hai (640px se chhoti)
const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
};

const CLOSE_MS = 240; // band hone ki animation ka time (milliseconds)

const Chatbot = () => {
  const dark = useIsDark();
  const mobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // window DOM mein hai ya nahi (close animation ke liye)
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! 👋 I'm Shahzaib's AI assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<"typing" | "text">("typing");
  const [teaserIdx, setTeaserIdx] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  // Theme colors
  const t = dark
    ? {
        panel: "#18181b",
        panelBorder: "#27272a",
        header: "linear-gradient(135deg,#27272a,#18181b)",
        headerText: "#fafafa",
        body: "#0f0f12",
        botBubble: "#27272a",
        botText: "#f4f4f5",
        inputBg: "#27272a",
        inputBorder: "#3f3f46",
        inputText: "#fafafa",
        accent: "#f97316",
        fab: "linear-gradient(135deg,#27272a,#18181b)",
        fabIcon: "#f97316",
        fabBorder: "1px solid #3f3f46",
        shadow: "0 20px 50px rgba(0,0,0,.6)",
        dot: "#71717a",
      }
    : {
        panel: "#ffffff",
        panelBorder: "#e2e8f0",
        header: "linear-gradient(135deg,#f97316,#ea580c)",
        headerText: "#ffffff",
        body: "#f8fafc",
        botBubble: "#ffffff",
        botText: "#1e293b",
        inputBg: "#f8fafc",
        inputBorder: "#e2e8f0",
        inputText: "#1e293b",
        accent: "#ea580c",
        fab: "linear-gradient(135deg,#f97316,#ea580c)",
        fabIcon: "#ffffff",
        fabBorder: "none",
        shadow: "0 20px 50px rgba(0,0,0,.25)",
        dot: "#94a3b8",
      };

  // ===== POSITIONS (yahan se desktop / mobile ki jagah badal sakte ho) =====
  const fabSize = mobile ? 54 : 58;

  const fabPos = mobile
    ? { bottom: 80, right: 16 }
    : { bottom: 50, right: 80 };

  const teaserPos = mobile
    ? { bottom: 80 + fabSize + 12, right: 16 }
    : { bottom: 120, right: 80 };

  const windowStyle: React.CSSProperties = mobile
    ? {
        bottom: 80 + fabSize + 12,
        left: 12,
        right: 12,
        width: "auto",
        height: "min(520px, calc(100dvh - 190px))",
      }
    : {
        bottom: 120,
        right: 80,
        width: 370,
        height: "min(520px, calc(100vh - 150px))",
      };
  // ========================================================================

  // Intro animation ke 4 second baad dikhao
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Open/close: kholte waqt foran mount, band karte waqt animation ke baad unmount
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const timer = setTimeout(() => setMounted(false), CLOSE_MS);
    return () => clearTimeout(timer);
  }, [open]);

  // Teaser loop: typing dots -> message -> typing dots -> next message
  useEffect(() => {
    if (open || !visible) return;
    const timer = setTimeout(
      () => {
        if (phase === "typing") {
          setPhase("text");
        } else {
          setTeaserIdx((i) => (i + 1) % TEASERS.length);
          setPhase("typing");
        }
      },
      phase === "typing" ? 1500 : 3500
    );
    return () => clearTimeout(timer);
  }, [phase, open, visible]);

  useEffect(() => {
    if (!open) setPhase("typing");
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, chatInput: text }),
      });
      const data = await res.json();
      const reply = data.reply ?? data.output ?? data.text ?? "No reply";
      setMessages([...newMessages, { sender: "bot", text: String(reply) }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  const Dots = ({ color }: { color: string }) => (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", height: 18 }}>
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            animation: `cb-dot 1s ${d * 0.15}s infinite ease-in-out`,
          }}
        />
      ))}
    </span>
  );

  return (
    <>
      <style>{`
        @keyframes cb-in {
          from { opacity: 0; transform: translateY(24px) scale(.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cb-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(24px) scale(.85); }
        }
        @keyframes cb-fab { from { opacity:0; transform: scale(.4);} to { opacity:1; transform: scale(1);} }
        @keyframes cb-icon { from { opacity:0; transform: rotate(-90deg) scale(.5);} to { opacity:1; transform: rotate(0) scale(1);} }
        @keyframes cb-dot { 0%,60%,100% { transform: translateY(0); opacity:.5;} 30% { transform: translateY(-5px); opacity:1;} }
        @keyframes cb-fade { from { opacity:0; transform: translateY(6px);} to { opacity:1; transform: translateY(0);} }
        .cb-scroll::-webkit-scrollbar { width: 6px; }
        .cb-scroll::-webkit-scrollbar-thumb { background: ${dark ? "#3f3f46" : "#cbd5e1"}; border-radius: 6px; }
      `}</style>

      {/* Teaser bubble (sirf jab chat poori tarah band ho) */}
      {!open && !mounted && (
        <div
          key={phase + teaserIdx}
          style={{
            position: "fixed",
            ...teaserPos,
            zIndex: 9999,
            maxWidth: mobile ? "calc(100vw - 32px)" : 240,
            padding: "10px 14px",
            fontSize: 14,
            lineHeight: 1.4,
            borderRadius: "16px 16px 4px 16px",
            background: t.botBubble,
            color: t.botText,
            border: `1px solid ${t.panelBorder}`,
            boxShadow: "0 6px 20px rgba(0,0,0,.18)",
            animation: "cb-fade .3s ease-out",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          {phase === "typing" ? <Dots color={t.dot} /> : TEASERS[teaserIdx]}
        </div>
      )}

      {/* Chat window */}
      {mounted && (
        <div
          style={{
            position: "fixed",
            ...windowStyle,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            background: t.panel,
            border: `1px solid ${t.panelBorder}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: t.shadow,
            transformOrigin: "bottom right",
            animation: open
              ? "cb-in .35s cubic-bezier(.16,1,.3,1) forwards"
              : `cb-out ${CLOSE_MS}ms cubic-bezier(.4,0,1,1) forwards`,
            pointerEvents: open ? "auto" : "none",
            fontFamily: "inherit",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: mobile ? "12px 14px" : "14px 16px",
              background: t.header,
              color: t.headerText,
              borderBottom: dark ? `1px solid ${t.panelBorder}` : "none",
            }}
          >
            <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
              <img
                src={avatar}
                alt="Shahzaib Awan"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `2px solid ${dark ? t.accent : "rgba(255,255,255,.7)"}`,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#22c55e",
                  border: `2px solid ${dark ? "#18181b" : "#ea580c"}`,
                }}
              />
            </div>
            <div style={{ flex: 1, lineHeight: 1.25, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Shahzaib Awan
              </div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>AI Assistant · Online</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: dark ? "#27272a" : "rgba(255,255,255,.2)",
                border: "none",
                color: t.headerText,
                width: 34,
                height: 34,
                borderRadius: "50%",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="cb-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: mobile ? 12 : 16,
              background: t.body,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  fontSize: 14,
                  lineHeight: 1.45,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: m.sender === "user" ? "#fff" : t.botText,
                  background: m.sender === "user" ? t.accent : t.botBubble,
                  borderRadius:
                    m.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  boxShadow: m.sender === "bot" && !dark ? "0 1px 3px rgba(0,0,0,.1)" : "none",
                }}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: t.botBubble,
                  padding: "12px 14px",
                  borderRadius: "16px 16px 16px 4px",
                }}
              >
                <Dots color={t.dot} />
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: 12,
              borderTop: `1px solid ${t.panelBorder}`,
              background: t.panel,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                minWidth: 0,
                padding: "10px 14px",
                border: `1px solid ${t.inputBorder}`,
                borderRadius: 999,
                outline: "none",
                fontSize: 16, // 16px se iPhone par zoom nahi hota
                color: t.inputText,
                background: t.inputBg,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send"
              style={{
                width: 42,
                height: 42,
                flexShrink: 0,
                borderRadius: "50%",
                border: "none",
                background: t.accent,
                color: "#fff",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          ...fabPos,
          width: fabSize,
          height: fabSize,
          borderRadius: "50%",
          border: t.fabBorder,
          zIndex: 9999,
          cursor: "pointer",
          color: t.fabIcon,
          background: t.fab,
          boxShadow: dark ? "0 8px 24px rgba(0,0,0,.6)" : "0 8px 24px rgba(234,88,12,.45)",
          display: "grid",
          placeItems: "center",
          animation: "cb-fab .35s ease-out",
        }}
      >
        <span
          key={open ? "x" : "chat"}
          style={{ display: "grid", placeItems: "center", animation: "cb-icon .3s ease-out" }}
        >
          {open ? <X size={26} /> : <MessageCircle size={26} />}
        </span>
      </button>
    </>
  );
};

export default Chatbot;