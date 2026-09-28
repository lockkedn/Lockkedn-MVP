export default function ConnectedLoop() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#202437] px-[6vw] py-[7vh] text-[#f6f3ed]">
      <div className="absolute bottom-[-10vw] right-[-5vw] h-[32vw] w-[32vw] rounded-full border-[2.4vw] border-[#3e8a78]/30" />
      <div className="relative">
        <div className="small-caps text-[#f7cb4d]">02 · The product</div>
        <h1 className="mt-[2vh] max-w-[70vw] font-display text-[4.3vw] font-extrabold leading-[0.98] tracking-[-0.07em]">
          One link. One connected creative loop.
        </h1>
      </div>
      <div className="relative mt-[9vh] grid grid-cols-5 items-center gap-[1.2vw]">
        <div className="rounded-[1.1vw] border border-[#f6f3ed]/15 bg-[#f6f3ed]/6 p-[1.7vw]">
          <div className="font-mono text-[1.5vw] text-[#f7cb4d]">01</div>
          <div className="mt-[3vh] font-body text-[1.8vw] font-semibold">Connect social accounts</div>
        </div>
        <div className="text-center font-display text-[3vw] text-[#f7cb4d]">→</div>
        <div className="rounded-[1.1vw] border border-[#f6f3ed]/15 bg-[#f6f3ed]/6 p-[1.7vw]">
          <div className="font-mono text-[1.5vw] text-[#f7cb4d]">02</div>
          <div className="mt-[3vh] font-body text-[1.8vw] font-semibold">Import or paste a product link</div>
        </div>
        <div className="text-center font-display text-[3vw] text-[#f7cb4d]">→</div>
        <div className="rounded-[1.1vw] bg-[#f7cb4d] p-[1.7vw] text-[#202437]">
          <div className="font-mono text-[1.5vw] text-[#3e8a78]">03</div>
          <div className="mt-[3vh] font-body text-[1.8vw] font-semibold">Research product context, reviews, and trends</div>
        </div>
      </div>
      <div className="relative mt-[4vh] flex items-center justify-center">
        <div className="h-[9vh] w-[0.15vw] bg-[#f7cb4d]/70" />
      </div>
      <div className="relative grid grid-cols-5 items-center gap-[1.2vw]">
        <div className="rounded-[1.1vw] bg-[#3e8a78] p-[1.7vw] text-[#f6f3ed]">
          <div className="font-mono text-[1.5vw] text-[#f7cb4d]">04</div>
          <div className="mt-[3vh] font-body text-[1.8vw] font-semibold">Generate scripts, captions, thumbnails, and video concepts</div>
        </div>
        <div className="text-center font-display text-[3vw] text-[#f7cb4d]">→</div>
        <div className="rounded-[1.1vw] border border-[#f6f3ed]/15 bg-[#f6f3ed]/6 p-[1.7vw]">
          <div className="font-mono text-[1.5vw] text-[#f7cb4d]">05</div>
          <div className="mt-[3vh] font-body text-[1.8vw] font-semibold">Schedule, publish, measure, and improve</div>
        </div>
        <div className="col-span-2 text-right font-body text-[1.5vw] leading-[1.35] text-[#f6f3ed]/58">
          Image: a simple product-to-post loop diagram
        </div>
      </div>
    </div>
  );
}