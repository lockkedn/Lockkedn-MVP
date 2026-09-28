export default function Next() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#202437] px-[6vw] py-[7vh] text-[#f6f3ed]">
      <div className="absolute bottom-[-12vw] right-[-8vw] h-[38vw] w-[38vw] rounded-full border-[2.8vw] border-[#f7cb4d]/20" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="small-caps text-[#f7cb4d]">07 · The next layer</div>
          <h1 className="mt-[2vh] max-w-[64vw] font-display text-[5vw] font-extrabold leading-[0.95] tracking-[-0.08em]">
            What comes next
          </h1>
        </div>
        <div className="relative grid grid-cols-2 gap-x-[7vw] gap-y-[2.4vh]">
          <div className="flex items-center gap-[1vw] font-body text-[1.7vw]"><span className="text-[#f7cb4d]">—</span><span>Connect real social and commerce accounts</span></div>
          <div className="flex items-center gap-[1vw] font-body text-[1.7vw]"><span className="text-[#f7cb4d]">—</span><span>Add live research and trend intelligence</span></div>
          <div className="flex items-center gap-[1vw] font-body text-[1.7vw]"><span className="text-[#f7cb4d]">—</span><span>Generate production-ready video and audio</span></div>
          <div className="flex items-center gap-[1vw] font-body text-[1.7vw]"><span className="text-[#f7cb4d]">—</span><span>Persist workspaces for teams</span></div>
          <div className="flex items-center gap-[1vw] font-body text-[1.7vw]"><span className="text-[#f7cb4d]">—</span><span>Publish the feedback loop in production</span></div>
        </div>
        <div className="flex items-end justify-between border-t border-[#f6f3ed]/15 pt-[3vh]">
          <div>
            <div className="small-caps text-[#3e8a78]">Current status</div>
            <div className="mt-[1.5vh] max-w-[45vw] font-body text-[1.7vw] leading-[1.25] text-[#f6f3ed]/80">responsive MVP built and ready for the next integration layer</div>
          </div>
          <div className="font-display text-[2.4vw] font-extrabold tracking-[-0.06em]">lockkedn<span className="text-[#f7cb4d]">.</span></div>
        </div>
      </div>
    </div>
  );
}