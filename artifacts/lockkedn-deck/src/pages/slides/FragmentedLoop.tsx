export default function FragmentedLoop() {
  return (
    <div className="paper-grid relative h-screen w-screen overflow-hidden bg-[#f6f3ed] px-[6vw] py-[7vh]">
      <div className="absolute right-[-8vw] top-[-12vw] h-[30vw] w-[30vw] rounded-full border-[2.4vw] border-[#f7cb4d]/40" />
      <div className="relative">
        <div className="small-caps text-[#3e8a78]">01 · The problem</div>
        <h1 className="mt-[2vh] max-w-[70vw] font-display text-[4.3vw] font-extrabold leading-[0.98] tracking-[-0.07em] text-[#202437]">
          The creator commerce loop is fragmented
        </h1>
      </div>
      <div className="relative mt-[8vh] grid grid-cols-[1fr_1.5fr] gap-[6vw]">
        <div className="flex flex-col justify-between">
          <div className="font-display text-[10vw] font-extrabold leading-none tracking-[-0.1em] text-[#202437]">04</div>
          <div className="max-w-[22vw] font-body text-[1.75vw] leading-[1.35] text-[#667078]">
            Separate tools create separate versions of the truth.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[1.2vw]">
          <div className="soft-shadow rounded-[1.1vw] bg-[#e5ddd0] p-[2vw]">
            <div className="small-caps text-[#9a6229]">01</div>
            <div className="mt-[4vh] font-body text-[1.75vw] font-semibold leading-[1.18] text-[#202437]">Product research lives in one place</div>
          </div>
          <div className="soft-shadow rounded-[1.1vw] bg-[#dce4dc] p-[2vw]">
            <div className="small-caps text-[#3e8a78]">02</div>
            <div className="mt-[4vh] font-body text-[1.75vw] font-semibold leading-[1.18] text-[#202437]">Trend signals arrive somewhere else</div>
          </div>
          <div className="soft-shadow rounded-[1.1vw] bg-[#e1e3eb] p-[2vw]">
            <div className="small-caps text-[#58658a]">03</div>
            <div className="mt-[4vh] font-body text-[1.75vw] font-semibold leading-[1.18] text-[#202437]">Scripts, production, publishing, and analytics are disconnected</div>
          </div>
          <div className="soft-shadow rounded-[1.1vw] bg-[#202437] p-[2vw] text-[#f6f3ed]">
            <div className="small-caps text-[#f7cb4d]">04</div>
            <div className="mt-[4vh] font-body text-[1.75vw] font-semibold leading-[1.18]">The team loses the thread between what shipped and what worked</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[5vh] left-[6vw] flex items-center gap-[1vw] font-body text-[1.5vw] text-[#667078]">
        <span className="h-[0.55vw] w-[0.55vw] rounded-full bg-[#e7a078]" />
        <span>Image: a visual collage of disconnected content workflow artifacts</span>
      </div>
    </div>
  );
}