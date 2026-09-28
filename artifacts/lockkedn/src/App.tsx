import { type ReactNode, type FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  Film,
  Gauge,
  Grid2X2,
  Image as ImageIcon,
  Instagram,
  LayoutDashboard,
  Link2,
  ListFilter,
  LoaderCircle,
  MoreHorizontal,
  Package,
  Palette,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Upload,
  WandSparkles,
  X,
  Youtube,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';

type ProductStatus = 'Live' | 'Draft' | 'Needs review';
type ContentStatus = 'Ready' | 'In queue' | 'Scheduled' | 'Published';
type Format = 'Short video' | 'Product demo' | 'Story set';
type Platform = 'TikTok' | 'Instagram' | 'YouTube';

type Product = {
  id: string;
  name: string;
  url: string;
  price: string;
  category: string;
  status: ProductStatus;
  image: string;
  lastUpdated: string;
};

type ContentItem = {
  id: string;
  title: string;
  product: string;
  format: Format;
  status: ContentStatus;
  score: number;
  platform: Platform;
  scheduledAt: string;
  hook: string;
  caption: string;
};

type Account = {
  id: string;
  platform: Platform;
  handle: string;
  status: 'Connected' | 'Needs attention';
  followers: string;
};

type Metric = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
};

type StoreState = {
  products: Product[];
  content: ContentItem[];
  accounts: Account[];
  metrics: Metric[];
};

const starterState: StoreState = {
  products: [
    {
      id: 'p-001',
      name: 'Arc Fold Lamp',
      url: 'shop.emberhouse.co/products/arc-fold',
      price: '$148',
      category: 'Home objects',
      status: 'Live',
      image: 'lamp',
      lastUpdated: '12 min ago',
    },
    {
      id: 'p-002',
      name: 'Daily Field Tote',
      url: 'commonthread.co/field-tote',
      price: '$86',
      category: 'Accessories',
      status: 'Needs review',
      image: 'tote',
      lastUpdated: 'Yesterday',
    },
    {
      id: 'p-003',
      name: 'Soft Focus SPF 40',
      url: 'morrowform.com/soft-focus',
      price: '$34',
      category: 'Beauty',
      status: 'Draft',
      image: 'spf',
      lastUpdated: '2 days ago',
    },
  ],
  content: [
    {
      id: 'c-001',
      title: 'The lamp that changed my 6pm reset',
      product: 'Arc Fold Lamp',
      format: 'Short video',
      status: 'Ready',
      score: 92,
      platform: 'TikTok',
      scheduledAt: '',
      hook: 'POV: your living room finally gets the lighting it deserves.',
      caption: 'A small glow-up for the corner you keep ignoring. The Arc Fold Lamp is soft, sculptural, and actually useful.',
    },
    {
      id: 'c-002',
      title: 'Three ways I use my everyday tote',
      product: 'Daily Field Tote',
      format: 'Product demo',
      status: 'In queue',
      score: 87,
      platform: 'Instagram',
      scheduledAt: '',
      hook: 'One tote, three very different days.',
      caption: 'Work, market, weekend. Built to move through all of it without looking like a compromise.',
    },
    {
      id: 'c-003',
      title: 'SPF that disappears before the mirror does',
      product: 'Soft Focus SPF 40',
      format: 'Story set',
      status: 'Scheduled',
      score: 81,
      platform: 'Instagram',
      scheduledAt: 'Tomorrow, 9:30 AM',
      hook: 'The sunscreen test: can you forget it is there?',
      caption: 'Soft finish, no cast, no negotiations. A daily layer that plays well with the rest of your routine.',
    },
    {
      id: 'c-004',
      title: 'Arc Fold in a real apartment',
      product: 'Arc Fold Lamp',
      format: 'Short video',
      status: 'Published',
      score: 76,
      platform: 'YouTube',
      scheduledAt: 'May 18, 2:00 PM',
      hook: 'Small apartment lighting, solved.',
      caption: 'A closer look at the little lamp doing a lot of work in a 500 sq ft space.',
    },
  ],
  accounts: [
    { id: 'a-001', platform: 'TikTok', handle: '@emberhouse', status: 'Connected', followers: '28.4k' },
    { id: 'a-002', platform: 'Instagram', handle: '@emberhouse.co', status: 'Connected', followers: '14.8k' },
    { id: 'a-003', platform: 'YouTube', handle: 'Ember House Studio', status: 'Needs attention', followers: '6.2k' },
  ],
  metrics: [
    { label: 'Content published', value: '18', change: '+5 this week', trend: 'up' },
    { label: 'Avg. watch-through', value: '42.8%', change: '+6.4%', trend: 'up' },
    { label: 'Product clicks', value: '1,284', change: '+18.7%', trend: 'up' },
    { label: 'Content score', value: '84.6', change: '-1.2%', trend: 'down' },
  ],
};

const readState = (): StoreState => {
  try {
    const stored = localStorage.getItem('lockkedn-state');
    return stored ? JSON.parse(stored) as StoreState : starterState;
  } catch {
    return starterState;
  }
};

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Command center', icon: LayoutDashboard },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/content', label: 'Content queue', icon: Film },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
];

const utilityItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/accounts', label: 'Connected accounts', icon: Link2 },
  { href: '/brand-kit', label: 'Brand kit', icon: Palette },
  { href: '/settings', label: 'AI settings', icon: Settings2 },
];

const productArt: Record<string, string> = {
  lamp: 'from-[#f2c78e] via-[#ef9c70] to-[#c7634a]',
  tote: 'from-[#b6c8bf] via-[#d9b39a] to-[#85756d]',
  spf: 'from-[#e9c8b9] via-[#e8a884] to-[#af7084]',
  ceramic: 'from-[#d8d6c9] via-[#b9bbb5] to-[#767c7c]',
};

