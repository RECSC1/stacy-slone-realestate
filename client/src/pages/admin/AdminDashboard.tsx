import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  Loader2,
  LogOut,
  Inbox,
  MessageSquare,
  PenSquare,
  Sparkles,
  Home as HomeIcon,
  Copy,
  Check,
} from "lucide-react";
import { Streamdown } from "streamdown";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";
import { toast } from "sonner";

type Tab = "leads" | "chats" | "listings" | "content" | "ai";

function formatDate(d: Date | string | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleString();
}

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("leads");

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      navigate("/admin");
    }
  }, [loading, isAuthenticated, user, navigate]);

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Inbox }[] = [
    { id: "leads", label: "Leads", icon: Inbox },
    { id: "chats", label: "AI Chats", icon: MessageSquare },
    { id: "listings", label: "Listings", icon: HomeIcon },
    { id: "content", label: "Content", icon: PenSquare },
    { id: "ai", label: "AI Listing Writer", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-serif text-xl text-foreground">Admin Dashboard</p>
            <p className="text-xs text-muted-foreground">
              {SITE.agentName} &middot; {SITE.brokerage}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary">
              View site
            </a>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 border border-border px-3 py-2 text-sm text-foreground hover:border-primary"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="px-6 py-8">
        {tab === "leads" && <LeadsPanel />}
        {tab === "chats" && <ChatsPanel />}
        {tab === "listings" && <ListingsPanel />}
        {tab === "content" && <ContentPanel />}
        {tab === "ai" && <AiWriterPanel />}
      </main>
    </div>
  );
}

