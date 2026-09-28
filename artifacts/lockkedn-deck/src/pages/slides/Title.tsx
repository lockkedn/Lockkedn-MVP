const base = import.meta.env.BASE_URL;

export default function Title() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#202437] text-[#f6f3ed]">
      <img
        src={`${base}lockkedn-hero.jpg`}
        crossOrigin="anonymous"
        alt="Abstract Lockkedn product still life"
        className="absolute right-0 top-0 h-full w-[56vw] object-cover opacity-85"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#202437] via-[#202437]/95 to-[#202437]/15" />
      <div className="absolute left-0 top-0 h-full w-[48vw] bg-[#202437]/80" />
      <div className="relative flex h-full w-[58vw] flex-col justify-between px-[6vw] py-[6vh]">
        <div className="flex items-center gap-[1vw]">
          <div className="flex h-[4.5vw] w-[4.5vw] items-center justify-center rounded-[1.2vw] bg-[#f7cb4d] text-[#202437] shadow-[0.4vw_0.4vw_0_#3e8a78]">
            <span className="font-display text-[2.7vw] font-extrabold">L</span>
          </div>
          <div className="font-display text-[2.6vw] font-extrabold tracking-[-0.07em]">
            lockkedn<span className="text-[#f7cb4d]">.</span>
          </div>
        </div>
        <div className="max-w-[48vw]">
          <div className="small-caps text-[#f7cb4d]">Product overview · 2026</div>
          <h1 className="mt-[3vh] font-display text-[6.4vw] font-extrabold leading-[0.94] tracking-[-0.07em] text-wrap-balance">
            Turn one product link into the next thing to post.
          </h1>
          <p className="mt-[3vh] max-w-[38vw] font-body text-[2vw] leading-[1.3] text-[#f6f3ed]/75">
            AI content operations for shoppable short-form video.
          </p>
        </div>
        <div className="h-[1vw]" />
      </div>
    </div>
  );
}