function App() {
  const [state, setState] = useState<StoreState>(readState);
  const [toast, setToast] = useState('');
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lockkedn-state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addProduct = (url: string, name: string) => {
    const product: Product = {
      id: `p-${Date.now()}`,
      name: name || 'Untitled product',
      url: url.replace(/^https?:\/\//, ''),
      price: 'TBD',
      category: 'New intake',
      status: 'Needs review',
      image: 'ceramic',
      lastUpdated: 'Just now',
    };
    setState((current) => ({ ...current, products: [product, ...current.products] }));
    setToast('Product added. Ready for a content concept.');
    setQuickAddOpen(false);
  };

  const addConcept = (productName: string, format: Format, platform: Platform) => {
    const product = state.products.find((item) => item.name === productName) ?? state.products[0];
    const title = format === 'Product demo'
      ? `A closer look at ${product?.name ?? 'your product'}`
      : format === 'Story set'
        ? `${product?.name ?? 'Your product'} in the everyday`
        : `The ${product?.name ?? 'product'} moment you did not know you needed`;
    const item: ContentItem = {
      id: `c-${Date.now()}`,
      title,
      product: product?.name ?? 'New product',
      format,
      status: 'In queue',
      score: 78,
      platform,
      scheduledAt: '',
      hook: `A fresh way to see ${product?.name ?? 'this product'} in your day.`,
      caption: `A considered look at ${product?.name ?? 'a product worth pausing for'}. Save this one for later.`,
    };
    setState((current) => ({ ...current, content: [item, ...current.content] }));
    setToast('Concept added to your queue.');
  };

  const updateContent = (id: string, updates: Partial<ContentItem>) => {
    setState((current) => ({
      ...current,
      content: current.content.map((item) => item.id === id ? { ...item, ...updates } : item),
    }));
  };

  const notify = (message: string) => setToast(message);

  return (
    <ErrorBoundary resetKey="lockkedn">
      <div className="grain min-h-[100dvh] bg-background text-foreground">
        <AppShell onAddProduct={() => setQuickAddOpen(true)}>
          <Switch>
            <Route path="/">
              <Dashboard state={state} onAddConcept={addConcept} onAddProduct={() => setQuickAddOpen(true)} onUpdateContent={updateContent} onNotify={notify} />
            </Route>
            <Route path="/products">
              <ProductsPage products={state.products} onAddProduct={() => setQuickAddOpen(true)} onNotify={notify} />
            </Route>
            <Route path="/content">
              <ContentPage content={state.content} products={state.products} onAddConcept={addConcept} onUpdateContent={updateContent} onNotify={notify} />
            </Route>
            <Route path="/calendar">
              <CalendarPage content={state.content} onUpdateContent={updateContent} onNotify={notify} />
            </Route>
            <Route path="/analytics">
              <AnalyticsPage metrics={state.metrics} content={state.content} onNotify={notify} />
            </Route>
            <Route path="/accounts">
              <AccountsPage accounts={state.accounts} onNotify={notify} />
            </Route>
            <Route path="/brand-kit">
              <BrandKitPage onNotify={notify} />
            </Route>
            <Route path="/settings">
              <SettingsPage onNotify={notify} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </AppShell>
        {quickAddOpen && <ProductIntake onClose={() => setQuickAddOpen(false)} onAdd={addProduct} />}
        {toast && <Toast message={toast} />}
      </div>
    </ErrorBoundary>
  );
}

function AppShell({ children, onAddProduct }: { children: ReactNode; onAddProduct: () => void }) {
  const [location] = useLocation();
  return (
    <div className="flex min-h-[100dvh]">
      <aside className="hidden w-[246px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground md:flex">
        <BrandMark />
        <div className="mt-10 flex items-center justify-between px-3">
          <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/45">Workspace</span>
          <button onClick={onAddProduct} data-testid="button-sidebar-add" className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform hover:scale-105" aria-label="Add product">
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
        <nav className="mt-3 space-y-1" aria-label="Main navigation">
          {navItems.map((item) => <SidebarLink key={item.href} item={item} active={location === item.href} />)}
        </nav>
        <div className="mt-8 px-3 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/45">Workspace tools</div>
        <nav className="mt-3 space-y-1" aria-label="Workspace tools">
          {utilityItems.map((item) => <SidebarLink key={item.href} item={item} active={location === item.href} />)}
        </nav>
        <div className="mt-auto space-y-4">
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/55 p-3.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-primary"><Sparkles size={13} /> AI credits</div>
            <div className="mt-3 flex items-end justify-between">
              <span className="font-display text-2xl text-sidebar-foreground">72%</span>
              <span className="font-mono-ui text-[10px] text-sidebar-foreground/45">1,440 / 2k</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-sidebar-foreground/10"><div className="h-full w-[72%] rounded-full bg-primary" /></div>
          </div>
          <div className="flex items-center gap-3 border-t border-sidebar-border pt-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9a47f] font-display text-sm font-bold text-[#49231f]">EH</div>
            <div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold">Ember House</div><div className="truncate text-[11px] text-sidebar-foreground/45">Creator workspace</div></div>
            <button data-testid="button-profile-menu" className="text-sidebar-foreground/50 hover:text-sidebar-foreground"><MoreHorizontal size={16} /></button>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 pb-20 md:pb-0">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-border/70 bg-background/90 px-5 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3 md:hidden"><BrandMark compact /></div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> All systems operational</div>
          <div className="ml-auto flex items-center gap-2">
            <button data-testid="button-help" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><CircleHelp size={17} /></button>
            <button data-testid="button-notifications" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e58b67]" /></button>
            <button onClick={onAddProduct} data-testid="button-header-add" className="ml-1 hidden h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 sm:flex"><Plus size={15} /> Add product</button>
          </div>
        </header>
        <div className="shell-grid min-h-[calc(100dvh-68px)]">{children}</div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[68px] items-center justify-around border-t border-border bg-card/95 px-2 backdrop-blur-lg md:hidden">
        {navItems.slice(0, 5).map((item) => <MobileNavLink key={item.href} item={item} active={location === item.href} />)}
      </nav>
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" data-testid="link-brand" className="flex items-center gap-2.5">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-[9px] bg-primary text-primary-foreground shadow-[3px_3px_0_hsl(var(--accent))]"><span className="font-display text-lg font-extrabold leading-none">L</span><span className="absolute bottom-[6px] right-[6px] h-1 w-1 rounded-full bg-accent" /></span>
      {!compact && <span className="font-display text-xl font-extrabold tracking-[-0.05em] text-sidebar-foreground">lockkedn<span className="text-primary">.</span></span>}
    </Link>
  );
}

