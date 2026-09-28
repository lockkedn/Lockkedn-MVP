const base = import.meta.env.BASE_URL;

export default function Mvp() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#202437] px-[6vw] py-[6vh] text-[#f6f3ed]">
      <div className="small-caps text-[#f7cb4d]">04 · The build</div>
      <h1 className="mt-[2vh] max-w-[70vw] font-display text-[4.1vw] font-extrabold leading-[0.98] tracking-[-0.07em]">
        The MVP makes the loop tangible
      </h1>
      <div className="relative mt-[5vh] grid grid-cols-[0.82fr_1.65fr] gap-[3vw]">
        <div className="flex flex-col justify-between">
          <div className="space-y-[1.7vh] font-body text-[1.8vw] leading-[1.2] text-[#f6f3ed]/84">
            <div className="flex gap-[1vw]"><span className="text-[#f7cb4d]">—</span><span>Product intake and product library</span></div>
            <div className="flex gap-[1vw]"><span className="text-[#f7cb4d]">—</span><span>Concept generation for TikTok, Instagram, and YouTube</span></div>
            <div className="flex gap-[1vw]"><span className="text-[#f7cb4d]">—</span><span>Content queue with ready, scheduled, and published states</span></div>
            <div className="flex gap-[1vw]"><span className="text-[#f7cb4d]">—</span><span>Publishing calendar</span></div>
            <div className="flex gap-[1vw]"><span className="text-[#f7cb4d]">—</span><span>Analytics and creative signals</span></div>
            <div className="flex gap-[1vw]"><span className="text-[#f7cb4d]">—</span><span>Connected accounts, brand kit, and AI settings</span></div>
          </div>
          <div className="flex items-center gap-[1vw] font-body text-[1.5vw] text-[#f6f3ed]/55">
            <span className="h-[0.55vw] w-[0.55vw] rounded-full bg-[#3e8a78]" />
            <span>Image: Lockkedn command center dashboard</span>
          </div>
        </div>
        <div className="soft-shadow overflow-hidden rounded-[1.2vw] border-[0.35vw] border-[#f6f3ed]/25">
          <img
            src={`${base}lockkedn-dashboard.jpg`}
            crossOrigin="anonymous"
            alt="Lockkedn command center dashboard"
            className="h-[54vh] w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}