"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText, Image as ImageIcon, Truck, Store, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AddressSelector } from "@/components/checkout/address-selector";
import { useAddresses } from "@/hooks/use-addresses";
import { useAuth } from "@/hooks/use-auth";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg"];
const PAPER_SIZES = ["A4", "A3", "A2", "A1"] as const;
const BINDINGS = [
  { value: "none", label: "None" },
  { value: "spiral", label: "Spiral" },
  { value: "book", label: "Book" },
] as const;
const GSM_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "80", label: "80 GSM" },
  { value: "100", label: "100 GSM" },
  { value: "120", label: "120 GSM" },
] as const;

type PaperSize = (typeof PAPER_SIZES)[number];
type Binding = (typeof BINDINGS)[number]["value"];
type Gsm = (typeof GSM_OPTIONS)[number]["value"];

function nowLocalDatetime() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function OptionButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-3.5 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary-700 bg-primary-50 text-primary-800"
          : "border-border-strong text-ink-700 hover:border-primary-300"
      )}
    >
      {label}
    </button>
  );
}

export function PrintOrderContent() {
  const { user } = useAuth();
  const { addresses, defaultAddress } = useAddresses();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState(user?.displayName ?? "");
  const [wantedAt, setWantedAt] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "courier">("pickup");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(defaultAddress?.id ?? null);
  const [color, setColor] = useState<"normal" | "colour">("normal");
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [binding, setBinding] = useState<Binding>("none");
  const [paperType, setPaperType] = useState<"normal" | "green">("normal");
  const [gsm, setGsm] = useState<Gsm>("normal");
  const [sides, setSides] = useState<"single" | "double">("single");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;
    const valid: File[] = [];
    const rejected: string[] = [];
    Array.from(fileList).forEach((f) => {
      if (ACCEPTED_TYPES.includes(f.type)) valid.push(f);
      else rejected.push(f.name);
    });
    if (rejected.length) {
      toast.error(`Only PDF, PNG or JPG files are supported: ${rejected.join(", ")}`);
    }
    setFiles((prev) => [...prev, ...valid]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const buildMessage = () => {
    const timeLabel = new Date(wantedAt).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    const address = deliveryMethod === "courier" ? addresses.find((a) => a.id === selectedAddressId) : null;

    const lines = [
      "🖨️ *New Print Order Request*",
      "",
      `*Name:* ${name.trim()}`,
      `*Wanted by:* ${timeLabel}`,
      `*Delivery:* ${deliveryMethod === "courier" ? "Courier" : "Pick up at shop"}`,
      ...(address
        ? [
            `*Address:* ${address.street}${address.addressLine2 ? `, ${address.addressLine2}` : ""}, ${address.city}, ${address.state} - ${address.pincode} (Phone: ${address.phone})`,
          ]
        : []),
      "",
      "*Print Details:*",
      `- Copies: ${copies}`,
      `- Color: ${color === "colour" ? "Colour" : "Normal (B&W)"}`,
      `- Sides: ${sides === "double" ? "Front & Back" : "Front only"}`,
      `- Paper Size: ${paperSize}`,
      `- Paper Type: ${paperType === "green" ? "Colour Paper (Green)" : "Normal (White)"}`,
      `- Paper Weight: ${gsm === "normal" ? "Normal" : `${gsm} GSM`}`,
      `- Binding: ${binding === "none" ? "None" : binding === "spiral" ? "Spiral Binding" : "Book Binding"}`,
      ...(notes.trim() ? ["", `*Notes:* ${notes.trim()}`] : []),
      "",
      `*Files:* ${files.map((f) => f.name).join(", ")}`,
    ];

    return lines.join("\n");
  };

  const handleSubmit = async () => {
    if (files.length === 0) return toast.error("Please attach at least one file to print.");
    if (!name.trim()) return toast.error("Please enter your name.");
    if (!wantedAt) return toast.error("Please choose when you'd like it ready.");

    const address = deliveryMethod === "courier" ? addresses.find((a) => a.id === selectedAddressId) : null;
    if (deliveryMethod === "courier" && !address) {
      return toast.error("Please select or add a delivery address.");
    }

    const message = buildMessage();
    const canShareFiles =
      typeof navigator !== "undefined" && !!navigator.canShare && navigator.canShare({ files });

    setSubmitting(true);
    try {
      if (canShareFiles) {
        try {
          await navigator.share({ files, title: "Print Order Request", text: message });
          toast.success("Pick WhatsApp in the share sheet to send your files.");
        } catch (err) {
          if ((err as Error)?.name !== "AbortError") {
            toast.error("Couldn't open the share sheet. Please try again.");
          }
        }
        return;
      }

      // No native file sharing available here — download the files locally
      // and open WhatsApp with the order details so they can be attached by hand.
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      toast.success("Your file(s) downloaded — attach them in WhatsApp before sending.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="max-w-3xl py-6 sm:py-8">
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Print &amp; Xerox Order</h1>
      <p className="mt-1 text-sm text-ink-500">
        Upload your files and tell us how you&apos;d like them printed — we&apos;ll pick it up on WhatsApp.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
          <h2 className="mb-3 text-base font-bold text-ink-900">Files to print</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
            multiple
            onChange={(e) => handleFilesSelected(e.target.files)}
            className="hidden"
            id="print-files"
          />
          <label
            htmlFor="print-files"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-strong px-4 py-8 text-center hover:border-primary-300"
          >
            <Upload className="size-6 text-ink-500" />
            <span className="text-sm font-medium text-ink-700">Tap to choose files</span>
            <span className="text-xs text-ink-500">PDF, PNG or JPG</span>
          </label>

          {files.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {files.map((file, i) => (
                <li
                  key={`${file.name}-${i}`}
                  className="flex items-center gap-2.5 rounded-md border border-border bg-cream-100 px-3 py-2"
                >
                  {file.type === "application/pdf" ? (
                    <FileText className="size-4 shrink-0 text-primary-700" />
                  ) : (
                    <ImageIcon className="size-4 shrink-0 text-primary-700" />
                  )}
                  <span className="flex-1 truncate text-sm text-ink-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${file.name}`}
                    className="text-ink-500 hover:text-error"
                  >
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
          <h2 className="mb-3 text-base font-bold text-ink-900">Your details</h2>
          <div className="flex flex-col gap-3.5 sm:flex-row">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-11 w-full rounded-md border border-border-strong bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/25"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Wanted by</label>
              <input
                type="datetime-local"
                value={wantedAt}
                min={nowLocalDatetime()}
                onChange={(e) => setWantedAt(e.target.value)}
                className="h-11 w-full rounded-md border border-border-strong bg-white px-3.5 text-sm text-ink-900 outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/25"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
          <h2 className="mb-3 text-base font-bold text-ink-900">Delivery</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDeliveryMethod("pickup")}
              className={cn(
                "flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors",
                deliveryMethod === "pickup"
                  ? "border-primary-700 bg-primary-50 text-primary-800"
                  : "border-border-strong text-ink-700 hover:border-primary-300"
              )}
            >
              <Store className="size-4" /> Pick up at shop
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMethod("courier")}
              className={cn(
                "flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors",
                deliveryMethod === "courier"
                  ? "border-primary-700 bg-primary-50 text-primary-800"
                  : "border-border-strong text-ink-700 hover:border-primary-300"
              )}
            >
              <Truck className="size-4" /> Courier
            </button>
          </div>

          {deliveryMethod === "courier" && (
            <div className="mt-4">
              <AddressSelector selectedId={selectedAddressId} onSelect={(a) => setSelectedAddressId(a.id)} />
            </div>
          )}
        </div>

        <div className="rounded-lg bg-surface p-5 shadow-soft ring-1 ring-border">
          <h2 className="mb-4 text-base font-bold text-ink-900">Print options</h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Copies</label>
              <input
                type="number"
                min={1}
                value={copies}
                onChange={(e) => setCopies(Math.max(1, Number(e.target.value) || 1))}
                className="h-11 w-24 rounded-md border border-border-strong bg-white px-3.5 text-sm text-ink-900 outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/25"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Print color</label>
              <div className="flex flex-wrap gap-2">
                <OptionButton label="Normal (B&W)" active={color === "normal"} onClick={() => setColor("normal")} />
                <OptionButton label="Colour" active={color === "colour"} onClick={() => setColor("colour")} />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Sides</label>
              <div className="flex flex-wrap gap-2">
                <OptionButton label="Front only" active={sides === "single"} onClick={() => setSides("single")} />
                <OptionButton label="Front & Back" active={sides === "double"} onClick={() => setSides("double")} />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Paper size</label>
              <div className="flex flex-wrap gap-2">
                {PAPER_SIZES.map((size) => (
                  <OptionButton key={size} label={size} active={paperSize === size} onClick={() => setPaperSize(size)} />
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Paper type</label>
              <div className="flex flex-wrap gap-2">
                <OptionButton label="Normal (White)" active={paperType === "normal"} onClick={() => setPaperType("normal")} />
                <OptionButton
                  label="Colour Paper (Green)"
                  active={paperType === "green"}
                  onClick={() => setPaperType("green")}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Paper weight</label>
              <div className="flex flex-wrap gap-2">
                {GSM_OPTIONS.map((opt) => (
                  <OptionButton key={opt.value} label={opt.label} active={gsm === opt.value} onClick={() => setGsm(opt.value)} />
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Binding</label>
              <div className="flex flex-wrap gap-2">
                {BINDINGS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    label={opt.label}
                    active={binding === opt.value}
                    onClick={() => setBinding(opt.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-500">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything else we should know?"
                rows={3}
                className="w-full rounded-md border border-border-strong bg-white p-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/25"
              />
            </div>
          </div>
        </div>

        <div>
          <Button type="button" size="lg" className="w-full justify-center gap-2" onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-on-accent/30 border-t-on-accent" />
                Sharing…
              </span>
            ) : (
              <>
                <Share2 className="size-4" /> Send via WhatsApp
              </>
            )}
          </Button>
          <p className="mt-2 text-center text-xs text-ink-500">
            This shares your files directly — pick WhatsApp when prompted. It won&apos;t appear in your Orders.
          </p>
        </div>
      </div>
    </Container>
  );
}