function SidebarLink({ item, active }: { item: { href: string; label: string; icon: LucideIcon }; active: boolean }) {
  const Icon = item.icon;
  return <Link href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${active ? 'bg-sidebar-accent text-sidebar-foreground shadow-sm' : 'text-sidebar-foreground/55 hover:bg-sidebar-accent/65 hover:text-sidebar-foreground'}`}><Icon size={16} strokeWidth={active ? 2.2 : 1.8} className={active ? 'text-primary' : 'group-hover:text-primary'} /><span>{item.label}</span>{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}</Link>;
}

function MobileNavLink({ item, active }: { item: { href: string; label: string; icon: LucideIcon }; active: boolean }) {
  const Icon = item.icon;
  return <Link href={item.href} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`flex min-w-[54px] flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[9px] font-semibold ${active ? 'text-foreground' : 'text-muted-foreground'}`}><Icon size={18} className={active ? 'text-accent' : ''} /><span>{item.label === 'Command center' ? 'Home' : item.label.split(' ')[0]}</span></Link>;
}

function PageFrame({ eyebrow, title, description, actions, children }: { eyebrow: string; title: ReactNode; description?: string; actions?: ReactNode; children: ReactNode }) {
  return <div className="mx-auto max-w-[1420px] px-5 py-7 md:px-8 md:py-10"><div className="animate-rise flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-accent">{eyebrow}</div><h1 className="mt-2 font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.055em] text-foreground md:text-[44px]">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}</div>{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}</div><div className="mt-8">{children}</div></div>;
}

function Dashboard({ state, onAddProduct, onAddConcept, onUpdateContent, onNotify }: { state: StoreState; onAddProduct: () => void; onAddConcept: (product: string, format: Format, platform: Platform) => void; onUpdateContent: (id: string, updates: Partial<ContentItem>) => void; onNotify: (message: string) => void }) {
  const ready = state.content.filter((item) => item.status === 'Ready' || item.status === 'In queue');
  return <PageFrame eyebrow="Tuesday, May 21 · Ember House" title={<>Turn one link into<br /><span className="text-accent">the next thing to post.</span></>} description="Your creative command center for product-led content. Intake, generate, schedule, learn." actions={<button onClick={onAddProduct} data-testid="button-dashboard-add-product" className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-xs font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5"><Plus size={15} /> Add product</button>}>
    <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
      <section className="relative overflow-hidden rounded-2xl bg-secondary p-5 text-secondary-foreground shadow-sm md:p-7">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[34px] border-primary/15" /><div className="absolute -right-2 -top-12 h-40 w-40 rounded-full border border-primary/20" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-primary"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15"><Link2 size={13} /></span> The Lockkedn loop</div>
          <div className="mt-8 max-w-md font-display text-2xl font-bold leading-tight tracking-[-0.04em] md:text-[30px]">Bring the product.<br />Leave with a point of view.</div>
          <div className="mt-8 grid grid-cols-3 gap-2">
            {['01  Intake', '02  Generate', '03  Publish'].map((label, index) => <div key={label} className="rounded-lg border border-secondary-foreground/10 bg-secondary-foreground/5 p-3"><div className="font-mono-ui text-[10px] text-primary">{label.slice(0, 2)}</div><div className="mt-1 text-[11px] leading-4 text-secondary-foreground/70">{label.slice(4)}</div><div className={`mt-4 h-1 w-full rounded-full ${index < 2 ? 'bg-primary' : 'bg-secondary-foreground/20'}`} /></div>)}
          </div>
          <button onClick={onAddProduct} data-testid="button-start-intake" className="mt-8 flex items-center gap-2 text-xs font-bold text-primary hover:underline">Start with a product link <ChevronRight size={15} /></button>
        </div>
      </section>
      <div className="grid grid-cols-2 gap-3">
        {state.metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}
      </div>
    </div>
    <div className="mt-8 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-[0_8px_30px_hsl(var(--foreground)/0.03)] md:p-6">
        <div className="flex items-center justify-between"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Next up</div><h2 className="mt-1 font-display text-xl font-bold tracking-[-0.04em]">Content queue</h2></div><Link href="/content" data-testid="link-view-queue" className="flex items-center gap-1 text-xs font-bold text-accent hover:underline">View all <ChevronRight size={14} /></Link></div>
        <div className="mt-5 space-y-2">{ready.slice(0, 3).map((item) => <ContentRow key={item.id} item={item} onUpdate={onUpdateContent} onNotify={onNotify} />)}{ready.length === 0 && <EmptyState title="Your queue is clear" body="Add a product and generate your next point of view." action="Add a product" onAction={onAddProduct} />}</div>
      </section>
      <section className="rounded-2xl border border-border bg-card p-5 shadow-[0_8px_30px_hsl(var(--foreground)/0.03)] md:p-6">
        <div className="flex items-start justify-between"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Fast lane</div><h2 className="mt-1 font-display text-xl font-bold tracking-[-0.04em]">Make a concept</h2></div><WandSparkles size={19} className="text-primary" /></div>
        <ConceptForm products={state.products} onSubmit={onAddConcept} compact />
        <div className="mt-4 border-t border-border pt-4"><div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground"><Gauge size={14} className="text-accent" /> Average concept score <span className="ml-auto font-mono-ui text-foreground">84.6</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-[84.6%] rounded-full bg-accent" /></div></div>
      </section>
    </div>
    <div className="mt-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-2xl border border-border bg-card p-5 md:p-6"><SectionTitle eyebrow="Your products" title="Recent intake" href="/products" /><div className="mt-5 space-y-3">{state.products.slice(0, 3).map((product) => <ProductMini key={product.id} product={product} />)}</div></section>
      <section className="relative overflow-hidden rounded-2xl border border-border bg-[#dce4dc] p-6 md:p-7"><div className="absolute right-[-35px] top-[-55px] h-48 w-48 rounded-full border-[30px] border-[#58786a]/15" /><div className="relative max-w-md"><div className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#466155]"><TrendingUp size={14} /> Creative signal</div><h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.04em] text-[#23352f]">Your best hook this week starts with a tension.</h2><p className="mt-3 text-sm leading-6 text-[#52665d]">“Small apartment lighting, solved.” outperformed your average hook by 31%. Try opening with a specific before-and-after next.</p><button onClick={() => onNotify('Insight saved to your creative notes.')} data-testid="button-save-insight" className="mt-6 rounded-lg bg-[#23352f] px-3.5 py-2.5 text-xs font-bold text-[#edf3eb] transition-transform hover:-translate-y-0.5">Save insight</button></div></section>
    </div>
  </PageFrame>;
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  return <div className={`animate-rise stagger-${index + 1} rounded-2xl border border-border bg-card p-4 md:p-5`}><div className="flex items-start justify-between"><span className="text-[11px] leading-4 text-muted-foreground">{metric.label}</span><span className={metric.trend === 'up' ? 'text-accent' : 'text-[#c87661]'}>{metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}</span></div><div className="mt-4 font-display text-2xl font-bold tracking-[-0.05em] md:text-3xl">{metric.value}</div><div className={`mt-1 font-mono-ui text-[10px] ${metric.trend === 'up' ? 'text-accent' : 'text-[#c87661]'}`}>{metric.change}</div></div>;
}

function SectionTitle({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) {
  return <div className="flex items-center justify-between"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</div><h2 className="mt-1 font-display text-xl font-bold tracking-[-0.04em]">{title}</h2></div>{href && <Link href={href} data-testid={`link-section-${title.toLowerCase().replaceAll(' ', '-')}`} className="text-xs font-bold text-accent hover:underline">See all</Link>}</div>;
}

function ProductMini({ product }: { product: Product }) {
  return <div data-testid={`row-product-${product.id}`} className="flex items-center gap-3"><div className={`h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br ${productArt[product.image] ?? productArt.ceramic}`}><div className="h-full w-full rounded-lg bg-[radial-gradient(circle_at_65%_30%,rgba(255,255,255,.5),transparent_28%)]" /></div><div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold">{product.name}</div><div className="mt-0.5 text-[11px] text-muted-foreground">{product.category} · {product.price}</div></div><StatusPill status={product.status} /></div>;
}

function StatusPill({ status }: { status: string }) {
  const classes = status === 'Ready' || status === 'Published' || status === 'Live' || status === 'Connected' ? 'bg-[#dcece3] text-[#32725b]' : status === 'Needs attention' || status === 'Needs review' ? 'bg-[#f7e6c8] text-[#9a6229]' : status === 'Scheduled' ? 'bg-[#e1e6f3] text-[#58658a]' : 'bg-muted text-muted-foreground';
  return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${classes}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

function ContentRow({ item, onUpdate, onNotify }: { item: ContentItem; onUpdate: (id: string, updates: Partial<ContentItem>) => void; onNotify: (message: string) => void }) {
  return <div data-testid={`row-content-${item.id}`} className="group flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/45"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.platform === 'TikTok' ? 'bg-[#e8e1e2]' : 'bg-[#e2e7e4]'}`}>{item.format === 'Short video' ? <Film size={17} className="text-foreground/65" /> : item.format === 'Story set' ? <ImageIcon size={17} className="text-foreground/65" /> : <Store size={17} className="text-foreground/65" />}</div><div className="min-w-0 flex-1"><div className="truncate text-xs font-bold">{item.title}</div><div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground"><span>{item.product}</span><span className="h-1 w-1 rounded-full bg-border" /><span>{item.platform}</span></div></div><div className="hidden items-center gap-3 sm:flex"><div className="text-right"><div className="font-mono-ui text-xs font-bold text-accent">{item.score}</div><div className="text-[9px] text-muted-foreground">score</div></div><StatusPill status={item.status} /></div><button onClick={() => { onUpdate(item.id, { status: item.status === 'Ready' ? 'In queue' : 'Ready' }); onNotify(item.status === 'Ready' ? 'Moved into the queue.' : 'Marked ready to publish.'); }} data-testid={`button-toggle-content-${item.id}`} className="hidden h-8 items-center rounded-md border border-border px-2 text-[10px] font-bold hover:bg-card group-hover:flex">{item.status === 'Ready' ? 'Queue' : 'Ready'}</button></div>;
}