/* ----------------------------- LEADS ----------------------------- */
function LeadsPanel() {
  const utils = trpc.useUtils();
  const { data: leads, isLoading } = trpc.admin.leads.useQuery();
  const updateStatus = trpc.admin.updateLeadStatus.useMutation({
    onSuccess: () => utils.admin.leads.invalidate(),
  });
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "archived">("all");

  const filtered = useMemo(() => {
    if (!leads) return [];
    if (filter === "all") return leads;
    return leads.filter((l) => l.status === filter);
  }, [leads, filter]);

  if (isLoading)
    return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-foreground">
          Leads{" "}
          <span className="text-base text-muted-foreground">
            ({leads?.length ?? 0})
          </span>
        </h2>
        <div className="flex gap-1">
          {(["all", "new", "contacted", "archived"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium capitalize ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
          No leads in this view yet. New form submissions will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((l) => (
            <div key={l.id} className="border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {l.formName}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        l.status === "new"
                          ? "bg-primary/15 text-primary"
                          : l.status === "contacted"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {l.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(l.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-foreground">
                    {l.name || "(no name)"}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {l.email && (
                      <a href={`mailto:${l.email}`} className="hover:text-primary">
                        {l.email}
                      </a>
                    )}
                    {l.phone && (
                      <a href={`tel:${l.phone}`} className="hover:text-primary">
                        {l.phone}
                      </a>
                    )}
                    {l.propertyAddress && <span>{l.propertyAddress}</span>}
                  </div>
                  {l.message && (
                    <p className="mt-2 max-w-2xl text-sm text-foreground">
                      {l.message}
                    </p>
                  )}
                  {l.details ? (
                    <pre className="mt-2 max-w-2xl overflow-x-auto rounded bg-secondary/60 p-2 text-xs text-muted-foreground">
                      {JSON.stringify(l.details, null, 2)}
                    </pre>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  {(["new", "contacted", "archived"] as const).map((s) => (
                    <button
                      key={s}
                      disabled={l.status === s || updateStatus.isPending}
                      onClick={() =>
                        updateStatus.mutate({ id: l.id, status: s })
                      }
                      className="border border-border px-3 py-1 text-xs capitalize text-foreground hover:border-primary disabled:opacity-40"
                    >
                      Mark {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- CHATS ----------------------------- */
function ChatsPanel() {
  const { data: logs, isLoading } = trpc.admin.chatLogs.useQuery();
  if (isLoading)
    return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div>
      <h2 className="mb-5 font-serif text-2xl text-foreground">
        AI Conversation Logs
      </h2>
      {!logs || logs.length === 0 ? (
        <div className="border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
          No AI conversations recorded yet.
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((m) => (
            <div
              key={m.id}
              className={`border border-border bg-card p-4 text-sm ${
                m.role === "assistant" ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded bg-secondary px-2 py-0.5">{m.source}</span>
                <span className="font-medium capitalize">{m.role}</span>
                <span>{formatDate(m.createdAt)}</span>
              </div>
              <p className="whitespace-pre-wrap text-foreground">{m.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------- LISTINGS ---------------------------- */
function ListingsPanel() {
  const utils = trpc.useUtils();
  const { data: listings, isLoading } = trpc.admin.listings.useQuery();
  const createListing = trpc.admin.createListing.useMutation({
    onSuccess: () => {
      utils.admin.listings.invalidate();
      utils.content.featuredListings.invalidate();
      toast.success("Listing created");
    },
  });
  const deleteListing = trpc.admin.deleteListing.useMutation({
    onSuccess: () => {
      utils.admin.listings.invalidate();
      utils.content.featuredListings.invalidate();
    },
  });
  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    imageUrl: "",
    description: "",
    featured: true,
    status: "active" as "active" | "pending" | "sold" | "draft",
  });

  if (isLoading)
    return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-5 font-serif text-2xl text-foreground">
          Listings ({listings?.length ?? 0})
        </h2>
        {!listings || listings.length === 0 ? (
          <div className="border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
            No listings yet. Add one using the form. Featured listings appear on
            the homepage.
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between border border-border bg-card p-4"
              >
                <div>
                  <p className="font-medium text-foreground">{l.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.city} &middot; {l.status}
                    {l.featured ? " · featured" : ""}
                  </p>
                </div>
                <button
                  onClick={() => deleteListing.mutate({ id: l.id })}
                  className="text-xs text-destructive hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-border bg-card p-6">
        <h3 className="mb-4 font-serif text-xl text-foreground">Add a listing</h3>
        <div className="space-y-3">
          {[
            ["title", "Title"],
            ["city", "City"],
            ["price", "Price (number)"],
            ["beds", "Beds"],
            ["baths", "Baths"],
            ["sqft", "Sq Ft"],
            ["imageUrl", "Image URL"],
          ].map(([k, label]) => (
            <input
              key={k}
              placeholder={label}
              value={(form as Record<string, string | boolean>)[k] as string}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          ))}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            rows={3}
          />
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured on homepage
          </label>
          <button
            disabled={!form.title || createListing.isPending}
            onClick={() =>
              createListing.mutate({
                title: form.title,
                city: form.city || undefined,
                price: form.price ? Number(form.price) : undefined,
                beds: form.beds ? Number(form.beds) : undefined,
                baths: form.baths ? Number(form.baths) : undefined,
                sqft: form.sqft ? Number(form.sqft) : undefined,
                imageUrl: form.imageUrl || undefined,
                description: form.description || undefined,
                featured: form.featured,
                status: form.status,
              })
            }
            className="w-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {createListing.isPending ? "Saving..." : "Create Listing"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- CONTENT ----------------------------- */
function ContentPanel() {
  const utils = trpc.useUtils();
  const { data: posts, isLoading } = trpc.admin.posts.useQuery();
  const createPost = trpc.admin.createPost.useMutation({
    onSuccess: () => {
      utils.admin.posts.invalidate();
      utils.content.publishedPosts.invalidate();
      toast.success("Post saved");
      setForm({ slug: "", title: "", category: "Guides", excerpt: "", body: "", published: true });
    },
  });
  const deletePost = trpc.admin.deletePost.useMutation({
    onSuccess: () => {
      utils.admin.posts.invalidate();
      utils.content.publishedPosts.invalidate();
    },
  });
  const [form, setForm] = useState({
    slug: "",
    title: "",
    category: "Guides",
    excerpt: "",
    body: "",
    published: true,
  });

  if (isLoading)
    return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-5 font-serif text-2xl text-foreground">
          Blog / Resources ({posts?.length ?? 0})
        </h2>
        {!posts || posts.length === 0 ? (
          <div className="border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
            No posts yet. Write one using the editor.
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border border-border bg-card p-4"
              >
                <div>
                  <p className="font-medium text-foreground">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    /{p.slug} &middot; {p.published ? "published" : "draft"}
                  </p>
                </div>
                <button
                  onClick={() => deletePost.mutate({ id: p.id })}
                  className="text-xs text-destructive hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-border bg-card p-6">
        <h3 className="mb-4 font-serif text-xl text-foreground">Write a post</h3>
        <div className="space-y-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, ""),
              })
            }
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <input
            placeholder="slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <textarea
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            rows={2}
          />
          <textarea
            placeholder="Body (markdown supported)"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            rows={6}
          />
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Publish immediately
          </label>
          <button
            disabled={!form.title || !form.slug || createPost.isPending}
            onClick={() => createPost.mutate(form)}
            className="w-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {createPost.isPending ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- AI WRITER ----------------------------- */
function AiWriterPanel() {
  const writeListing = trpc.ai.writeListing.useMutation();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    address: "",
    propertyType: "",
    beds: "",
    baths: "",
    sqft: "",
    features: "",
    tone: "warm" as "warm" | "luxury" | "concise" | "story-driven",
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="border border-border bg-card p-6">
        <h2 className="mb-1 font-serif text-2xl text-foreground">
          AI Listing Writer
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Generate Fair Housing-conscious MLS copy from property details.
        </p>
        <div className="space-y-3">
          {[
            ["address", "Address"],
            ["propertyType", "Property type"],
            ["beds", "Beds"],
            ["baths", "Baths"],
            ["sqft", "Sq Ft"],
          ].map(([k, label]) => (
            <input
              key={k}
              placeholder={label}
              value={(form as Record<string, string>)[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          ))}
          <textarea
            placeholder="Key features & notes (upgrades, lot, location highlights...)"
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            rows={5}
          />
          <select
            value={form.tone}
            onChange={(e) =>
              setForm({ ...form, tone: e.target.value as typeof form.tone })
            }
            className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="warm">Warm</option>
            <option value="luxury">Luxury</option>
            <option value="concise">Concise</option>
            <option value="story-driven">Story-driven</option>
          </select>
          <button
            disabled={!form.features || writeListing.isPending}
            onClick={() => writeListing.mutate(form)}
            className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {writeListing.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate Copy
          </button>
        </div>
      </div>

      <div className="border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-foreground">Generated copy</h3>
          {writeListing.data?.copy && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(writeListing.data!.copy);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="flex items-center gap-1 text-xs text-primary"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
        {writeListing.data?.copy ? (
          <div className="prose-sm max-w-none text-foreground">
            <Streamdown>{writeListing.data.copy}</Streamdown>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Fill in the details and generate to see MLS-ready copy here.
          </p>
        )}
      </div>
    </div>
  );
}