function ProductsPage({ products, onAddProduct, onNotify }: { products: Product[]; onAddProduct: () => void; onNotify: (message: string) => void }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const filtered = products.filter((product) => (filter === 'All' || product.status === filter) && `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()));
  return <PageFrame eyebrow="Product library" title="Products" description="The source material for every point of view. Keep your product context close and current." actions={<button onClick={onAddProduct} data-testid="button-products-add" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"><Plus size={15} /> Add product</button>}>
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 md:flex-row md:items-center"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-product-search" placeholder="Search products or categories" className="h-10 w-full rounded-lg bg-muted/60 pl-9 pr-3 text-xs outline-none ring-accent/30 placeholder:text-muted-foreground focus:ring-2" /></div><div className="flex gap-1 overflow-auto">{['All', 'Live', 'Needs review', 'Draft'].map((item) => <button key={item} onClick={() => setFilter(item)} data-testid={`button-filter-products-${item.toLowerCase().replaceAll(' ', '-')}`} className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold ${filter === item ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}`}><ListFilter size={13} className="mr-1 inline" />{item}</button>)}</div></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} onNotify={onNotify} />)}</div>{filtered.length === 0 && <EmptyState title="No products match that search" body="Try another phrase or add a new product link." action="Add product" onAction={onAddProduct} />}
  </PageFrame>;
}

function ProductCard({ product, index, onNotify }: { product: Product; index: number; onNotify: (message: string) => void }) {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => { await navigator.clipboard?.writeText(`https://${product.url}`); setCopied(true); onNotify('Product link copied.'); window.setTimeout(() => setCopied(false), 1400); };
  return <article data-testid={`card-product-${product.id}`} className={`animate-rise stagger-${Math.min(index + 1, 4)} overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_30px_hsl(var(--foreground)/0.03)]`}><div className={`relative h-36 bg-gradient-to-br ${productArt[product.image] ?? productArt.ceramic}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,.46),transparent_18%),linear-gradient(135deg,transparent,rgba(24,26,38,.18))]" /><div className="absolute left-4 top-4"><StatusPill status={product.status} /></div><div className="absolute bottom-4 right-4 font-mono-ui text-xs font-bold text-white/80">{product.price}</div></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-lg font-bold tracking-[-0.035em]">{product.name}</h2><div className="mt-1 text-[11px] text-muted-foreground">{product.category}</div></div><button data-testid={`button-product-menu-${product.id}`} className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={17} /></button></div><div className="mt-5 flex items-center gap-2 rounded-lg bg-muted/55 px-3 py-2"><Link2 size={13} className="shrink-0 text-accent" /><span className="truncate text-[10px] text-muted-foreground">{product.url}</span><button onClick={copyLink} data-testid={`button-copy-product-${product.id}`} className="ml-auto shrink-0 text-muted-foreground hover:text-foreground">{copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}</button></div><div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground"><span>Updated {product.lastUpdated}</span><Link href="/content" data-testid={`link-generate-product-${product.id}`} onClick={() => onNotify(`Ready to generate from ${product.name}.`)} className="font-bold text-accent hover:underline">Generate content <ChevronRight size={12} className="inline" /></Link></div></div></article>;
}

function ContentPage({ content, products, onAddConcept, onUpdateContent, onNotify }: { content: ContentItem[]; products: Product[]; onAddConcept: (product: string, format: Format, platform: Platform) => void; onUpdateContent: (id: string, updates: Partial<ContentItem>) => void; onNotify: (message: string) => void }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const filtered = content.filter((item) => (status === 'All' || item.status === status) && `${item.title} ${item.product} ${item.platform}`.toLowerCase().includes(query.toLowerCase()));
  return <PageFrame eyebrow="Creative production" title="Content queue" description="A living board of everything Lockkedn is thinking, making, and getting ready to publish." actions={<Link href="/calendar" data-testid="link-content-calendar" className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-xs font-bold hover:bg-muted"><CalendarDays size={15} /> Open calendar</Link>}>
    <div className="grid gap-5 xl:grid-cols-[1fr_310px]"><section className="min-w-0"><div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 md:flex-row"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-content-search" placeholder="Search hooks, products, platforms" className="h-10 w-full rounded-lg bg-muted/60 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-accent/30" /></div><div className="flex gap-1 overflow-auto">{['All', 'Ready', 'In queue', 'Scheduled', 'Published'].map((item) => <button key={item} onClick={() => setStatus(item)} data-testid={`button-filter-content-${item.toLowerCase().replaceAll(' ', '-')}`} className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold ${status === item ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{item}</button>)}</div></div><div className="mt-5 space-y-3">{filtered.map((item, index) => <ContentCard key={item.id} item={item} index={index} onUpdate={onUpdateContent} onNotify={onNotify} />)}</div>{filtered.length === 0 && <EmptyState title="Nothing here yet" body="Try another filter or make a new concept from the panel." action="Reset filters" onAction={() => { setStatus('All'); setQuery(''); }} />}</section><aside className="h-fit rounded-2xl border border-border bg-card p-5"><div className="flex items-center justify-between"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">AI studio</div><h2 className="mt-1 font-display text-xl font-bold tracking-[-0.04em]">Make a concept</h2></div><Sparkles size={18} className="text-primary" /></div><ConceptForm products={products} onSubmit={onAddConcept} /><div className="mt-6 rounded-xl bg-[#f4ead7] p-4"><div className="flex items-center gap-2 text-[11px] font-bold text-[#8d642d]"><Target size={14} /> What makes a strong concept?</div><p className="mt-2 text-xs leading-5 text-[#8d7350]">Specific tension, a human payoff, and one product detail people can picture.</p></div></aside></div>
  </PageFrame>;
}

function ContentCard({ item, index, onUpdate, onNotify }: { item: ContentItem; index: number; onUpdate: (id: string, updates: Partial<ContentItem>) => void; onNotify: (message: string) => void }) {
  const nextStatus: ContentStatus = item.status === 'In queue' ? 'Ready' : item.status === 'Ready' ? 'Scheduled' : item.status === 'Scheduled' ? 'Published' : 'Ready';
  return <article data-testid={`card-content-${item.id}`} className={`animate-rise stagger-${Math.min(index + 1, 4)} rounded-2xl border border-border bg-card p-4 shadow-[0_8px_30px_hsl(var(--foreground)/0.025)] md:p-5`}><div className="flex items-start gap-4"><div className={`hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl sm:flex ${item.platform === 'TikTok' ? 'bg-[#e8e1e2]' : item.platform === 'Instagram' ? 'bg-[#f0e1df]' : 'bg-[#e0e7e6]'}`}>{item.format === 'Story set' ? <ImageIcon size={23} className="text-foreground/55" /> : <Film size={23} className="text-foreground/55" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><StatusPill status={item.status} /><span className="font-mono-ui text-[10px] text-muted-foreground">{item.platform} · {item.format}</span></div><h2 className="mt-2 font-display text-lg font-bold leading-tight tracking-[-0.03em]">{item.title}</h2><p className="mt-2 text-xs leading-5 text-muted-foreground">{item.hook}</p><div className="mt-4 flex flex-wrap items-center gap-2"><div className="flex items-center gap-1.5 rounded-md bg-[#dcece3] px-2 py-1 font-mono-ui text-[10px] font-bold text-[#32725b]"><Gauge size={12} /> {item.score} score</div><span className="text-[10px] text-muted-foreground">{item.product}</span></div></div><button data-testid={`button-content-menu-${item.id}`} className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={17} /></button></div><div className="mt-4 flex flex-col justify-between gap-3 border-t border-border pt-3 sm:flex-row sm:items-center"><div className="max-w-xl truncate text-[11px] text-muted-foreground"><span className="font-bold text-foreground/70">Caption</span> · {item.caption}</div><div className="flex shrink-0 gap-2"><button onClick={() => { onUpdate(item.id, { status: nextStatus, scheduledAt: nextStatus === 'Scheduled' ? 'Tomorrow, 9:30 AM' : item.scheduledAt }); onNotify(`Moved to ${nextStatus.toLowerCase()}.`); }} data-testid={`button-advance-content-${item.id}`} className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-[10px] font-bold text-secondary-foreground transition-transform hover:-translate-y-0.5">{nextStatus === 'Scheduled' ? <Clock3 size={13} /> : <Check size={13} />}{nextStatus === 'Published' ? 'Mark published' : `Move to ${nextStatus}`}</button></div></div></article>;
}

function CalendarPage({ content, onUpdateContent, onNotify }: { content: ContentItem[]; onUpdateContent: (id: string, updates: Partial<ContentItem>) => void; onNotify: (message: string) => void }) {
  const days = ['Mon 20', 'Tue 21', 'Wed 22', 'Thu 23', 'Fri 24', 'Sat 25', 'Sun 26'];
  const planned = content.filter((item) => item.status === 'Scheduled' || item.status === 'Ready');
  return <PageFrame eyebrow="Publishing rhythm" title="Calendar" description="A clear view of what is ready, what is planned, and where the week has room to breathe." actions={<button onClick={() => onNotify('Calendar synced with your connected accounts.')} data-testid="button-sync-calendar" className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-xs font-bold hover:bg-muted"><RefreshCw size={15} /> Sync calendar</button>}>
    <div className="rounded-2xl border border-border bg-card p-4 md:p-6"><div className="flex items-center justify-between border-b border-border pb-4"><div><span className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Week 21</span><h2 className="mt-1 font-display text-xl font-bold">May 20 — 26, 2024</h2></div><div className="flex gap-2"><button data-testid="button-calendar-prev" onClick={() => onNotify('Previous week is not available in this preview.')} className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted">‹</button><button data-testid="button-calendar-next" onClick={() => onNotify('Next week is not available in this preview.')} className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted">›</button></div></div><div className="mt-5 grid min-w-[720px] grid-cols-7 gap-2 overflow-x-auto">{days.map((day, index) => <div key={day} className="min-h-[310px] rounded-xl bg-muted/45 p-2.5"><div className={`font-mono-ui text-[10px] uppercase ${index === 1 ? 'text-accent' : 'text-muted-foreground'}`}>{day}</div>{index === 1 && <div className="mt-2 h-1 w-1 rounded-full bg-accent" />}{index === 1 && planned.slice(0, 1).map((item) => <CalendarItem key={item.id} item={item} onUpdate={onUpdateContent} onNotify={onNotify} />)}{index === 3 && planned.slice(1, 2).map((item) => <CalendarItem key={item.id} item={item} onUpdate={onUpdateContent} onNotify={onNotify} />)}{index === 5 && planned.slice(2, 3).map((item) => <CalendarItem key={item.id} item={item} onUpdate={onUpdateContent} onNotify={onNotify} />)}{index === 0 && <div className="mt-3 rounded-lg border border-dashed border-border p-2 text-center text-[10px] text-muted-foreground">Open slot</div>}</div>)}</div><div className="mt-5 flex items-center gap-5 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Ready to publish</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#8c96bb]" /> Scheduled</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#e7a078]" /> Draft</span></div></div>
    <div className="mt-5 grid gap-5 md:grid-cols-3"><SmallStat label="Scheduled this week" value="3" note="Across 2 platforms" /><SmallStat label="Open publishing slots" value="8" note="Best window: Thu 6 PM" /><SmallStat label="Needs a date" value={String(content.filter((item) => item.status === 'Ready' || item.status === 'In queue').length)} note="Move from queue to schedule" /></div>
  </PageFrame>;
}

function CalendarItem({ item, onUpdate, onNotify }: { item: ContentItem; onUpdate: (id: string, updates: Partial<ContentItem>) => void; onNotify: (message: string) => void }) {
  return <button onClick={() => { onUpdate(item.id, { status: item.status === 'Scheduled' ? 'Ready' : 'Scheduled', scheduledAt: item.status === 'Scheduled' ? '' : 'Thu, 6:00 PM' }); onNotify(item.status === 'Scheduled' ? 'Removed from schedule.' : 'Scheduled for Thu, 6:00 PM.'); }} data-testid={`button-calendar-item-${item.id}`} className="mt-3 w-full rounded-lg border border-border bg-card p-2 text-left shadow-sm transition-transform hover:-translate-y-0.5"><div className="flex items-center justify-between"><span className="font-mono-ui text-[9px] text-accent">{item.platform}</span><span className={`h-1.5 w-1.5 rounded-full ${item.status === 'Scheduled' ? 'bg-[#8c96bb]' : 'bg-accent'}`} /></div><div className="mt-2 line-clamp-2 text-[11px] font-bold leading-4">{item.title}</div><div className="mt-2 text-[9px] text-muted-foreground">{item.scheduledAt || 'Ready to schedule'}</div></button>;
}

function SmallStat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5"><div className="text-[11px] text-muted-foreground">{label}</div><div className="mt-3 font-display text-3xl font-bold tracking-[-0.05em]">{value}</div><div className="mt-1 font-mono-ui text-[10px] text-accent">{note}</div></div>;
}

function AnalyticsPage({ metrics, content, onNotify }: { metrics: Metric[]; content: ContentItem[]; onNotify: (message: string) => void }) {
  return <PageFrame eyebrow="Feedback loop" title="Analytics" description="Know what earned attention, then bring that signal back into the next concept." actions={<button onClick={() => onNotify('Analytics refreshed just now.')} data-testid="button-refresh-analytics" className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-xs font-bold hover:bg-muted"><RefreshCw size={15} /> Refresh</button>}>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]"><section className="rounded-2xl border border-border bg-card p-5 md:p-6"><SectionTitle eyebrow="Reach over time" title="The last 30 days" /><div className="mt-8 h-[240px]"><div className="flex h-full items-end gap-2 border-b border-l border-border px-3 pb-0 pt-5">{[42, 48, 38, 57, 51, 67, 62, 74, 68, 82, 79, 96, 88, 100, 93, 114, 106, 121, 132, 125, 143, 157, 149, 165].map((height, index) => <div key={index} className="group relative flex-1"><div className={`absolute bottom-0 w-full rounded-t-[3px] transition-all group-hover:bg-primary ${index > 18 ? 'bg-accent' : 'bg-[#bac8bd]'}`} style={{ height: `${height / 1.65}%` }} /><span className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 font-mono-ui text-[8px] text-muted-foreground group-hover:block">{index + 1}</span></div>)}</div><div className="mt-7 flex justify-between font-mono-ui text-[9px] text-muted-foreground"><span>APR 22</span><span>MAY 06</span><span>MAY 21</span></div></div></section><section className="rounded-2xl border border-border bg-card p-5 md:p-6"><SectionTitle eyebrow="Creative signal" title="What is working" /><div className="mt-6 space-y-5"><SignalRow label="Specific before / after" value="92%" width="92%" color="bg-accent" /><SignalRow label="A human point of view" value="78%" width="78%" color="bg-primary" /><SignalRow label="Product detail in first 3s" value="64%" width="64%" color="bg-[#e7a078]" /></div><div className="mt-8 rounded-xl bg-muted/60 p-4"><div className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Best performer</div><div className="mt-2 text-sm font-bold">Small apartment lighting, solved.</div><div className="mt-1 text-xs leading-5 text-muted-foreground">76.2% completion rate · 2.4x your average</div></div></section></div>
    <section className="mt-5 rounded-2xl border border-border bg-card p-5 md:p-6"><SectionTitle eyebrow="Recent performance" title="Published content" href="/content" /><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[640px] text-left"><thead><tr className="border-b border-border font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><th className="pb-3 font-normal">Content</th><th className="pb-3 font-normal">Platform</th><th className="pb-3 font-normal">Score</th><th className="pb-3 font-normal">Watch-through</th><th className="pb-3 text-right font-normal">Clicks</th></tr></thead><tbody>{content.filter((item) => item.status === 'Published' || item.status === 'Scheduled').map((item) => <tr key={item.id} data-testid={`row-analytics-${item.id}`} className="border-b border-border/70 last:border-0"><td className="py-4 text-xs font-bold">{item.title}</td><td className="py-4 text-xs text-muted-foreground">{item.platform}</td><td className="py-4 font-mono-ui text-xs text-accent">{item.score}</td><td className="py-4 text-xs text-muted-foreground">{item.score > 80 ? '68.4%' : '51.2%'}</td><td className="py-4 text-right font-mono-ui text-xs">{item.score > 80 ? '428' : '192'}</td></tr>)}</tbody></table></div></section>
  </PageFrame>;
}

function SignalRow({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return <div><div className="flex items-center justify-between text-xs"><span className="font-semibold">{label}</span><span className="font-mono-ui text-[11px] text-muted-foreground">{value}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${color}`} style={{ width }} /></div></div>;
}

function AccountsPage({ accounts, onNotify }: { accounts: Account[]; onNotify: (message: string) => void }) {
  return <PageFrame eyebrow="Distribution" title="Connected accounts" description="Publishing destinations with a clear read on what is ready to go." actions={<button onClick={() => onNotify('Account connection flow opened.')} data-testid="button-connect-account" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"><Plus size={15} /> Connect account</button>}>
    <div className="grid gap-4 md:grid-cols-3">{accounts.map((account, index) => <AccountCard key={account.id} account={account} index={index} onNotify={onNotify} />)}</div>
    <div className="mt-6 rounded-2xl border border-border bg-card p-5 md:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Publishing readiness</div><h2 className="mt-1 font-display text-xl font-bold">2 of 3 accounts are ready</h2></div><div className="flex items-center gap-2 text-xs font-bold text-accent"><Check size={15} /> Good to publish</div></div><div className="mt-5 grid gap-2 sm:grid-cols-3">{accounts.map((account) => <div key={account.id} className="rounded-lg bg-muted/55 p-3"><div className="flex items-center justify-between text-[10px] font-bold"><span>{account.platform}</span><span className={account.status === 'Connected' ? 'text-accent' : 'text-[#a46a32]'}>{account.status === 'Connected' ? 'Ready' : 'Action needed'}</span></div><div className="mt-3 h-1 rounded-full bg-border"><div className={`h-full rounded-full ${account.status === 'Connected' ? 'w-full bg-accent' : 'w-2/3 bg-[#e7a078]'}`} /></div></div>)}</div></div>
  </PageFrame>;
}

function AccountCard({ account, index, onNotify }: { account: Account; index: number; onNotify: (message: string) => void }) {
  const Icon = account.platform === 'TikTok' ? Film : account.platform === 'Instagram' ? Instagram : Youtube;
  return <article className={`animate-rise stagger-${index + 1} rounded-2xl border border-border bg-card p-5`} data-testid={`card-account-${account.id}`}><div className="flex items-center justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${account.platform === 'Instagram' ? 'bg-[#f0e1df]' : 'bg-muted'}`}><Icon size={20} /></div><StatusPill status={account.status} /></div><h2 className="mt-5 font-display text-lg font-bold">{account.platform}</h2><div className="mt-1 text-xs text-muted-foreground">{account.handle}</div><div className="mt-5 flex items-end justify-between border-t border-border pt-4"><div><div className="font-display text-2xl font-bold">{account.followers}</div><div className="mt-0.5 font-mono-ui text-[9px] text-muted-foreground">followers</div></div><button onClick={() => onNotify(account.status === 'Connected' ? `${account.platform} is connected and ready.` : `Reconnect ${account.platform} to resume publishing.`)} data-testid={`button-manage-account-${account.id}`} className="rounded-md border border-border px-2.5 py-2 text-[10px] font-bold hover:bg-muted">{account.status === 'Connected' ? 'Manage' : 'Reconnect'}</button></div></article>;
}

function BrandKitPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [active, setActive] = useState('Visual direction');
  return <PageFrame eyebrow="Creative consistency" title="Brand kit" description="A shared point of view for every product, post, and person making the work." actions={<button onClick={() => onNotify('Brand kit saved.')} data-testid="button-save-brand-kit" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"><Check size={15} /> Save changes</button>}>
    <div className="grid gap-5 xl:grid-cols-[230px_1fr]"><aside className="h-fit rounded-2xl border border-border bg-card p-2">{['Visual direction', 'Voice & language', 'Content rules'].map((item) => <button key={item} onClick={() => setActive(item)} data-testid={`button-brand-tab-${item.toLowerCase().replaceAll(' ', '-')}`} className={`w-full rounded-lg px-3 py-2.5 text-left text-xs font-semibold ${active === item ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{item}<ChevronRight size={14} className="float-right mt-0.5" /></button>)}</aside><section className="rounded-2xl border border-border bg-card p-5 md:p-7">{active === 'Visual direction' && <VisualDirection onNotify={onNotify} />}{active === 'Voice & language' && <VoiceSettings />}{active === 'Content rules' && <ContentRules />}</section></div>
  </PageFrame>;
}

function VisualDirection({ onNotify }: { onNotify: (message: string) => void }) {
  return <><div className="flex items-start justify-between gap-4"><div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Visual direction</div><h2 className="mt-1 font-display text-2xl font-bold tracking-[-0.04em]">Make it feel unmistakably yours.</h2><p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">Lockkedn uses these cues when it turns a product into a visual idea.</p></div><Palette size={22} className="text-accent" /></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><ColorSwatch name="Signal yellow" hex="#F7CB4D" color="#F7CB4D" /><ColorSwatch name="Deep ink" hex="#202437" color="#202437" /><ColorSwatch name="Field green" hex="#3E8A78" color="#3E8A78" /></div><div className="mt-8 grid gap-4 md:grid-cols-2"><label className="text-xs font-bold">Display type<input defaultValue="Syne" data-testid="input-brand-display-font" className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30" /></label><label className="text-xs font-bold">Body type<input defaultValue="DM Sans" data-testid="input-brand-body-font" className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30" /></label></div><button onClick={() => onNotify('Visual direction updated.')} data-testid="button-update-visual-direction" className="mt-6 rounded-lg border border-border px-3.5 py-2.5 text-xs font-bold hover:bg-muted">Update direction</button></>;
}

function ColorSwatch({ name, hex, color }: { name: string; hex: string; color: string }) {
  return <div className="rounded-xl border border-border p-2"><div className="h-24 rounded-lg" style={{ backgroundColor: color }} /><div className="mt-3 px-1"><div className="text-xs font-bold">{name}</div><div className="mt-1 font-mono-ui text-[10px] text-muted-foreground">{hex}</div></div></div>;
}

function VoiceSettings() {
  return <div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Voice & language</div><h2 className="mt-1 font-display text-2xl font-bold tracking-[-0.04em]">Say the useful thing beautifully.</h2><div className="mt-8 grid gap-5"><label className="text-xs font-bold">Voice profile<textarea defaultValue="Warm, specific, and quietly confident. Avoid hype. Let the product detail do the work." data-testid="textarea-brand-voice" className="mt-2 min-h-[118px] w-full resize-none rounded-lg border border-input bg-background p-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-accent/30" /></label><div className="grid gap-3 sm:grid-cols-2">{['Specific over broad', 'Warm over salesy', 'Human over polished', 'Confident over loud'].map((item, index) => <label key={item} className="flex items-center gap-3 rounded-lg border border-border p-3 text-xs font-semibold"><input type="checkbox" defaultChecked={index !== 3} data-testid={`checkbox-voice-${index}`} className="h-4 w-4 accent-[hsl(var(--accent))]" />{item}</label>)}</div></div></div>;
}

function ContentRules() {
  return <div><div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Content rules</div><h2 className="mt-1 font-display text-2xl font-bold tracking-[-0.04em]">Guardrails, not handcuffs.</h2><div className="mt-8 space-y-3">{['Mention the product in the first 5 seconds', 'Never use empty superlatives', 'Always include a lived-in use case', 'Keep captions under 140 characters'].map((rule, index) => <div key={rule} className="flex items-center gap-3 rounded-lg border border-border p-3 text-xs font-semibold"><div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#dcece3] text-[#32725b]"><Check size={14} /></div><span className="flex-1">{rule}</span><button data-testid={`button-remove-rule-${index}`} className="text-muted-foreground hover:text-destructive"><X size={14} /></button></div>)}</div></div>;
}

function SettingsPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [autoDraft, setAutoDraft] = useState(true);
  const [feedback, setFeedback] = useState(true);
  return <PageFrame eyebrow="Workspace preferences" title="AI settings" description="Tune how Lockkedn thinks with you. You stay in control of the point of view." actions={<button onClick={() => onNotify('AI settings saved.')} data-testid="button-save-settings" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"><Check size={15} /> Save settings</button>}>
    <div className="max-w-3xl space-y-4"><SettingRow icon={WandSparkles} title="Auto-draft after intake" description="Create a first concept as soon as a product is added." checked={autoDraft} onChange={() => setAutoDraft(!autoDraft)} testId="toggle-auto-draft" /><SettingRow icon={BarChart3} title="Feed performance back into ideas" description="Use your account analytics to sharpen future hooks." checked={feedback} onChange={() => setFeedback(!feedback)} testId="toggle-feedback" /><div className="rounded-2xl border border-border bg-card p-5 md:p-6"><div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4ead7] text-[#9a6229]"><Gauge size={19} /></div><div className="flex-1"><h2 className="text-sm font-bold">Concept ambition</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">How far should Lockkedn push beyond the obvious product description?</p><div className="mt-5 flex items-center gap-3"><span className="text-[10px] text-muted-foreground">Grounded</span><input type="range" defaultValue="68" data-testid="input-concept-ambition" className="h-1.5 flex-1 accent-[hsl(var(--accent))]" /><span className="text-[10px] font-bold text-accent">Distinctive</span></div></div></div></div><div className="rounded-2xl border border-border bg-card p-5 md:p-6"><div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e0e7e6] text-[#466155]"><Bell size={19} /></div><div><h2 className="text-sm font-bold">Daily creative briefing</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">A focused morning note with your best next action.</p><button onClick={() => onNotify('Briefing time updated to 8:30 AM.')} data-testid="button-briefing-time" className="mt-4 rounded-md border border-border px-3 py-2 text-[10px] font-bold hover:bg-muted">Weekdays · 8:30 AM</button></div></div></div></div>
  </PageFrame>;
}

function SettingRow({ icon: Icon, title, description, checked, onChange, testId }: { icon: LucideIcon; title: string; description: string; checked: boolean; onChange: () => void; testId: string }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 md:p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-accent"><Icon size={19} /></div><div className="flex-1"><h2 className="text-sm font-bold">{title}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div><button onClick={onChange} data-testid={testId} aria-pressed={checked} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-border'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-card shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} /></button></div>;
}

function ConceptForm({ products, onSubmit, compact = false }: { products: Product[]; onSubmit: (product: string, format: Format, platform: Platform) => void; compact?: boolean }) {
  const [product, setProduct] = useState(products[0]?.name ?? '');
  const [format, setFormat] = useState<Format>('Short video');
  const [platform, setPlatform] = useState<Platform>('TikTok');
  const [loading, setLoading] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setLoading(true); window.setTimeout(() => { onSubmit(product, format, platform); setLoading(false); }, 450); };
  return <form onSubmit={submit} className={`mt-${compact ? '6' : '7'} space-y-3`}><label className="block text-[11px] font-bold text-muted-foreground">Product<select value={product} onChange={(event) => setProduct(event.target.value)} data-testid="select-concept-product" className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:ring-2 focus:ring-accent/30">{products.map((item) => <option key={item.id}>{item.name}</option>)}</select></label><div className="grid grid-cols-2 gap-2"><label className="block text-[11px] font-bold text-muted-foreground">Format<select value={format} onChange={(event) => setFormat(event.target.value as Format)} data-testid="select-concept-format" className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-2 text-[11px] outline-none focus:ring-2 focus:ring-accent/30"><option>Short video</option><option>Product demo</option><option>Story set</option></select></label><label className="block text-[11px] font-bold text-muted-foreground">Platform<select value={platform} onChange={(event) => setPlatform(event.target.value as Platform)} data-testid="select-concept-platform" className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-2 text-[11px] outline-none focus:ring-2 focus:ring-accent/30"><option>TikTok</option><option>Instagram</option><option>YouTube</option></select></label></div><button type="submit" disabled={loading || products.length === 0} data-testid="button-generate-concept" className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">{loading ? <LoaderCircle size={15} className="animate-spin" /> : <WandSparkles size={15} />}{loading ? 'Thinking…' : 'Generate concept'}</button></form>;
}

function ProductIntake({ onClose, onAdd }: { onClose: () => void; onAdd: (url: string, name: string) => void }) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); if (!url.trim()) return; setLoading(true); window.setTimeout(() => onAdd(url.trim(), name.trim()), 600); };
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-secondary/35 p-3 backdrop-blur-sm sm:items-center"><div className="animate-rise w-full max-w-lg rounded-2xl border border-border bg-card p-5 shadow-2xl md:p-7"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-accent"><Link2 size={13} /> New intake</div><h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">What are we making irresistible?</h2><p className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground">Paste a product link. Lockkedn will hold the context while you shape the story.</p></div><button onClick={onClose} data-testid="button-close-intake" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"><X size={17} /></button></div><form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-xs font-bold">Product link<input autoFocus value={url} onChange={(event) => setUrl(event.target.value)} data-testid="input-product-url" placeholder="https://yourstore.com/products/..." className="mt-2 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" /></label><label className="block text-xs font-bold">Working name <span className="font-normal text-muted-foreground">(optional)</span><input value={name} onChange={(event) => setName(event.target.value)} data-testid="input-product-name" placeholder="Arc Fold Lamp" className="mt-2 h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" /></label><div className="flex items-center justify-between border-t border-border pt-4"><span className="flex items-center gap-2 text-[10px] text-muted-foreground"><Sparkles size={13} className="text-primary" /> AI context extraction included</span><button type="submit" disabled={!url.trim() || loading} data-testid="button-submit-product" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{loading ? <LoaderCircle size={14} className="animate-spin" /> : <Plus size={14} />}{loading ? 'Reading link…' : 'Add product'}</button></div></form></div></div>;
}

function EmptyState({ title, body, action, onAction }: { title: string; body: string; action: string; onAction: () => void }) {
  return <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-accent"><Grid2X2 size={21} /></div><h2 className="mt-4 font-display text-lg font-bold">{title}</h2><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">{body}</p><button onClick={onAction} data-testid="button-empty-state-action" className="mt-5 rounded-lg bg-secondary px-3.5 py-2.5 text-xs font-bold text-secondary-foreground">{action}</button></div>;
}

function Toast({ message }: { message: string }) {
  return <div role="status" data-testid="status-toast" className="animate-rise fixed bottom-20 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-xs font-bold text-secondary-foreground shadow-xl md:bottom-6"><Check size={14} className="text-primary" />{message}</div>;
}

export default App;